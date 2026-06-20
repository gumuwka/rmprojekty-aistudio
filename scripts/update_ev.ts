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

  // Update the service
  if (cmsData.services && Array.isArray(cmsData.services)) {
    const serviceIndex = cmsData.services.findIndex((s: any) => s.id === 'projekt-stacja-ev');
    if (serviceIndex !== -1) {
      cmsData.services[serviceIndex].fullContent = 'Oferujemy kompleksowe opracowanie projektów stacji ładowania pojazdów elektrycznych (EV), obejmujące zarówno rozwiązania dla klientów indywidualnych, jak i inwestycji komercyjnych oraz publicznych. Projektujemy nowoczesne i bezpieczne instalacje dostosowane do aktualnych wymagań technicznych, przepisów prawa oraz standardów operatorów sieci elektroenergetycznych.\n\nKażdy projekt przygotowywany jest indywidualnie, z uwzględnieniem warunków przyłączeniowych, lokalizacji oraz charakteru obiektu. Zapewniamy rozwiązania zgodne z obowiązującymi normami, gwarantujące bezpieczną i niezawodną eksploatację stacji ładowania.\n\nIstotnym elementem projektu jest spełnienie wymagań formalnych i technicznych związanych z dopuszczeniem stacji ładowania do użytkowania, w tym wytycznych Urzędu Dozoru Technicznego (UDT). W zależności od typu urządzenia i sposobu jego użytkowania, przygotowujemy dokumentację niezbędną do procesu odbioru, zgłoszeń oraz uzyskania wymaganych dopuszczeń eksploatacyjnych.';
      delete cmsData.services[serviceIndex].features;
      
      console.log("Updating Supabase...");
      const { error: updateError } = await supabase
        .from('cms_data')
        .update({ data: cmsData })
        .eq('id', 1);

      if (updateError) {
        console.error("Error updating:", updateError);
      } else {
        console.log("Successfully updated the service in Supabase!");
      }
    } else {
      console.log("Service not found in Supabase data.");
    }
  } else {
    console.log("No services array in Supabase data.");
  }
}

run();
