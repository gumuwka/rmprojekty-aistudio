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
    const serviceIndex = cmsData.services.findIndex((s: any) => s.id === 'ekspertyza-stacja-ev');
    if (serviceIndex !== -1) {
      cmsData.services[serviceIndex].fullContent = 'Oferujemy wykonywanie specjalistycznych ekspertyz technicznych stacji ładowania pojazdów elektrycznych (EV), obejmujących ocenę stanu technicznego instalacji, analizę bezpieczeństwa użytkowania oraz weryfikację zgodności z obowiązującymi normami i przepisami.\n\nW ramach opracowania przeprowadzamy szczegółową analizę układów zasilania, zabezpieczeń elektrycznych, parametrów pracy urządzeń oraz poprawności wykonania instalacji. Oceniamy również warunki przyłączeniowe, jakość wykonania połączeń, dobór elementów systemu oraz ich zgodność z dokumentacją projektową i wymaganiami producentów.\n\nIstotnym elementem ekspertyzy jest ocena bezpieczeństwa eksploatacji w kontekście wymagań Urzędu Dozoru Technicznego (UDT) oraz innych przepisów regulujących użytkowanie infrastruktury ładowania. W razie potrzeby wskazujemy nieprawidłowości, potencjalne zagrożenia oraz rekomendacje dotyczące modernizacji lub dostosowania instalacji do obowiązujących wymagań.\n\nEkspertyza dopuszczalności instalacji prywatnego punktu ładowania do 11 kW wykonywana jest przez uprawnionego projektanta instalacji elektrycznych. Na podstawie dostarczonej dokumentacji, wizji lokalnej oraz wywiadu z zarządcą budynku zostają ocenione możliwości techniczne budynku w związku z montażem prywatnego punktu ładowania.';
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
