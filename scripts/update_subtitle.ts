import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in env.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Fetching data from Supabase...");
  const { data, error } = await supabase.from('cms_data').select('data').eq('id', 1).single();
  
  if (error || !data) {
    console.error("Error fetching data:", error);
    return;
  }

  let cmsData = data.data;

  // Initialize structure if needed
  if (!cmsData.home) cmsData.home = {};
  if (!cmsData.home.hero) cmsData.home.hero = {};

  // Update the subtitle
  cmsData.home.hero.subtitle = "Projekty instalacji elektrycznych i fotowoltaicznych, ekspertyzy techniczne, opinie pożarowe oraz wsparcie w dotacjach – kompleksowe wsparcie dla firm i klientów indywidualnych";

  console.log("Updating Supabase...");
  const { error: updateError } = await supabase
    .from('cms_data')
    .update({ data: cmsData })
    .eq('id', 1);

  if (updateError) {
    console.error("Error updating:", updateError);
  } else {
    console.log("Successfully updated the subtitle in Supabase!");
  }
}

run();
