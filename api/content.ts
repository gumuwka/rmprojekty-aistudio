import { createClient } from '@supabase/supabase-js';
import { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('cms_data')
        .select('data')
        .eq('id', 1)
        .single();
      
      if (error) throw error;
      return res.status(200).json(data.data);
    } catch (error) {
      return res.status(500).json({ error: "Failed to read content" });
    }
  }

  if (req.method === 'POST') {
    try {
      const { error } = await supabase
        .from('cms_data')
        .upsert({ id: 1, data: req.body });
      
      if (error) throw error;
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to save content" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
