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
    const serviceIndex = cmsData.services.findIndex((s: any) => s.id === 'farmy-fotowoltaiczne');
    if (serviceIndex !== -1) {
      cmsData.services[serviceIndex].fullContent = 'Oferujemy kompleksowe opracowanie dokumentacji technicznej i formalnej niezbędnej do realizacji farm fotowoltaicznych. Wspieramy inwestorów na każdym etapie procesu inwestycyjnego – od koncepcji i analiz wstępnych, poprzez przygotowanie dokumentacji projektowej, aż po uzyskanie wymaganych uzgodnień i pozwoleń.';
      cmsData.services[serviceIndex].features = [
        'Przygotowanie koncepcji projektowych',
        'Wnioski o warunki przyłączenia do sieci elektroenergetycznej',
        'Decyzja o warunkach zabudowy',
        'Projekt budowlany',
        'Wizualizacje farm fotowoltaicznych w programie PV*SOL/CAD'
      ];
      cmsData.services[serviceIndex].featuresTitle = 'W zakres naszych usług wchodzi:';
      
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
