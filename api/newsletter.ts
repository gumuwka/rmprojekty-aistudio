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
    console.error('[NEWSLETTER] Brak klucza API MailerLite w pliku .env');
    return res.status(500).json({ success: false, message: 'Błąd konfiguracji serwera.' });
  }

  try {
    console.log(`[NEWSLETTER] Próba zapisu dla: ${email}`);
    
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      },
      body: JSON.stringify({
        email: email,
        status: 'active', // 'active' ensures they are added directly without double opt-in (if allowed)
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`[NEWSLETTER] SUKCES:`, data);
      return res.status(200).json({ success: true });
    } else {
      console.error('[NEWSLETTER] BŁĄD MailerLite:', {
        status: response.status,
        statusText: response.statusText,
        data: data
      });
      return res.status(response.status).json({ 
        success: false, 
        message: data.message || 'Błąd po stronie serwera subskrypcji.' 
      });
    }
  } catch (err) {
    console.error('[NEWSLETTER] BŁĄD KRYTYCZNY:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Błąd połączenia z bazą newslettera.' 
    });
  }
}
