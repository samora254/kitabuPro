import { initiateSTKPush } from '@/lib/mpesa';
import { supabase } from '@/lib/supabase';
import { SUBSCRIPTION_PLANS } from '@/lib/mpesa';

export async function POST(request: Request) {
  try {
    // Get user ID and phone number from request
    const { userId, phoneNumber, planType } = await request.json();
    
    if (!userId || !phoneNumber || !planType) {
      return new Response('Missing required fields', { status: 400 });
    }
    
    // Validate plan type
    if (!['monthly', 'annual'].includes(planType)) {
      return new Response('Invalid plan type', { status: 400 });
    }
    
    // Get plan amount
    const planAmount = planType === 'monthly' 
      ? SUBSCRIPTION_PLANS.MONTHLY.amount 
      : SUBSCRIPTION_PLANS.ANNUAL.amount;
    
    // Initiate STK Push for renewal
    const result = await initiateSTKPush(
      phoneNumber,
      planAmount, // This will now be prorated if needed by the initiateSTKPush function
      userId,
      planType as 'monthly' | 'annual'
    );
    
    return Response.json({
      success: true,
      checkoutRequestID: result.checkoutRequestID,
      paymentId: result.paymentId,
    });
  } catch (error: any) {
    console.error('Error renewing subscription:', error);
    return new Response(error.message || 'Internal server error', { status: 500 });
  }
}