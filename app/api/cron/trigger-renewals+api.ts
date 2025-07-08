import { supabase } from '@/lib/supabase';
import { SUBSCRIPTION_PLANS } from '@/lib/mpesa';

// This API route is meant to be called by a cron job to trigger renewal notifications
// for subscriptions that are due for renewal in the next 3 days

export async function GET(request: Request) {
  try {
    // Get subscriptions due for renewal in the next 3 days
    const { data: dueSubscriptions, error } = await supabase
      .from('subscriptions')
      .select('id, user_id, plan_type, next_due_date, users!inner(email, name)')
      .eq('status', 'active')
      .lt('next_due_date', new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString());
    
    if (error) {
      throw new Error(`Error fetching due subscriptions: ${error.message}`);
    }
    
    // In a real implementation, this would send emails or push notifications to users
    // For now, we'll just log the subscriptions
    console.log(`Found ${dueSubscriptions.length} subscriptions due for renewal`);
    
    // Process each subscription
    for (const subscription of dueSubscriptions) {
      // Get plan amount
      const planAmount = subscription.plan_type === 'monthly' 
        ? SUBSCRIPTION_PLANS.MONTHLY.amount 
        : SUBSCRIPTION_PLANS.ANNUAL.amount;
      
      // In a real implementation, this would create a renewal notification
      console.log(`Sending renewal notification to ${subscription.users.email} for ${subscription.plan_type} plan`);
      
      // Record the notification in the database
      await supabase
        .from('dashboard_content')
        .insert({
          role: 'student',
          content_type: 'renewal_notification',
          data: {
            subscription_id: subscription.id,
            user_id: subscription.user_id,
            plan_type: subscription.plan_type,
            amount: planAmount,
            due_date: subscription.next_due_date,
          },
        });
    }
    
    return Response.json({
      success: true,
      notificationsSent: dueSubscriptions.length,
    });
  } catch (error: any) {
    console.error('Error in renewal notification cron job:', error);
    return new Response(error.message || 'Internal server error', { status: 500 });
  }
}