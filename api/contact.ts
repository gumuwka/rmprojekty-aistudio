import nodemailer from "nodemailer";
import dotenv from "dotenv";
import type { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();

const getTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP credentials not found.");
    return null;
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, phone, service, message, company } = req.body;
  
  const transporter = getTransporter();
  const receiver = process.env.EMAIL_RECEIVER || "ziezio2@gmail.com";

  const emailBody = `
    NOWE ZAPYTANIE - RM PROJEKTY
    ---------------------------
    Imię/Nazwisko: ${name}
    Firma: ${company || 'Nie podano'}
    E-mail: ${email}
    Telefon: ${phone}
    Usługa: ${service}
    
    Wiadomość:
    ${message}
    ---------------------------
    Wiadomość wygenerowana automatycznie przez rmprojekty.pl
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"RM PROJEKTY Formularz" <${process.env.SMTP_USER}>`,
        to: receiver,
        subject: `Nowy lead: ${service} - ${name}`,
        text: emailBody,
      });
      console.log(`E-mail sent successfully to ${receiver}`);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ success: false, message: "Błąd podczas wysyłania wiadomości." });
    }
  } else {
    console.log("--- MOCK EMAIL (No credentials) ---");
    console.log(emailBody);
    console.log("------------------------------------");
  }

  return res.status(200).json({ 
    success: true, 
    message: "Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się z Tobą najszybciej jak to możliwe."
  });
}
