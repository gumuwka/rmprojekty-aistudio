import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  const PORT = 3000;

  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

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

  // CMS API: Get content
  app.get("/api/content", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('cms_data')
        .select('data')
        .eq('id', 1)
        .single();
      
      if (error) throw error;
      res.json(data.data);
    } catch (error) {
      console.error("Fetch error:", error);
      res.status(500).json({ error: "Failed to read content" });
    }
  });

  // CMS API: Save content
  app.post("/api/content", async (req, res) => {
    try {
      const { error } = await supabase
        .from('cms_data')
        .upsert({ id: 1, data: req.body });
      
      if (error) throw error;
      res.json({ success: true });
    } catch (error) {
      console.error("Save error:", error);
      res.status(500).json({ error: "Failed to save content" });
    }
  });

  // CMS API: Upload image
  app.post("/api/upload", async (req, res) => {
    try {
      const { name, data } = req.body;
      const base64Data = data.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      
      const fileName = `${Date.now()}-${name}`;
      
      const { data: uploadData, error } = await supabase.storage
        .from('media')
        .upload(fileName, buffer, {
          contentType: 'image/png', // fallback
          upsert: true
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);
      
      res.json({ url: publicUrl });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        allowedHosts: 'all',
      },
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
