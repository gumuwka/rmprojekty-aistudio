import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

import { services as defaultServices } from '../servicesData';
import { cn } from '../lib/utils';
import { 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Zap, 
  Shield, 
  Clock, 
  Facebook, 
  MapPin, 
  Award, 
  Edit3, 
  Save, 
  X, 
  Loader2, 
  PencilRuler, 
  Headset, 
  GraduationCap, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Phone, 
  Mail,
  ShieldCheck,
  Layout,
  Construction,
  FileText,
  Home as HomeIcon,
  Thermometer,
  Sun,
  Plane,
  Link as LinkIcon,
  BatteryCharging,
  ClipboardCheck,
  TrendingUp,
  File
} from 'lucide-react';

const IconsMap: Record<string, any> = {
  ShieldCheck,
  Layout,
  Construction,
  FileText,
  Zap,
  Home: HomeIcon,
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

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' }
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

export default function Home() {
  const { content, updateContent, loading } = useContent();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [activeTileIndex, setActiveTileIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    document.title = "Rad-mar Biuro Projektowe | Projekty PV, PPOŻ, Dotacje";
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveTileIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);


  if (loading) return null;

  const data = content?.home || {};
  const displayServices = content?.services || defaultServices;

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
      items: displayServices.filter((s: any) => serviceCategories[s.id] === 'projekty-i-ekspertyzy')
    },
    {
      id: 'opinie-i-uzgodnienia',
      name: 'Opinie i Uzgodnienia',
      tagline: 'Weryfikacja bezpieczeństwa i formalności instalacyjnych',
      items: displayServices.filter((s: any) => serviceCategories[s.id] === 'opinie-i-uzgodnienia')
    },
    {
      id: 'dofinansowania',
      name: 'Dofinansowania',
      tagline: 'Dotacje, granty rządowe oraz wsparcie w programach ekologicznych',
      items: displayServices.filter((s: any) => serviceCategories[s.id] === 'dofinansowania')
    }
  ];

  const filteredGroups = activeCategory === 'all'
    ? groups
    : groups.filter(g => g.id === activeCategory);


  const getText = (section: string, field: string, fallback: string) => {
    return data[section]?.[field] || fallback;
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };



  return (
    <div id="main-content" className="flex flex-col w-full overflow-hidden">


      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center pt-32 md:pt-48 overflow-hidden group/hero">
        <div className="absolute inset-0 z-0">
          <img 
            src={data?.hero?.bgImage || "/assets/hero_bg_premium.webp"} 
            alt="Zespół Biura Projektowego" 
            className="w-full h-full object-cover" 
            fetchPriority="high"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/80 md:bg-gradient-to-r md:from-white/95 md:via-white/50 md:to-transparent z-10" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-[65%] relative">

              
              <h1
                className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight text-stone-900"
              >
                {getText('hero', 'title', "Rad-mar\nBiuro Projektowe").split('\n').map((line: string, i: number) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </h1>

              <div className="relative group/p">
                <p
                  className="text-xl text-stone-600 leading-relaxed max-w-2xl mb-12 font-medium"
                >
                  {getText('hero', 'subtitle', "Eksperckie uzgodnienia PPOŻ, zaawansowane projekty PV*SOL i profesjonalne wsparcie w dotacjach.")}
                </p>
              </div>

              <div
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="https://www.facebook.com/profile.php?id=61558031386658" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1877F2] text-white px-8 py-5 rounded-full text-lg font-bold hover:bg-[#0e5a9a] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/10 w-fit"
                >
                  <Facebook size={24} />
                  {getText('hero', 'cta', "ŚLEDŹ NAS NA FACEBOOKU")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-12 md:py-20 overflow-hidden bg-[#fff8f5]">
        <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="w-full flex flex-col">
            <div className="mb-8 text-left">
              <motion.h2 
                {...fadeInUp}
                className="text-3xl md:text-4xl font-black text-stone-900 mb-4 leading-tight uppercase tracking-tighter"
              >
                Kompleksowa obsługa Twoich projektów
              </motion.h2>
            </div>

            <div 
              className="relative bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-[0px_12px_24px_rgba(0,0,0,0.04)] min-h-[250px] flex items-center w-full"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <AnimatePresence mode="wait">
                {activeTileIndex === 0 && (
                  <motion.div 
                    key="tile0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col w-full"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
                      <PencilRuler className="text-orange-600" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-3 uppercase tracking-tighter">{data?.mapSection?.tile1?.title || 'Projektowanie PV'}</h3>
                    <p className="text-stone-600 leading-relaxed text-base">
                      {data?.mapSection?.tile1?.desc || 'Precyzyjne projekty architektoniczne i elektryczne dla instalacji komercyjnych i przemysłowych, gwarantujące maksymalne uzyski i trwałość konstrukcji.'}
                    </p>
                  </motion.div>
                )}
                {activeTileIndex === 1 && (
                  <motion.div 
                    key="tile1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col w-full"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
                      <Headset className="text-orange-600" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-3 uppercase tracking-tighter">{data?.mapSection?.tile2?.title || 'Konsulting Techniczny'}</h3>
                    <p className="text-stone-600 leading-relaxed text-base">
                      {data?.mapSection?.tile2?.desc || 'Eksperckie doradztwo w zakresie złożonych przepisów, studiów wykonalności oraz procesów przyłączenia do sieci dla aktywów OZE.'}
                    </p>
                  </motion.div>
                )}
                {activeTileIndex === 2 && (
                  <motion.div 
                    key="tile2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col w-full"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
                      <GraduationCap className="text-orange-600" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-3 border-b border-stone-100 pb-3 uppercase tracking-tighter">{data?.mapSection?.tile3?.title || 'Szkolenia OZE'}</h3>
                    <p className="text-stone-600 leading-relaxed text-base">
                      {data?.mapSection?.tile3?.desc || 'Specjalistyczne programy szkoleniowe zaprojektowane w celu podnoszenia kwalifikacji zespołów inżynieryjnych i menedżerów projektów.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Kropeczki nawigacyjne karuzeli */}
            <div className="flex gap-2 justify-center mt-6">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveTileIndex(index)}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    activeTileIndex === index 
                      ? 'w-8 bg-orange-500' 
                      : 'w-2 bg-stone-300 hover:bg-stone-500'
                  }`}
                  aria-label={`Przejdź do slajdu ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Photo without rounding and animations */}
          <motion.div 
            {...fadeInUp}
            className="relative w-full h-[320px] md:h-[400px] overflow-hidden shadow-2xl border border-stone-200/50 bg-white"
          >
            <img 
              src="/assets/realizations_full_bg.webp" 
              alt="Kompleksowa obsługa projektów" 
              className="w-full h-full object-cover"
              loading="lazy"
              width={1920}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* SEKCYJA USŁUG */}
      <section className="py-24 bg-stone-50" id="oferta">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{data?.servicesIntro?.title || 'W czym możemy Ci pomóc?'}</h2>
              <p className="text-stone-600 text-lg">
                {data?.servicesIntro?.desc || 'Skorzystaj z naszej wiedzy i doświadczenia. Wybierz usługę, aby dowiedzieć się więcej o procesie współpracy.'}
              </p>
            </div>
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
          <div className="space-y-16">
            {filteredGroups.map((group) => (
              <div key={group.id} className="scroll-mt-32">
                {/* Category Group Header */}
                <div className="border-b border-stone-200 pb-4 mb-8">
                  <h3 className="text-2xl font-bold text-stone-900 tracking-tight italic">
                    {group.name}
                  </h3>
                </div>

                {/* Grid of cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((service: any, index: number) => {
                    const IconComponent = IconsMap[service.icon] || File;
                    return (
                      <motion.div
                        key={service.id}
                        {...fadeInUp}
                        transition={{ ...fadeInUp.transition, delay: index * 0.05 }}
                      >
                        <Link
                          to={`/oferta/${service.id}`}
                          className="group relative flex flex-col aspect-video rounded-[2rem] overflow-hidden border border-stone-200 hover:border-orange-500 transition-all shadow-sm hover:shadow-2xl hover:shadow-orange-500/10"
                        >
                          <div className="absolute inset-0 z-0">
                            {service.image ? (
                              <img 
                                src={service.image} 
                                alt={service.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                                width={640}
                                height={360}
                              />
                            ) : (
                              <div className="w-full h-full bg-stone-100" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
                          </div>

                          <div className="relative z-20 p-5 md:p-6 h-full flex flex-col justify-end">
                            <div className="flex justify-between items-start mb-auto">
                              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors text-white">
                                <IconComponent size={20} />
                              </div>
                              <span className="text-[9px] font-black uppercase tracking-wider bg-white/10 backdrop-blur-md text-white/90 px-2.5 py-1 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all">
                                {categoryDisplayNames[serviceCategories[service.id]]}
                              </span>
                            </div>
                            
                            <h3 className="text-lg md:text-xl font-bold mb-1.5 text-white leading-tight mt-4">{service.title}</h3>
                            <p className="text-white/70 text-xs leading-relaxed mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                              {service.shortDescription}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 flex items-center gap-1.5">
                                Szczegóły <ArrowRight size={12} />
                              </span>
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
        </div>
      </section>

      {/* SEKCJA O NAS */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-[#fff8f5] border-t border-b border-stone-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-12">
            <motion.h2 
              {...fadeInUp}
              className="text-3xl md:text-4xl font-black text-stone-900 mb-6 uppercase tracking-tighter"
            >
              O nas — Radmar Biuro Projektowe
            </motion.h2>
            <motion.p 
              {...fadeInUp}
              className="text-stone-600 text-lg leading-relaxed font-medium"
            >
              Jesteśmy zespołem doświadczonych projektantów i doradców technicznych specjalizujących się w branży odnawialnych źródeł energii. Zajmujemy się kompleksowym projektowaniem instalacji fotowoltaicznych, audytami efektywności, uzgodnieniami przeciwpożarowymi oraz pozyskiwaniem dotacji państwowych. Naszym celem jest upraszczanie procedur i gwarantowanie pełnego bezpieczeństwa realizowanych inwestycji.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Doświadczenie i Ekspertyza",
                desc: "Setki zrealizowanych projektów i uzgodnień dla instalacji domowych oraz komercyjnych w całej Polsce."
              },
              {
                title: "Terminowość",
                desc: "Szanujemy czas naszych partnerów. Projekty i uzgodnienia realizujemy zawsze w uzgodnionym terminie."
              },
              {
                title: "Wsparcie w Finansowaniu",
                desc: "Kompleksowo przeprowadzamy proces pozyskiwania dotacji rządowych, takich jak Mój Prąd czy Czyste Powietrze."
              },
              {
                title: "Bezpieczeństwo i Normy",
                desc: "Każdy projekt przechodzi szczegółową weryfikację pod kątem obowiązujących przepisów budowlanych i PPOŻ."
              }
            ].map((adv, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: idx * 0.05 }}
                className="bg-white border border-stone-200 rounded-3xl p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.03)]"
              >
                <h3 className="text-lg font-bold text-stone-900 mb-3 uppercase tracking-tight">{adv.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA WITH FORM */}
      <section className="py-16 relative overflow-hidden" id="kontakt-form">
        <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
          <div className="bg-stone-900 text-white rounded-[2.5rem] p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-center shadow-2xl shadow-stone-900/20">
            <div className="lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">{data?.finalCta?.title || 'Gotowy na współpracę?'}</h2>
              <p className="text-stone-400 text-sm mb-8 leading-relaxed">
                Wypełnij formularz obok. Skontaktujemy się z Tobą w celu przygotowania wyceny lub omówienia szczegółów współpracy.
              </p>

              <div className="space-y-5">
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-orange-500 transition-all duration-300">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mb-0.5">Telefon</p>
                    <a href="tel:+48793376709" className="text-base font-bold hover:text-orange-200 transition-colors">
                      +48 793 376 709
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-orange-500 transition-all duration-300">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mb-0.5">E-mail</p>
                    <a href="mailto:ziezio2@gmail.com" className="text-base font-bold hover:text-orange-200 transition-colors">
                      ziezio2@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-orange-500 transition-all duration-300">
                    <Facebook size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mb-0.5">Social Media</p>
                    <a href="https://www.facebook.com/profile.php?id=61558031386658" target="_blank" rel="noopener noreferrer" className="text-base font-bold hover:text-orange-200 transition-colors">
                      Facebook
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mb-0.5">Godziny otwarcia</p>
                    <p className="text-base font-bold">Pn - Pt: 07:00 - 19:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full bg-white text-stone-900 rounded-[2rem] p-6 md:p-8 shadow-xl overflow-hidden min-h-[420px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!isVerified || !gdprAccepted) return;
                      const target = e.target as HTMLFormElement;
                      setIsSaving(true);

                      const formData = {
                        name: (target[0] as HTMLInputElement).value,
                        phone: (target[1] as HTMLInputElement).value,
                        email: (target[2] as HTMLInputElement).value,
                        service: (target[3] as HTMLSelectElement).value,
                        message: (target[4] as HTMLTextAreaElement).value,
                      };

                      try {
                        const res = await fetch('/api/contact', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(formData),
                        });
                        const data = await res.json();
                        if (data.success) {
                          setIsSubmitted(true);
                          target.reset();
                        }
                      } catch (err) {
                        alert('Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub zadzwoń do nas pod numer +48 793 376 709.');
                      } finally {
                        setIsSaving(false);
                      }
                    }}
                    className="flex flex-col gap-4 w-full"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="home-name" className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Imię / Nazwa firmy</label>
                        <input id="home-name" type="text" required placeholder="Jan Kowalski" className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="home-phone" className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Numer telefonu</label>
                        <input id="home-phone" type="tel" required placeholder="+48 000 000 000" className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="home-email" className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Adres E-mail</label>
                      <input id="home-email" type="email" required placeholder="twoj@email.pl" className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="home-service" className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">O której usłudze chcesz porozmawiać?</label>
                      <select id="home-service" className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer">
                        {displayServices.map((s: any) => <option key={s.id} value={s.id}>{s.title}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="home-message" className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Twoja wiadomość</label>
                      <textarea id="home-message" rows={3} required placeholder="Opisz krótko swój projekt..." className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all min-h-[85px]"></textarea>
                    </div>

                    {/* GDPR Consent */}
                    <label className="flex gap-2.5 items-start mt-1 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={gdprAccepted} 
                        onChange={() => setGdprAccepted(!gdprAccepted)}
                        className="sr-only"
                      />
                      <div 
                        className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${gdprAccepted ? 'bg-orange-500 border-orange-500' : 'bg-white border-stone-200 hover:border-orange-200'}`}
                        aria-hidden="true"
                      >
                        {gdprAccepted && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span className="text-[10px] text-stone-500 leading-relaxed">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania. <span className="font-bold text-stone-900">Polityka prywatności</span>.
                      </span>
                    </label>

                    {/* CAPTCHA */}
                    <button 
                      type="button"
                      onClick={!isVerified && !isVerifying ? handleVerify : undefined}
                      role="checkbox"
                      aria-checked={isVerified}
                      aria-label="Weryfikacja: Nie jestem robotem"
                      className={`flex items-center justify-between bg-stone-50 border rounded-xl p-3.5 transition-all duration-300 cursor-pointer w-full ${isVerified ? 'border-green-500' : 'border-stone-200 hover:border-orange-200'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all duration-300 ${isVerified ? 'bg-green-500 border-green-500' : 'bg-white border-stone-200'}`} aria-hidden="true">
                          {isVerifying ? <Loader2 size={12} className="animate-spin text-orange-500" /> : isVerified ? <CheckCircle2 size={12} className="text-white" /> : null}
                        </div>
                        <span className={`font-bold text-xs ${isVerified ? 'text-green-700' : 'text-stone-600'}`}>
                          {isVerifying ? 'Weryfikacja...' : isVerified ? 'Zweryfikowano pomyślnie' : 'Nie jestem robotem'}
                        </span>
                      </div>
                    </button>

                    <button 
                      type="submit" 
                      disabled={isSaving || !isVerified || !gdprAccepted}
                      className="bg-stone-900 text-white py-3.5 rounded-lg text-base font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                    >
                      {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                      {isSaving ? "WYSYŁANIE..." : "WYŚLIJ WIADOMOŚĆ"}
                    </button>
                    <p className="text-[9px] text-stone-400 text-center leading-relaxed">
                       Oddzwonimy najszybciej jak to możliwe!
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Wiadomość wysłana!</h3>
                    <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto mb-6">
                      Dziękujemy za kontakt. Nasz doradca techniczny przeanalizuje Twoje zapytanie i skontaktuje się z Tobą najszybciej jak to możliwe.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-orange-600 font-bold hover:underline text-xs uppercase tracking-widest"
                    >
                      Wyślij kolejną wiadomość
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
