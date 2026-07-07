import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Mail, 
  Phone, 
  Calculator, 
  Loader2,
  Check,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Gavel,
  Layout, 
  Construction, 
  FileText, 
  Zap, 
  Home, 
  Thermometer, 
  Sun, 
  Plane, 
  Link as LinkIcon, 
  BatteryCharging, 
  ClipboardCheck, 
  TrendingUp, 
  File,
  X
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

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
import { useContent } from '../context/ContentContext';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { content, loading } = useContent();

  const displayServices = content?.services || [];
  const cleanStr = (str: any) => typeof str === 'string' ? str.replace(/[\u200B-\u200D\uFEFF]/g, '') : str;
  const cleanId = cleanStr(id);
  const service = displayServices.find((s: any) => String(cleanStr(s.id)) === cleanId);

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (carouselRef.current && service?.gallery) {
      const container = carouselRef.current;
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.scrollWidth / service.gallery.length;
      const newIndex = Math.round(scrollPosition / itemWidth);
      setActiveIndex(newIndex);
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollToDot = (index: number) => {
    if (carouselRef.current && service?.gallery) {
      const itemWidth = carouselRef.current.scrollWidth / service.gallery.length;
      carouselRef.current.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!service?.gallery || service.gallery.length === 0) return;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [service?.gallery]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (service) {
      document.title = `${service.title} - RAD MAR`;
    }
  }, [id, service]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center justify-center min-h-[50vh]">
         <Loader2 className="animate-spin text-orange-500 mb-4" size={40} />
         <p className="text-stone-500 font-medium tracking-widest uppercase text-xs">Ładowanie usługi...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold mb-8 italic">Usługa nie znaleziona</h1>
        <Link to="/#oferta" className="bg-black text-white px-8 py-3 rounded-full font-bold">Wróć do oferty</Link>
      </div>
    );
  }

  const IconComponent = IconsMap[service.icon] || File;

  return (
    <div className="pt-24 pb-32">
       {/* Hero/Header */}
       <section className="bg-stone-50 py-20 border-b border-stone-200">
          <div className="container mx-auto px-4 md:px-6">
            <Link to="/#oferta" className="inline-flex items-center gap-2 text-stone-500 hover:text-black transition-colors mb-12 font-semibold">
               <ArrowLeft size={18} /> Powrót do wszystkich usług
            </Link>
            
            <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
               <div className="lg:w-2/3">
                  <div className="w-16 h-16 bg-orange-100 flex items-center justify-center rounded-2xl text-orange-600 mb-8">
                     <IconComponent size={32} />
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 italic tracking-tight">{service.title}</h1>
                   {service.subtitle && (
                     <p className="text-lg md:text-2xl text-orange-600 font-bold mb-8 italic">
                        {service.subtitle}
                     </p>
                   )}
                  <p className="text-xl text-stone-600 leading-relaxed max-w-3xl text-justify">
                     {service.shortDescription}
                  </p>
               </div>
               <div className="lg:w-1/3">
                  <div className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-xl shadow-stone-200/40">
                     <h3 className="text-xl font-bold mb-6 italic">Masz pytania do tej usługi?</h3>
                     <div className="flex flex-col gap-4">
                        <a href="tel:+48793376709" className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-all font-bold">
                           <Phone size={20} className="text-orange-500" />
                           +48 793 376 709
                        </a>
                        <a href="mailto:biuro.projektpv@gmail.com" className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-all font-bold">
                           <Mail size={20} className="text-orange-500" />
                           biuro.projektpv@gmail.com
                        </a>
                        <Link to="/kontakt" className="bg-black text-white text-center py-4 rounded-xl font-bold mt-2 hover:bg-orange-600 transition-colors">
                           Zapytaj o wycenę
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
          </div>
       </section>

       {/* Detailed Content */}
       <section className="py-24">
          <div className="container mx-auto px-4 md:px-6">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8">
                   <div className="prose prose-lg max-w-none prose-stone">
                      <h2 className="text-3xl font-bold mb-8">O usłudze</h2>
                      <p className="text-xl text-stone-600 leading-relaxed mb-12 whitespace-pre-line text-justify">
                         {service.fullContent}
                      </p>

                      {service.gallery && service.gallery.length > 0 && (
                        <div className="mb-16">
                           <div className="flex items-center justify-between mb-8">
                             <h3 className="text-2xl font-bold">Przykładowe realizacje</h3>
                             <div className="flex gap-2">
                               <button 
                                 onClick={scrollPrev}
                                 className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition-colors"
                               >
                                 <ChevronLeft size={20} />
                               </button>
                               <button 
                                 onClick={scrollNext}
                                 className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition-colors"
                               >
                                 <ChevronRight size={20} />
                               </button>
                             </div>
                           </div>
                           <div className="max-w-3xl mx-auto">
                             <div 
                               ref={carouselRef}
                               onScroll={handleScroll}
                               className="flex overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar relative"
                               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                             >
                               {service.gallery.map((imgUrl: string, idx: number) => (
                                 <div 
                                   key={idx} 
                                   className="w-full aspect-video shrink-0 snap-center rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow relative group"
                                   onClick={() => setLightboxImage(imgUrl)}
                                 >
                                   <img src={imgUrl} alt={`Realizacja ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                 </div>
                               ))}
                             </div>
                           </div>
                           
                           {/* Dots indicator */}
                           <div className="flex justify-center gap-2 mt-6">
                             {service.gallery.map((_, idx: number) => (
                               <button
                                 key={idx}
                                 onClick={() => scrollToDot(idx)}
                                 className={`h-2 rounded-full transition-all duration-300 ${
                                   idx === activeIndex ? 'w-8 bg-orange-500' : 'w-2 bg-stone-300 hover:bg-stone-400'
                                 }`}
                                 aria-label={`Przejdź do zdjęcia ${idx + 1}`}
                               />
                             ))}
                           </div>
                        </div>
                      )}

                      {service.requirementsGroups && (
                        <div className="mb-16">
                           <h3 className="text-2xl font-bold mb-8 italic">{service.requirementsTitle}</h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {service.requirementsGroups.map((group: any, i: number) => (
                                <div key={i} className="p-8 bg-stone-50 border border-stone-200 rounded-3xl">
                                   <h4 className="text-xl font-bold mb-6 text-orange-600 italic">{group.title}</h4>
                                   <ul className="space-y-4">
                                      {group.items?.map((item: any, j: number) => (
                                        <li key={j} className="flex gap-3 items-start text-stone-700 italic">
                                           <div className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0 mt-2" />
                                           <span>{item}</span>
                                        </li>
                                      ))}
                                   </ul>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}

                      {service.features && (
                         <div className="mb-16">
                            {service.featuresTitle && (
                               <h3 className="text-2xl font-bold mb-8 italic">{service.featuresTitle}</h3>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               {service.features.map((feature, i) => (
                                 <div key={i} className="flex gap-4 p-6 bg-white border border-stone-100 shadow-sm rounded-2xl items-start">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                                       <Check size={14} className="text-white" />
                                    </div>
                                    <span className="font-semibold text-stone-800 italic whitespace-pre-line">{feature}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                      )}

                      {service.serviceArea && (
                        <div className="mb-16">
                           <h3 className="text-2xl font-bold mb-8 italic">Teren świadczenia usług:</h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {service.serviceArea.map((area, i) => (
                                <div key={i} className="flex gap-4 p-6 bg-stone-50 border border-stone-200 rounded-2xl items-start shadow-sm">
                                   <MapPin className="text-orange-500 shrink-0 mt-0.5" size={20} />
                                   <p className="text-stone-700 font-medium italic leading-relaxed">{area}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}

                      {service.legalSafety && (
                        <div className="mb-16">
                           <h3 className="text-2xl font-bold mb-8 italic">Prawo i bezpieczeństwo:</h3>
                           <div className="grid grid-cols-1 gap-4">
                              {service.legalSafety.map((item, i) => (
                                <div key={i} className="flex gap-4 p-6 bg-blue-50 border border-blue-100 rounded-2xl items-start shadow-sm">
                                   <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={20} />
                                   <p className="text-stone-700 font-medium italic leading-relaxed">{item}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}



                      {service.extraNote && (
                        <div className="mb-16 p-8 bg-yellow-50 border border-yellow-200 rounded-3xl">
                           <div className="flex gap-4 items-start">
                              <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={24} />
                              <p className="text-stone-700 italic leading-relaxed font-medium whitespace-pre-line">
                                 {service.extraNote}
                              </p>
                           </div>
                        </div>
                      )}

                      {service.usefulInfo && (
                        <div className="mb-16">
                           <h3 className="text-2xl font-bold mb-8 italic">{service.usefulInfoTitle || "Przydatne informacje:"}</h3>
                           <div className="grid grid-cols-1 gap-4">
                              {service.usefulInfo.map((info, i) => (
                                <div key={i} className="flex gap-4 p-6 bg-white border border-stone-200 rounded-2xl items-start shadow-sm">
                                   <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0 mt-2.5" />
                                   <p className="text-stone-700 font-medium italic leading-relaxed">{info}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}

                      {service.requiredDocuments && (
                        <div className="mb-16">
                           <h3 className="text-2xl font-bold mb-8 italic">Do wniosku należy dołączyć:</h3>
                           <div className="grid grid-cols-1 gap-4">
                              {service.requiredDocuments.map((doc, i) => (
                                <div key={i} className="flex gap-4 p-6 bg-orange-50 border border-orange-100 rounded-2xl items-start shadow-sm">
                                   <FileCheck className="text-orange-500 shrink-0 mt-1" size={20} />
                                   <p className="text-stone-700 font-medium italic leading-relaxed">{doc}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}

                      {service.legalBasis && (
                        <div className="mb-16">
                           <h3 className="text-2xl font-bold mb-8 italic">Podstawa prawna:</h3>
                           <div className="bg-stone-900 text-stone-300 p-10 rounded-[2.5rem] relative overflow-hidden">
                              <Gavel className="absolute -top-4 -right-4 w-32 h-32 text-white/5" />
                              <p className="relative z-10 text-sm leading-loose italic tracking-wide">
                                {service.legalBasis}
                              </p>
                           </div>
                        </div>
                      )}

                      {service.closingNote && (
                        <div className="mt-12 p-8 bg-orange-50 border border-orange-100 rounded-3xl">
                           <p className="text-lg text-stone-700 italic leading-relaxed font-medium">
                              {service.closingNote}
                           </p>
                        </div>
                      )}

                      {service.priceInfo && (
                        <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-3xl flex items-center gap-6">
                           <Calculator size={32} className="text-yellow-600 shrink-0" />
                           <div>
                              <h4 className="font-bold text-yellow-900 mb-1 italic">Informacja o cenie</h4>
                              <p className="text-yellow-800 font-medium italic">{service.priceInfo}</p>
                           </div>
                        </div>
                      )}
                   </div>
                </div>

                {/* Sidebar Navigation */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                   <div className="bg-stone-900 text-white p-8 rounded-[2rem]">
                      <h3 className="text-xl font-bold mb-8 italic">Inne usługi projektu:</h3>
                      <div className="flex flex-col gap-2">
                         {displayServices.filter((s: any) => s.id !== id).slice(0, 5).map((s: any) => (
                           <Link 
                             key={s.id} 
                             to={`/oferta/${typeof s.id === 'string' ? s.id.replace(/[\u200B-\u200D\uFEFF]/g, '') : s.id}`} 
                             className="flex items-center justify-between p-4 rounded-xl hover:bg-white/10 transition-colors group"
                           >
                              <span className="text-sm font-bold italic group-hover:text-orange-400 transition-colors">{s.title}</span>
                              <ChevronRight size={16} className="text-stone-600 group-hover:text-orange-400" />
                           </Link>
                         ))}
                         <Link to="/#oferta" className="mt-4 text-center py-4 border border-stone-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-stone-800 transition-colors">
                            Wszystkie usługi OZE
                         </Link>
                      </div>
                   </div>

                   <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] group">
                      <img 
                        src={`https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop`} 
                        alt="Fotowoltaika"
                        width={800}
                        height={500}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8">
                         <h4 className="text-white text-2xl font-bold mb-4 italic">Zaufaj ekspertom z RAD MAR</h4>
                         <p className="text-stone-300 text-sm italic mb-6">Wieloletnie doświadczenie w branży odnawialnych źródeł energii.</p>
                         <Link to="/kontakt" className="bg-orange-500 text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest inline-block">Zamów Projekt</Link>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </section>

     {/* Lightbox */}
     <AnimatePresence>
       {lightboxImage && (
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
           onClick={() => setLightboxImage(null)}
         >
           <button 
             className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-black/50 rounded-full transition-colors"
             onClick={(e) => {
               e.stopPropagation();
               setLightboxImage(null);
             }}
           >
             <X size={32} />
           </button>
           <motion.img 
             initial={{ scale: 0.95 }}
             animate={{ scale: 1 }}
             exit={{ scale: 0.95 }}
             src={lightboxImage} 
             alt="Powiększone zdjęcie" 
             className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl"
             onClick={(e) => e.stopPropagation()}
           />
         </motion.div>
       )}
     </AnimatePresence>
    </div>
  );
}
