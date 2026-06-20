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
    const serviceIndex = cmsData.services.findIndex((s: any) => s.id === 'projekty-pv-sol');
    if (serviceIndex !== -1) {
      cmsData.services[serviceIndex].fullContent = 'Specjalizujemy się w projektowaniu nowoczesnych instalacji fotowoltaicznych z wykorzystaniem profesjonalnego oprogramowania PV*SOL. Narzędzie to umożliwia tworzenie szczegółowych modeli 3D oraz przeprowadzanie zaawansowanych analiz technicznych, dzięki którym już na etapie projektowym można precyzyjnie określić parametry pracy przyszłej instalacji.\n\nW ramach realizowanych opracowań wykonujemy kompleksowe wizualizacje rozmieszczenia modułów fotowoltaicznych, analizę zacienienia oraz optymalizację konfiguracji systemu pod kątem maksymalnej produkcji energii. Każdy projekt uwzględnia indywidualne warunki lokalizacji, orientację budynku, kąt nachylenia dachu oraz rzeczywiste warunki nasłonecznienia.';
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
