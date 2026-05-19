import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { services } from '../servicesData';
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Layout, 
  Construction, 
  FileText, 
  Home, 
  Thermometer, 
  Sun, 
  Plane, 
  Link as LinkIcon, 
  BatteryCharging, 
  ClipboardCheck, 
  TrendingUp, 
  File 
} from 'lucide-react';
import { useState, useEffect } from 'react';

const IconsMap: Record<string, any> = {
  ShieldCheck,
  Layout,
  Construction,
  FileText,
  Zap,
  Home,
  Thermometer,
  Sun,
  Plane,
  Link: LinkIcon,
  BatteryCharging,
  ClipboardCheck,
  TrendingUp,
  File
};

const serviceCategories: Record<string, string> = {
  'projekty-pv-sol': 'projekty-i-ekspertyzy',
  'analiza-konstrukcyjna': 'projekty-i-ekspertyzy',
  'farmy-fotowoltaiczne': 'projekty-i-ekspertyzy',
  'termowizja-dron': 'projekty-i-ekspertyzy',
  'projekt-stacja-ev': 'projekty-i-ekspertyzy',
  'ekspertyza-stacja-ev': 'projekty-i-ekspertyzy',
  'uzgodnienia-ppoz': 'opinie-i-uzgodnienia',
  'przylaczenie-pv': 'opinie-i-uzgodnienia',
  'zwiekszenie-mocy': 'opinie-i-uzgodnienia',
  'grant-oze': 'dofinansowania',
  'czyste-powietrze': 'dofinansowania',
  'moje-cieplo': 'dofinansowania',
  'moj-prad': 'dofinansowania'
};

const categoryDisplayNames: Record<string, string> = {
  'projekty-i-ekspertyzy': 'Projekty i Ekspertyzy',
  'opinie-i-uzgodnienia': 'Opinie i Uzgodnienia',
  'dofinansowania': 'Dofinansowania'
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    document.title = "Oferta Usług - RAD MAR";
  }, []);

  const categories = [
    { id: 'all', name: 'Wszystkie' },
    { id: 'projekty-i-ekspertyzy', name: 'Projekty i Ekspertyzy' },
    { id: 'opinie-i-uzgodnienia', name: 'Opinie i Uzgodnienia' },
    { id: 'dofinansowania', name: 'Dofinansowania' }
  ];

  const groups = [
    {
      id: 'projekty-i-ekspertyzy',
      name: 'Projekty i Ekspertyzy',
      tagline: 'Dokumentacja techniczna, analizy statyczne oraz projekty wykonawcze',
      items: services.filter(s => serviceCategories[s.id] === 'projekty-i-ekspertyzy')
    },
    {
      id: 'opinie-i-uzgodnienia',
      name: 'Opinie i Uzgodnienia',
      tagline: 'Weryfikacja bezpieczeństwa i formalności instalacyjnych',
      items: services.filter(s => serviceCategories[s.id] === 'opinie-i-uzgodnienia')
    },
    {
      id: 'dofinansowania',
      name: 'Dofinansowania',
      tagline: 'Dotacje, granty rządowe oraz wsparcie w programach ekologicznych',
      items: services.filter(s => serviceCategories[s.id] === 'dofinansowania')
    }
  ];

  const filteredGroups = activeCategory === 'all'
    ? groups
    : groups.filter(g => g.id === activeCategory);

  return (
    <div className="pt-32 md:pt-48 pb-24">
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 italic tracking-tight"
          >
            Nasza Oferta
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-xl text-stone-600 leading-relaxed italic"
          >
            Od uzgodnień PPOŻ po farmy fotowoltaiczne. Wybierz rozwiązanie dostosowane do potrzeb Twojego biznesu lub inwestycji prywatnej.
          </motion.p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-400 shadow-sm'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Grouped Services Sections */}
        <div className="space-y-20 mb-24">
          {filteredGroups.map((group) => (
            <div key={group.id} className="scroll-mt-32">
              {/* Category Group Header */}
              <div className="border-b border-stone-200 pb-6 mb-10">
                <h2 className="text-3xl font-bold text-stone-900 tracking-tight italic">
                  {group.name}
                </h2>
              </div>

              {/* Grid of cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.items.map((service, index) => {
                  const IconComponent = IconsMap[service.icon] || File;
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Link
                        to={`/oferta/${service.id}`}
                        className="group flex flex-col h-full bg-white p-8 rounded-[2.5rem] border border-stone-200 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-8">
                          <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                            <IconComponent size={28} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider bg-stone-100 text-stone-500 px-3 py-1 rounded-full group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                            {categoryDisplayNames[serviceCategories[service.id]]}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 italic leading-tight group-hover:text-orange-600 transition-colors">{service.title}</h3>
                        <p className="text-stone-500 text-sm leading-relaxed mb-8 flex-grow italic">
                          {service.shortDescription}
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                          <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 group-hover:text-orange-500 transition-colors">
                            Szczegóły usługi
                          </span>
                          <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-all">
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Support Banner */}
        <div className="bg-stone-900 rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap size={200} />
           </div>
           <h2 className="text-3xl md:text-4xl font-bold mb-6 italic relative z-10">Nie wiesz który projekt jest Ci potrzebny?</h2>
           <p className="text-stone-400 text-lg mb-10 max-w-2xl mx-auto italic relative z-10">
             Nasi eksperci doradzą Ci bezpłatnie i pomogą w doborze odpowiedniej dokumentacji dla Twojej instalacji.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
             <a 
               href="tel:+48793376709" 
               className="bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
             >
               Zadzwoń do nas
             </a>
             <Link 
               to="/kontakt" 
               className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg transition-all"
             >
               Wyślij zapytanie
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
