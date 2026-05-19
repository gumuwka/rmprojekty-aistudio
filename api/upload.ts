import { createClient } from '@supabase/supabase-js';
import { VercelRequest, VercelResponse } from '@vercel/node';
import sharp from 'sharp';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, data } = req.body;

    // Wykrycie oryginalnego typu MIME z nagłówka base64
    const mimeMatch = data.match(/^data:(image\/\w+);base64,/);
    const detectedType = mimeMatch ? mimeMatch[1] : 'image/png';

    // Usunięcie nagłówka base64
    const base64Data = data.replace(/^data:image\/\w+;base64,/, "");
    const rawBuffer = Buffer.from(base64Data, 'base64');

    // Konwersja do WebP z optymalizacją rozmiaru
    const webpBuffer = await sharp(rawBuffer)
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    // Nazwa pliku zawsze z rozszerzeniem .webp
    const fileName = `${Date.now()}-${name.replace(/\.[^.]+$/, '')}.webp`;

    const { data: uploadData, error } = await supabase.storage
      .from('media')
      .upload(fileName, webpBuffer, {
        contentType: 'image/webp',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fileName);

    return res.status(200).json({ url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload image" });
  }
}
