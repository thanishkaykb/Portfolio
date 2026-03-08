import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #2dd4bf, #7c3aed); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">📩 New Portfolio Message</h1>
        </div>
        <div style="padding: 30px;">
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
            <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 600;">${name}</p>
            <p style="margin: 4px 0 0 0; color: #475569; font-size: 14px;">${email}</p>
          </div>
          ${subject ? `
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 4px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
            <p style="margin: 0; color: #1e293b; font-size: 15px;">${subject}</p>
          </div>
          ` : ''}
          <div>
            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="margin: 0; color: #94a3b8; font-size: 12px; text-align: center;">
            Sent from your portfolio contact form
          </p>
        </div>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['thanishka.ykb@gmail.com'],
        subject: `Portfolio: ${subject || 'New message'} from ${name}`,
        html: htmlContent,
        reply_to: email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to send email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Email sent successfully:', data.id);
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
