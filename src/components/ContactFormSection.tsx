import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Facebook, Clock, Loader2, CheckCircle2, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { services as defaultServices } from '../servicesData';

export default function ContactFormSection() {
  const { content } = useContent();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);

  const data = content?.home || {};
  const displayServices = content?.services || defaultServices;

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };

  return (
    <section className="py-16 relative overflow-hidden bg-white border-t border-stone-100" id="kontakt-form">
      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-orange-500 text-white rounded-[2.5rem] p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-center shadow-2xl shadow-orange-500/20">
          
          {/* Left Side: Contact Information */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
              {data?.finalCta?.title || 'Gotowy na współpracę?'}
            </h2>
            <p className="text-orange-100 text-sm mb-8 leading-relaxed">
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

          {/* Right Side: Form card */}
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
                      const resData = await res.json();
                      if (resData.success) {
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
                      <label htmlFor="cfs-name" className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Imię / Nazwa firmy</label>
                      <input id="cfs-name" type="text" required placeholder="Jan Kowalski" className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="cfs-phone" className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Numer telefonu</label>
                      <input id="cfs-phone" type="tel" required placeholder="+48 000 000 000" className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cfs-email" className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Adres E-mail</label>
                    <input id="cfs-email" type="email" required placeholder="twoj@email.pl" className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cfs-service" className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">O której usłudze chcesz porozmawiać?</label>
                    <select id="cfs-service" className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer">
                      {displayServices.map((s: any) => <option key={s.id} value={s.id}>{s.title}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cfs-message" className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Twoja wiadomość</label>
                    <textarea id="cfs-message" rows={3} required placeholder="Opisz krótko swój projekt..." className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all min-h-[85px]"></textarea>
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
  );
}
