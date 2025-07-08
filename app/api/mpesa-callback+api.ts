import { processMpesaCallback } from '@/lib/mpesa';

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const paymentId = url.searchParams.get('paymentId');
    
    if (!paymentId) {
      return new Response('Payment ID is required', { status: 400 });
    }
    
    const body = await request.json();
    
    // Process the M-PESA callback
    await processMpesaCallback(body, paymentId);
    
    return Response.json({ success: true });
  } catch (error: any) {
    console.error('Error processing M-PESA callback:', error);
    return new Response(error.message || 'Internal server error', { status: 500 });
  }
}