import type { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email jest wymagany.' });
  }

  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

  if (!MAILERLITE_API_KEY) {
    console.error('[NEWSLETTER] Brak MAILERLITE_API_KEY');
    return res.status(500).json({ 
      success: false, 
      message: 'Serwer nie jest skonfigurowany (brak klucza API).' 
    });
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY.trim()}`
      },
      body: JSON.stringify({
        email: email,
        status: 'active',
      })
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('[NEWSLETTER] MailerLite Error:', data);
      return res.status(response.status).json({ 
        success: false, 
        message: data.message || 'Błąd MailerLite'
      });
    }
  } catch (err: any) {
    console.error('[NEWSLETTER] Fetch Error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Błąd połączenia: ' + err.message 
    });
  }
}
