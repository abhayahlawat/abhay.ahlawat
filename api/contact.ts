import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = request.body;

    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await resend.emails.send({
      // Resend requires a verified domain to send from, 
      // but for testing on the free tier, you can use onboarding@resend.dev 
      // ONLY if the 'to' address is the email registered with your Resend account.
      from: 'Portfolio Contact <onboarding@resend.dev>',
      // TODO: Replace with your personal email address
      to: ['ahlawatabhay21@gmail.com'],
      subject: `New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                background-color: #fafafa;
                color: #111111;
                margin: 0;
                padding: 40px 20px;
                line-height: 1.6;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #eaeaea;
                border-radius: 8px;
                padding: 40px;
              }
              .header {
                font-size: 13px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #666666;
                margin-bottom: 30px;
                border-bottom: 1px solid #eaeaea;
                padding-bottom: 24px;
              }
              .field {
                margin-bottom: 24px;
              }
              .label {
                font-size: 11px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #888888;
                margin-bottom: 6px;
                display: block;
              }
              .value {
                font-size: 16px;
                color: #111111;
              }
              .message {
                font-size: 16px;
                color: #111111;
                background-color: #f9f9f9;
                padding: 24px;
                border-radius: 6px;
                margin-top: 8px;
                white-space: pre-wrap;
              }
              .footer {
                margin-top: 40px;
                font-size: 12px;
                color: #888888;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">New Portfolio Message</div>
              
              <div class="field">
                <span class="label">Name</span>
                <span class="value">${name}</span>
              </div>
              
              <div class="field">
                <span class="label">Email</span>
                <span class="value">
                  <a href="mailto:${email}" style="color: #111111; text-decoration: none;">
                    ${email}
                  </a>
                </span>
              </div>
              
              <div class="field">
                <span class="label">Message</span>
                <div class="message">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              Sent securely via your Portfolio
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      return response.status(400).json({ error });
    }

    return response.status(200).json({ data });
  } catch (error) {
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
