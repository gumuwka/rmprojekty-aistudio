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
    const serviceIndex = cmsData.services.findIndex((s: any) => s.id === 'analiza-konstrukcyjna');
    if (serviceIndex !== -1) {
      cmsData.services[serviceIndex].fullContent = 'Wykonujemy specjalistyczne ekspertyzy techniczne nośności konstrukcji dachowych przeznaczonych pod montaż instalacji fotowoltaicznych. Celem opracowania jest szczegółowa ocena stanu technicznego dachu oraz określenie jego zdolności do bezpiecznego przenoszenia dodatkowych obciążeń wynikających z montażu modułów fotowoltaicznych, konstrukcji wsporczych oraz oddziaływań środowiskowych, takich jak śnieg i wiatr.\n\nNa podstawie przeprowadzonych obliczeń statyczno-wytrzymałościowych analizujemy parametry konstrukcyjne obiektu, weryfikujemy nośność poszczególnych elementów oraz określamy dopuszczalne obciążenia użytkowe. Ekspertyza pozwala jednoznacznie ocenić możliwość instalacji systemu fotowoltaicznego oraz wskazać ewentualne wymagania dotyczące wzmocnienia konstrukcji.';
      delete cmsData.services[serviceIndex].features;
      delete cmsData.services[serviceIndex].featuresTitle;
      
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
