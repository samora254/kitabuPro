import { supabase } from '@/lib/supabase';

// This API route is meant to be called by a cron job to check for expired subscriptions
// and to trigger renewal notifications for upcoming renewals

export async function GET(request: Request) {
  try {
    // Check for expired subscriptions
    const { error: expiryError } = await supabase.rpc('check_expired_subscriptions');
    
    if (expiryError) {
      throw new Error(`Error checking expired subscriptions: ${expiryError.message}`);
    }
    
    // Check for subscriptions due for renewal (3 days before due date)
    const { data: dueSubscriptions, error: dueError } = await supabase
      .from('subscriptions')
      .select('id, user_id, plan_type, next_due_date, billing_cycle')
      .eq('status', 'active')
      .lt('next_due_date', new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString());
    
    if (dueError) {
      throw new Error(`Error checking due subscriptions: ${dueError.message}`);
    }
    
    // Process subscriptions due for renewal
    // In a real implementation, this would send notifications to users
    // For now, we'll just log the subscriptions
    console.log(`Found ${dueSubscriptions?.length || 0} subscriptions due for renewal`);
    
    return Response.json({
      success: true,
      expiredChecked: true,
      dueForRenewal: dueSubscriptions?.length || 0,
    });
  } catch (error: any) {
    console.error('Error in subscription check cron job:', error);
    return new Response(error.message || 'Internal server error', { status: 500 });
  }
}