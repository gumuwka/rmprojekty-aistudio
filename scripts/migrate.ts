import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  try {
    const contentPath = path.join(process.cwd(), 'content.json');
    const data = await fs.readFile(contentPath, 'utf-8');
    const jsonData = JSON.parse(data);

    console.log('Migrating content to Supabase...');
    const { error } = await supabase
      .from('cms_data')
      .upsert({ id: 1, data: jsonData });

    if (error) throw error;
    console.log('Content migrated successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrate();
