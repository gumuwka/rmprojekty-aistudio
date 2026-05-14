import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

import * as Icons from 'lucide-react';
import { services as defaultServices } from '../servicesData';
import { cn } from '../lib/utils';
import { ArrowRight, CheckCircle2, Star, Zap, Shield, Clock, Facebook, MapPin, Award, Edit3, Save, X, Loader2, PencilRuler, Headset, GraduationCap } from 'lucide-react';

import { useContent } from '../context/ContentContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' }
};

export default function Home() {
  const { content, updateContent, loading } = useContent();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  if (loading) return <div className="h-screen flex items-center justify-center">Ładowanie bazy danych...</div>;

  const data = content?.home || {};
  const displayServices = content?.services || defaultServices;

  const getText = (section: string, field: string, fallback: string) => {
    return data[section]?.[field] || fallback;
  };



  return (
    <div className="flex flex-col w-full overflow-hidden">


      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center pt-32 md:pt-48 overflow-hidden group/hero">
        <div className="absolute inset-0 z-0">
          <img src={data?.hero?.bgImage || "/assets/hero_bg_premium.png"} alt="Zespół Biura Projektowego" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent z-10" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-[65%] relative">

              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight text-stone-900"
              >
                {getText('hero', 'title', "Rad-mar\nBiuro Projektowe").split('\n').map((line: string, i: number) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </motion.h1>

              <div className="relative group/p">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-stone-600 leading-relaxed max-w-2xl mb-12 font-medium"
                >
                  {getText('hero', 'subtitle', "Eksperckie uzgodnienia PPOŻ, zaawansowane projekty PV*SOL i profesjonalne wsparcie w dotacjach.")}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="https://www.facebook.com/rmprojekty" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1877F2] text-white px-8 py-5 rounded-full text-lg font-bold hover:bg-[#0e5a9a] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/10 w-fit"
                >
                  <Facebook size={24} />
                  {getText('hero', 'cta', "ŚLEDŹ NAS NA FACEBOOKU")}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION WITH IMAGE BACKGROUND */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#fff8f5]">
        {/* Background Layer with Map */}
        <div className="absolute inset-0 z-0 bg-map-image opacity-70 blur-[2px]" style={data?.mapSection?.bgImage ? { backgroundImage: `url(${data.mapSection.bgImage})` } : {}} />
        <div className="absolute inset-0 z-0 service-bg-gradient" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16">
            <motion.h2 
              {...fadeInUp}
              className="text-4xl md:text-6xl font-black text-stone-900 mb-6 leading-tight uppercase tracking-tighter"
            >
              {data?.mapSection?.title || 'Kompleksowe wsparcie dla branży OZE'}
            </motion.h2>
            <motion.p 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.1 }}
              className="text-xl text-stone-600 max-w-2xl font-medium leading-relaxed"
            >
              {data?.mapSection?.subtitle || 'Precyzyjne wsparcie inżynieryjne i doradcze, które przyspieszy realizację Twoich projektów fotowoltaicznych od koncepcji po przyłączenie do sieci.'}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Tile 1 */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="bg-white border border-stone-200 rounded-3xl p-8 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0px_12px_24px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-500">
                <PencilRuler className="text-orange-600 group-hover:text-white transition-colors duration-500" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4 border-b border-stone-100 pb-4 uppercase tracking-tighter">{data?.mapSection?.tile1?.title || 'Projektowanie PV'}</h3>
              <p className="text-stone-500 leading-relaxed">
                {data?.mapSection?.tile1?.desc || 'Precyzyjne projekty architektoniczne i elektryczne dla instalacji komercyjnych i przemysłowych, gwarantujące maksymalne uzyski i trwałość konstrukcji.'}
              </p>
            </motion.div>

            {/* Tile 2 */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.3 }}
              className="bg-white border border-stone-200 rounded-3xl p-8 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0px_12px_24px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-500">
                <Headset className="text-orange-600 group-hover:text-white transition-colors duration-500" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4 border-b border-stone-100 pb-4 uppercase tracking-tighter">{data?.mapSection?.tile2?.title || 'Konsulting Techniczny'}</h3>
              <p className="text-stone-500 leading-relaxed">
                {data?.mapSection?.tile2?.desc || 'Eksperckie doradztwo w zakresie złożonych przepisów, studiów wykonalności oraz procesów przyłączenia do sieci dla aktywów OZE.'}
              </p>
            </motion.div>

            {/* Tile 3 */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.4 }}
              className="bg-white border border-stone-200 rounded-3xl p-8 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0px_12px_24px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-500">
                <GraduationCap className="text-orange-600 group-hover:text-white transition-colors duration-500" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4 border-b border-stone-100 pb-4 uppercase tracking-tighter">{data?.mapSection?.tile3?.title || 'Szkolenia OZE'}</h3>
              <p className="text-stone-500 leading-relaxed">
                {data?.mapSection?.tile3?.desc || 'Specjalistyczne programy szkoleniowe zaprojektowane w celu podnoszenia kwalifikacji zespołów inżynieryjnych i menedżerów projektów.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEKCYJA USŁUG */}
      <section className="py-24 bg-stone-50" id="oferta">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{data?.servicesIntro?.title || 'W czym możemy Ci pomóc?'}</h2>
              <p className="text-stone-600 text-lg">
                {data?.servicesIntro?.desc || 'Skorzystaj z naszej wiedzy i doświadczenia. Wybierz usługę, aby dowiedzieć się więcej o procesie współpracy.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service: any, index: number) => {
              const IconComponent = (Icons as any)[service.icon] || Icons.File;
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
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-100" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
                    </div>

                    <div className="relative z-20 p-5 md:p-6 h-full flex flex-col justify-end">
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-500 transition-colors text-white">
                        <IconComponent size={20} />
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-bold mb-1.5 text-white leading-tight">{service.title}</h3>
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
      </section>

      {/* O NAS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div {...fadeInUp} className="lg:w-1/2">
              <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">{data?.aboutIntro?.label || 'Nasza misja'}</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                {data?.aboutIntro?.title ? data.aboutIntro.title.split('\n').map((line: string, i: number) => <React.Fragment key={i}>{line}<br/></React.Fragment>) : <>Tworzymy fundamenty <br /> nowoczesnej energetyki</>}
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed mb-8">
                {data?.aboutIntro?.desc || 'Radmar to zespół inżynierów i rzeczoznawców, których wspólnym celem jest profesjonalne wsparcie branży OZE. Specjalizujemy się w projektowaniu instalacji fotowoltaicznych, uzgodnieniach PPOŻ oraz doradztwie technicznym.'}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-stone-900 font-bold mb-2">{data?.aboutIntro?.expTitle || 'Doświadczenie'}</h4>
                  <p className="text-stone-500 text-sm">{data?.aboutIntro?.expDesc || 'Lata pracy przy najbardziej wymagających projektach przemysłowych.'}</p>
                </div>
                <div>
                  <h4 className="text-stone-900 font-bold mb-2">{data?.aboutIntro?.qualTitle || 'Jakość'}</h4>
                  <p className="text-stone-500 text-sm">{data?.aboutIntro?.qualDesc || 'Każdy projekt przechodzi wieloetapową weryfikację techniczną.'}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeInUp} 
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-[4/3] bg-stone-50 rounded-[3rem] p-4 shadow-xl border border-stone-100 overflow-hidden relative">
                <img 
                  src={data?.aboutIntro?.image || "/assets/about_us.png"}
                  alt="Zespół Radmar" 
                  className="w-full h-full object-cover rounded-[2.5rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-8 rounded-3xl shadow-2xl z-20">
                <p className="text-4xl font-black mb-1">{data?.aboutIntro?.badgeValue || '100%'}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-80 leading-none">{data?.aboutIntro?.badgeLabel || 'Dokładności'}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ HOMEPAGE */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Najczęstsze pytania</h2>

            <div className="space-y-4">
              {(data?.faq?.length > 0 ? data.faq : [
                { q: 'Jakie dokumenty są wymagane do uzgodnienia PPOŻ?', a: 'Standardowo potrzebujemy schematu elektrycznego oraz podstawowych danych technicznych instalacji. Szczegółowy arkusz prześlemy pocztą e-mail.' },
                { q: 'Czy projekt PV*SOL uwzględnia zacienienie?', a: 'Tak, w wersji Premium wykonujemy pełną symulację zacienienia 3D, co pozwala na precyzyjne oszacowanie uzysków rocznych.' },
                { q: 'Jak długo czeka się na ekspertyzę nośności dachu?', a: 'Standardowy czas oczekiwania to 3-5 dni roboczych od momentu dostarczenia danych o konstrukcji budynku.' },
                { q: 'Czy pomagacie w złożeniu wniosku Mój Prąd 6.0?', a: 'Oczywiście. Przygotowujemy kompletną dokumentację i składamy ją w Twoim imieniu przez portal mObywatel/GWD.' },
                { q: 'Czy działacie na terenie całej Polski?', a: 'Tak, nasze usługi projektowe i doradcze świadczymy zdalnie na terenie całego kraju. Termowizja z drona dostępna jest w wybranych województwach.' },
                { q: 'Czy uzgodnienie PPOŻ jest konieczne dla mikroinstalacji?', a: 'Zgodnie z Prawem Budowlanym, każda instalacja powyżej 6,5 kW wymaga uzgodnienia z rzeczoznawcą ds. PPOŻ i zgłoszenia do PSP.' }
              ]).map((faq: any, i: number) => (
                <details key={i} className="group bg-white rounded-2xl p-6 shadow-sm border border-stone-200 cursor-pointer">
                  <summary className="flex items-center justify-between list-none">
                    <h4 className="text-base font-bold pr-8">{faq.q}</h4>
                    <Icons.ChevronDown className="group-open:rotate-180 transition-transform text-stone-400" />
                  </summary>
                  <p className="mt-4 text-stone-500 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA WITH FORM */}
      <section className="py-24 relative overflow-hidden" id="kontakt-form">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="bg-orange-500 text-white rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-center shadow-2xl shadow-orange-500/20">
            <div className="lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8">{data?.finalCta?.title || 'Gotowy na współpracę?'}</h2>
              <p className="text-orange-100 text-lg mb-8 leading-relaxed">
                {data?.finalCta?.desc ? (
                  data.finalCta.desc.includes('15 minut') ? 
                    <>{data.finalCta.desc.split('15 minut')[0]}<span className="font-bold text-white">15 minut</span>{data.finalCta.desc.split('15 minut')[1]}</> : 
                    data.finalCta.desc
                ) : (
                  <>Wypełnij formularz poniżej. Oddzwonimy lub odpiszemy w ciągu <span className="font-bold text-white">15 minut</span> z gotową ofertą lub propozycją współpracy.</>
                )}
              </p>

              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-white fill-white/10" />
                  <span className="font-semibold">{data?.finalCta?.bullet1 || 'Bezpłatna konsultacja techniczna'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-white fill-white/10" />
                  <span className="font-semibold">{data?.finalCta?.bullet2 || 'Szybki czas realizacji (już od 48h)'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-white fill-white/10" />
                  <span className="font-semibold">{data?.finalCta?.bullet3 || 'Pełna dokumentacja zgodnie z prawem'}</span>
                </li>
              </ul>

              <div className="mt-12 flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-orange-200">Bezpośredni kontakt</p>
                <a href="tel:+48793376709" className="text-2xl font-bold hover:text-white transition-colors">+48 793 376 709</a>
                <a href="mailto:ziezio@gmail.com" className="text-xl font-medium opacity-80 hover:opacity-100 transition-opacity">ziezio2@gmail.com</a>
              </div>
            </div>

            <div className="lg:w-1/2 w-full bg-white text-stone-900 rounded-[2rem] p-8 md:p-10 shadow-xl overflow-hidden min-h-[500px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const target = e.target as HTMLFormElement;
                      const submitBtn = target.querySelector('button[type="submit"]') as HTMLButtonElement;
                      const originalText = submitBtn.innerHTML;

                      submitBtn.disabled = true;
                      submitBtn.innerHTML = '<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> Wysyłanie...';

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
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                      }
                    }}
                    className="flex flex-col gap-6 w-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Imię / Nazwa firmy</label>
                        <input type="text" required placeholder="Jan Kowalski" className="bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Numer telefonu</label>
                        <input type="tel" required placeholder="+48 000 000 000" className="bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Adres E-mail</label>
                      <input type="email" required placeholder="twoj@email.pl" className="bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">O której usłudze chcesz porozmawiać?</label>
                      <select className="bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer">
                        {displayServices.map((s: any) => <option key={s.id} value={s.id}>{s.title}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Twoja wiadomość</label>
                      <textarea rows={4} placeholder="Opisz krótko swój projekt..." className="bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all min-h-[100px]"></textarea>
                    </div>
                    <button type="submit" className="bg-black text-white py-5 rounded-xl text-lg font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-3">
                      Poproś o wycenę <ArrowRight size={20} />
                    </button>
                    <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                      Klikając przycisk wyrażasz zgodę na przetwarzanie danych w celu przygotowania oferty. <br /> Oddzwonimy najszybciej jak to możliwe!
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Wiadomość wysłana!</h3>
                    <p className="text-stone-500 leading-relaxed max-w-xs mx-auto mb-8">
                      Dziękujemy za kontakt. Nasz doradca techniczny przeanalizuje Twoje zapytanie i skontaktuje się z Tobą w ciągu najbliższych 15 minut.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-orange-600 font-bold hover:underline text-sm uppercase tracking-widest"
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
