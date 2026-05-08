import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Email Transporter (Lazy loaded or configured from env)
  const getTransporter = () => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not found. Emails will be logged to console only.");
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

  // API Route for the contact form
  app.post("/api/contact", async (req, res) => {
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
        // We still log it to console as fallback
      }
    } else {
      console.log("--- MOCK EMAIL (No credentials) ---");
      console.log(emailBody);
      console.log("------------------------------------");
    }

    res.json({ 
      success: true, 
      message: "Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się z Tobą najszybciej jak to możliwe."
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
