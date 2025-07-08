import { checkSubscriptionStatus } from '@/lib/mpesa';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    // Get user ID from query params
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }
    
    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();
    
    if (userError || !user) {
      return new Response('User not found', { status: 404 });
    }
    
    // Check subscription status
    const status = await checkSubscriptionStatus(userId);
    
    return Response.json(status);
  } catch (error: any) {
    console.error('Error checking subscription status:', error);
    return new Response(error.message || 'Internal server error', { status: 500 });
  }
}