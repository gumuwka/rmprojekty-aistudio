import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import * as Icons from 'lucide-react';
import { services } from '../servicesData';
import { cn } from '../lib/utils';
import { ArrowRight, CheckCircle2, Star, Zap, Shield, Clock, Facebook } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' }
};

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-stone-50">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-100/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-50 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-[60%]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-orange-100/50 backdrop-blur-sm border border-orange-200 px-4 py-2 rounded-full text-orange-700 text-sm font-semibold mb-6"
              >
                <Zap size={14} className="fill-orange-600" />
                <span>Realizacja projektów w 48h!</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl md:text-8xl font-bold tracking-tight text-stone-900 leading-[1.05] mb-8 italic"
              >
                Projekty <span className="text-orange-500">OZE</span> <br />
                nowej generacji.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-stone-500 leading-relaxed max-w-2xl mb-12 italic font-medium"
              >
                Eksperckie uzgodnienia PPOŻ, zaawansowane projekty PV*SOL i profesjonalne wsparcie w dotacjach. Budujemy przyszłość energetyczną z pasją i precyzją.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/kontakt"
                  className="bg-black text-white px-8 py-5 rounded-full text-lg font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/10"
                >
                  Bezpłatna wycena <ArrowRight size={20} />
                </Link>
                <Link
                  to="/oferta"
                  className="bg-white text-stone-900 border border-stone-200 px-8 py-5 rounded-full text-lg font-bold hover:border-orange-500 transition-all flex items-center justify-center gap-3"
                >
                  Poznaj ofertę
                </Link>
                <a
                  href="https://facebook.com/radmar" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20"
                  title="Odwiedź nas na Facebooku"
                >
                  <Facebook size={28} fill="currentColor" />
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-16 flex flex-wrap items-center gap-8 md:gap-12"
              >
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-stone-900">500+</span>
                  <span className="text-sm text-stone-500 font-medium">Zrealizowanych projektów</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-stone-900">48h</span>
                  <span className="text-sm text-stone-500 font-medium">Szybki czas realizacji</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-stone-900">100%</span>
                  <span className="text-sm text-stone-500 font-medium">Zadowolonych klientów</span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="hidden lg:block lg:w-[40%] relative"
            >
              <div className="relative">
                <div className="absolute -inset-10 bg-orange-500/10 rounded-full blur-[80px]" />
                <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white/50 aspect-[4/5]">
                  <img 
                    src="/assets/hero_bg.png" 
                    alt="Nowoczesne OZE" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-stone-100 flex items-center gap-4 z-20 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                    <Zap size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-1">Certyfikowana jakość</p>
                    <p className="text-xl font-bold text-stone-900 italic leading-none">Projekty PPOŻ</p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-10 -right-6 bg-stone-900 text-white p-5 rounded-2xl shadow-xl flex flex-col gap-1 z-20 transition-all duration-300"
                >
                  <span className="text-orange-500 font-black text-2xl">PVSOL</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Symulacje 3D</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEKCYJA USŁUG */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">W czym możemy Ci pomóc?</h2>
              <p className="text-stone-600 text-lg">
                Skorzystaj z naszej wiedzy i doświadczenia. Wybierz usługę, aby dowiedzieć się więcej o procesie współpracy.
              </p>
            </div>
            <Link to="/oferta" className="text-orange-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
              ZOBACZ WSZYSTKIE USŁUGI <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, index) => {
              const IconComponent = (Icons as any)[service.icon] || Icons.File;
              return (
                <motion.div
                  key={service.id}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: index * 0.05 }}
                >
                  <Link
                    to={`/oferta/${service.id}`}
                    className="group flex flex-col h-full bg-white p-6 rounded-[2rem] border border-stone-200 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/5 transition-all"
                  >
                    <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 italic">{service.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-grow">
                      {service.shortDescription}
                    </p>
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-orange-500 transition-colors flex items-center gap-2">
                      Więcej szczegółów <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DLACZEGO MY */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6 italic">Dlaczego RAD MAR?</h2>
            <p className="text-stone-600">
              Stawiamy na konkrety, szybkość i merytoryczne wsparcie, byś Ty mógł skupić się na sprzedaży i montażu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div {...fadeInUp} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 italic">Szybkość realizacji</h3>
              <p className="text-stone-600 leading-relaxed">
                Wiemy, że czas to pieniądz. Dokumentację i uzgodnienia dostarczamy często już w 24-48h od przesłania danych.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 text-yellow-600">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 italic">Pełna zgodność</h3>
              <p className="text-stone-600 leading-relaxed">
                Nasze projekty są uzgadniane z rzeczoznawcami PPOŻ i spełniają rygorystyczne wymogi PSP oraz programów dotacyjnych.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 text-stone-900">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 italic">Kompleksowość</h3>
              <p className="text-stone-600 leading-relaxed">
                Od prostego schematu mikroinstalacji, przez analizy nośności dachu, aż po wnioski o dotacje i farmy PV.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* JAK WYGLĄDA WSPÓŁPRACA */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6 italic">Transparentny proces współpracy</h2>
            <p className="text-stone-400 italic">
              Minimalizujemy biurokrację. Ty dostarczasz dane – my dostarczamy gotowy projekt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connection Line Desktop */}
            <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-px bg-dashed-white opacity-20 border-t border-dashed" />

            {[
              { step: '01', title: 'Kontakt i dane', desc: 'Wypełniasz krótki arkusz danych technicznych dla Twojego projektu.' },
              { step: '02', title: 'Weryfikacja', desc: 'Nasz zespół weryfikuje dane i przygotowuje wstępną koncepcję.' },
              { step: '03', title: 'Projekt i uzgodnienia', desc: 'Przygotowujemy dokumentację i uzgadniamy ją z rzeczoznawcą (jeśli wymagane).' },
              { step: '04', title: 'Gotowy dokument', desc: 'Otrzymujesz kompletną dokumentację na swój adres e-mail gotową do wysyłki.' }
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center px-4"
              >
                <div className="w-24 h-24 bg-orange-500/10 border-2 border-orange-500/20 rounded-full flex items-center justify-center mb-8 bg-black">
                  <span className="text-3xl font-black text-orange-500">{item.step}</span>
                </div>
                <h4 className="text-xl font-bold mb-4 italic">{item.title}</h4>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWODY ZAUFANIA */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 italic leading-tight">Zaufali nam liderzy <br /> branży instalacyjnej</h2>
              <p className="text-stone-600 mb-10 leading-relaxed text-lg italic">
                Współpracujemy z dziesiątkami firm montażowych z całej Polski, zapewniając im bezpieczne zaplecze projektowe i pomoc w dotacjach.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                <div>
                  <div className="flex text-orange-500 mb-2">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-sm font-bold text-stone-900 mb-1 italic">"Bardzo sprawna komunikacja"</p>
                  <p className="text-xs text-stone-500">Andrzej W., SolarTeam</p>
                </div>
                <div>
                  <div className="flex text-orange-500 mb-2">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-sm font-bold text-stone-900 mb-1 italic">"Uzgodnienie PPOŻ w jeden dzień"</p>
                  <p className="text-xs text-stone-500">Marek K., EcoEnergetyka</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 rounded-[3rem] p-12 relative border border-stone-200 shadow-inner">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 opacity-40 grayscale pointer-events-none">
                {/* LOGO PLACEHOLDERS */}
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Zap size={32} />
                    <span className="font-bold text-[10px] tracking-widest uppercase">Partner {i}</span>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl text-center max-w-xs border border-white">
                  <span className="text-5xl font-black text-stone-900">5/5</span>
                  <p className="text-sm text-stone-500 mt-2 italic font-medium">Średnia ocena naszych usług na podstawie opinii klientów.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ HOMEPAGE */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 italic">Najczęstsze pytania</h2>

            <div className="space-y-4">
              {[
                { q: 'Jakie dokumenty są wymagane do uzgodnienia PPOŻ?', a: 'Standardowo potrzebujemy schematu elektrycznego oraz podstawowych danych technicznych instalacji. Szczegółowy arkusz prześlemy pocztą e-mail.' },
                { q: 'Czy projekt PV*SOL uwzględnia zacienienie?', a: 'Tak, w wersji Premium wykonujemy pełną symulację zacienienia 3D, co pozwala na precyzyjne oszacowanie uzysków rocznych.' },
                { q: 'Jak długo czeka się na ekspertyzę nośności dachu?', a: 'Standardowy czas oczekiwania to 3-5 dni roboczych od momentu dostarczenia danych o konstrukcji budynku.' },
                { q: 'Czy pomagacie w złożeniu wniosku Mój Prąd 6.0?', a: 'Oczywiście. Przygotowujemy kompletną dokumentację i składamy ją w Twoim imieniu przez portal mObywatel/GWD.' },
                { q: 'Czy działacie na terenie całej Polski?', a: 'Tak, nasze usługi projektowe i doradcze świadczymy zdalnie na terenie całego kraju. Termowizja z drona dostępna jest w wybranych województwach.' },
                { q: 'Czy uzgodnienie PPOŻ jest konieczne dla mikroinstalacji?', a: 'Zgodnie z Prawem Budowlanym, każda instalacja powyżej 6,5 kW wymaga uzgodnienia z rzeczoznawcą ds. PPOŻ i zgłoszenia do PSP.' }
              ].map((faq, i) => (
                <details key={i} className="group bg-white rounded-2xl p-6 shadow-sm border border-stone-200 cursor-pointer">
                  <summary className="flex items-center justify-between list-none">
                    <h4 className="text-base font-bold italic pr-8">{faq.q}</h4>
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
              <h2 className="text-5xl font-black mb-8 italic">Gotowy na współpracę?</h2>
              <p className="text-orange-100 text-lg mb-8 leading-relaxed italic">
                Wypełnij formularz poniżej. Oddzwonimy lub odpiszemy w ciągu <span className="font-bold text-white">15 minut</span> z gotową ofertą lub propozycją współpracy.
              </p>

              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-white fill-white/10" />
                  <span className="font-semibold italic">Bezpłatna konsultacja techniczna</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-white fill-white/10" />
                  <span className="font-semibold italic">Szybki czas realizacji (już od 48h)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-white fill-white/10" />
                  <span className="font-semibold italic">Pełna dokumentacja zgodnie z prawem</span>
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
                        {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Twoja wiadomość</label>
                      <textarea rows={4} placeholder="Opisz krótko swój projekt..." className="bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all min-h-[100px]"></textarea>
                    </div>
                    <button type="submit" className="bg-black text-white py-5 rounded-xl text-lg font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-3">
                      Poproś o wycenę <ArrowRight size={20} />
                    </button>
                    <p className="text-[10px] text-stone-400 text-center leading-relaxed italic">
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
                    <h3 className="text-2xl font-bold mb-4 italic">Wiadomość wysłana!</h3>
                    <p className="text-stone-500 leading-relaxed max-w-xs mx-auto italic mb-8">
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
