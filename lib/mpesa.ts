import Constants from 'expo-constants';
import { supabase } from './supabase';

// M-PESA API endpoints
const MPESA_BASE_URL = 'https://kitabu.ai'; 
const MPESA_AUTH_URL = `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`;
const MPESA_STK_PUSH_URL = `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`;

// M-PESA credentials from environment variables
const MPESA_CONSUMER_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_MPESA_CONSUMER_KEY || '';
const MPESA_CONSUMER_SECRET = Constants.expoConfig?.extra?.EXPO_PUBLIC_MPESA_CONSUMER_SECRET || '';
const MPESA_PASSKEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_MPESA_PASSKEY || '';
const MPESA_SHORTCODE = Constants.expoConfig?.extra?.EXPO_PUBLIC_MPESA_SHORTCODE || '';
const MPESA_CALLBACK_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_MPESA_CALLBACK_URL || '';

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    name: 'Monthly Plan',
    amount: 250, // KES
    type: 'monthly',
    durationDays: 30,
  },
  ANNUAL: {
    name: 'Annual Plan',
    amount: 1000, // KES
    type: 'annual',
    durationDays: 365,
  },
};

// Helper function to get M-PESA access token
async function getMpesaAccessToken(): Promise<string> {
  try {
    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
    
    const response = await fetch(MPESA_AUTH_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    });
    
    const data = await response.json();
    
    if (!data.access_token) {
      throw new Error('Failed to get M-PESA access token');
    }
    
    return data.access_token;
  } catch (error) {
    console.error('Error getting M-PESA access token:', error);
    throw error;
  }
}

// Generate timestamp in the format YYYYMMDDHHmmss
function getTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// Generate password for STK Push
function getPassword(timestamp: string): string {
  return Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');
}

// Initiate STK Push
export async function initiateSTKPush(
  phoneNumber: string,
  baseAmount: number,
  userId: string,
  planType: 'monthly' | 'annual'
): Promise<{ checkoutRequestID: string; paymentId: string }> {
  try {
    // Check if this is a new subscription or renewal
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', userId)
      .single();
    
    // Determine if we need to prorate the amount
    let amount = baseAmount;
    let isProratedAmount = false;
    
    // If this is a new subscription (not a renewal) and not in trial, calculate prorated amount
    if ((!existingSubscription || existingSubscription.status === 'expired') && planType !== 'trial') {
      // Call the calculate_prorated_amount function
      const { data: proratedData, error: proratedError } = await supabase
        .rpc('calculate_prorated_amount', {
          plan_type: planType,
          full_amount: baseAmount
        });
      
      if (!proratedError && proratedData) {
        amount = proratedData;
        isProratedAmount = true;
      }
    }
    
    // Format phone number (remove leading 0 or +254 and add 254)
    let formattedPhone = phoneNumber.replace(/^(0|\+254)/, '');
    if (!formattedPhone.startsWith('254')) {
      formattedPhone = `254${formattedPhone}`;
    }
    
    // Get access token
    const accessToken = await getMpesaAccessToken();
    
    // Generate timestamp
    const timestamp = getTimestamp();
    
    // Generate password
    const password = getPassword(timestamp);
    
    // Create a payment record in pending state
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        plan_type: planType,
        amount,
        prorated_amount: isProratedAmount,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select();
    
    if (paymentError) {
      throw paymentError;
    }
    
    const paymentId = paymentData[0].id;
    
    // Prepare STK Push request
    const requestBody = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: `${MPESA_CALLBACK_URL}?paymentId=${paymentId}`,
      AccountReference: `Kitabu AI - ${planType} Plan`,
      TransactionDesc: `Payment for ${planType} subscription`,
    };
    
    // Send STK Push request
    const response = await fetch(MPESA_STK_PUSH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    const data = await response.json();
    
    if (data.ResponseCode !== '0') {
      throw new Error(`STK Push failed: ${data.ResponseDescription}`);
    }
    
    // Update payment record with transaction ID
    await supabase
      .from('payments')
      .update({
        transaction_id: data.CheckoutRequestID,
      })
      .eq('id', paymentId);
    
    return {
      checkoutRequestID: data.CheckoutRequestID,
      paymentId,
    };
  } catch (error) {
    console.error('Error initiating STK Push:', error);
    throw error;
  }
}

// Process M-PESA callback
export async function processMpesaCallback(
  callbackData: any,
  paymentId: string
): Promise<void> {
  try {
    const { Body } = callbackData;
    
    if (Body.stkCallback.ResultCode === 0) {
      // Payment successful
      const { CallbackMetadata } = Body.stkCallback;
      
      // Extract transaction details
      const amount = CallbackMetadata.Item.find((item: any) => item.Name === 'Amount')?.Value;
      const mpesaReceiptNumber = CallbackMetadata.Item.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
      const transactionDate = CallbackMetadata.Item.find((item: any) => item.Name === 'TransactionDate')?.Value;
      
      // Get payment details
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .select('user_id, plan_type, prorated_amount')
        .eq('id', paymentId)
        .single();
      
      if (paymentError) {
        throw paymentError;
      }
      
      // Update payment status
      await supabase
        .from('payments')
        .update({
          status: 'success',
          transaction_id: mpesaReceiptNumber,
          start_date: new Date().toISOString(),
          end_date: calculateEndDate(paymentData.plan_type),
        })
        .eq('id', paymentId);
      
      // Update or create subscription
      const startDate = new Date();
      const endDate = calculateEndDate(paymentData.plan_type);
      
      // Calculate next due date based on billing cycle
      const { data: nextDueDate, error: nextDueDateError } = await supabase
        .rpc('calculate_next_due_date', {
          billing_cycle: paymentData.plan_type
        });
      
      if (nextDueDateError) {
        console.error('Error calculating next due date:', nextDueDateError);
      }
      
      const { data: existingSubscription } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', paymentData.user_id)
        .single();
      
      if (existingSubscription) {
        // Update existing subscription
        await supabase
          .from('subscriptions')
          .update({
            status: 'active',
            plan_type: paymentData.plan_type,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            billing_cycle: paymentData.plan_type,
            next_due_date: nextDueDate || null,
            last_payment_date: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingSubscription.id);
      } else {
        // Create new subscription
        await supabase
          .from('subscriptions')
          .insert({
            user_id: paymentData.user_id,
            status: 'active',
            plan_type: paymentData.plan_type,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            billing_cycle: paymentData.plan_type,
            next_due_date: nextDueDate || null,
            last_payment_date: new Date().toISOString(),
          });
      }
      
      // Update user subscription status
      await supabase
        .from('users')
        .update({
          subscription_status: 'active',
          subscription_end_at: endDate.toISOString(),
        })
        .eq('id', paymentData.user_id);
    } else {
      // Payment failed
      await supabase
        .from('payments')
        .update({
          status: 'failed',
        })
        .eq('id', paymentId);
    }
  } catch (error) {
    console.error('Error processing M-PESA callback:', error);
    throw error;
  }
}

// Calculate subscription end date based on plan type
function calculateEndDate(planType: string): Date {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  if (planType === 'monthly') {
    // For monthly plans, end date is the last day of the current month
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    return lastDayOfMonth;
  } else if (planType === 'annual') {
    // For annual plans, end date is December 31st of the current year
    const endOfYear = new Date(currentYear, 11, 31);
    return endOfYear;
  }
  
  // Default to 30 days if plan type is unknown
  return new Date(now.setDate(now.getDate() + 30));
}

// Check if user has active subscription
export async function checkSubscriptionStatus(userId: string): Promise<{
  isActive: boolean;
  endDate?: Date;
  planType?: string;
  daysRemaining?: number;
  isInTrial?: boolean;
}> {
  try {
    // Get user subscription status
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('subscription_status, subscription_end_at, trial_started_at')
      .eq('id', userId)
      .single();
    
    if (userError) {
      throw userError;
    }
    
    const now = new Date();
    
    // Check if user is in trial period
    if (userData.subscription_status === 'trial' && userData.trial_started_at) {
      const trialStartDate = new Date(userData.trial_started_at);
      const trialEndDate = new Date(trialStartDate);
      trialEndDate.setDate(trialEndDate.getDate() + 7); // 7-day trial
      
      const isInTrial = now < trialEndDate;
      const daysRemaining = isInTrial 
        ? Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      
      return {
        isActive: isInTrial,
        endDate: trialEndDate,
        planType: 'trial',
        daysRemaining,
        isInTrial: true,
      };
    }
    
    // Check if user has active subscription
    if (userData.subscription_status === 'active' && userData.subscription_end_at) {
      const endDate = new Date(userData.subscription_end_at);
      const isActive = now < endDate;
      const daysRemaining = isActive 
        ? Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      
      // Get subscription details
      const { data: subscriptionData } = await supabase
        .from('subscriptions')
        .select('plan_type')
        .eq('user_id', userId)
        .single();
      
      return {
        isActive,
        endDate,
        planType: subscriptionData?.plan_type,
        daysRemaining,
        isInTrial: false,
      };
    }
    
    // Default return for expired or no subscription
    return {
      isActive: false,
      isInTrial: false,
    };
  } catch (error) {
    console.error('Error checking subscription status:', error);
    throw error;
  }
}

export { SUBSCRIPTION_PLANS, initiateSTKPush }

export { checkSubscriptionStatus }

export { processMpesaCallback }