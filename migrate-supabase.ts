import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Zastąp te wartości tymi z pliku .env!
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in env.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateImages() {
  console.log("Starting image migration in 'media' bucket...");
  
  const { data: files, error } = await supabase.storage.from('media').list();
  if (error) {
    console.error("Error listing files:", error);
    return;
  }

  for (const file of files) {
    if (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) {
      console.log(`Processing ${file.name}...`);
      
      const { data: fileData, error: downloadError } = await supabase.storage.from('media').download(file.name);
      if (downloadError) {
        console.error(`Failed to download ${file.name}:`, downloadError);
        continue;
      }

      const buffer = Buffer.from(await fileData.arrayBuffer());
      
      try {
        const webpBuffer = await sharp(buffer)
          .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer();

        const newName = file.name.replace(/\.[^.]+$/, '') + '.webp';
        
        const { error: uploadError } = await supabase.storage.from('media').upload(newName, webpBuffer, {
          contentType: 'image/webp',
          upsert: true
        });

        if (uploadError) {
          console.error(`Failed to upload ${newName}:`, uploadError);
        } else {
          console.log(`Successfully migrated to ${newName}`);
        }
      } catch (e) {
        console.error(`Sharp error for ${file.name}:`, e);
      }
    }
  }
}

async function migrateContentJson() {
  console.log("Starting content.json migration...");
  
  const { data: tableData, error } = await supabase
    .from('cms_data')
    .select('data')
    .eq('id', 1)
    .single();

  if (error || !tableData) {
    console.error("Error reading from cms_data table:", error);
    return;
  }

  let text = JSON.stringify(tableData.data);
  
  // Zastąp .png na .webp we wszystkich ścieżkach
  text = text.replace(/\.png/g, '.webp');
  text = text.replace(/\.jpg/g, '.webp');
  text = text.replace(/\.jpeg/g, '.webp');
  
  const updatedData = JSON.parse(text);
  
  const { error: uploadError } = await supabase
    .from('cms_data')
    .update({ data: updatedData })
    .eq('id', 1);

  if (uploadError) {
    console.error("Error updating cms_data:", uploadError);
  } else {
    console.log("Successfully migrated content.json in database");
  }
}

async function run() {
  // await migrateImages(); // already done
  await migrateContentJson();
  console.log("Migration complete.");
}

run();
