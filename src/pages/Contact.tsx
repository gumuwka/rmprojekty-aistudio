import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Phone, Mail, Facebook, Clock, MapPin, ArrowRight, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { services } from '../servicesData';

export default function Contact() {
  const { content, loading } = useContent();
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);

  if (loading) return null;

  const data = content?.contact || {};

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };
  return (
    <div className="pt-48 pb-24 bg-white min-h-screen">
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Contact Info */}
          <div className="lg:w-1/3 flex flex-col gap-12">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase text-stone-900"
              >
                Kontakt
              </motion.h1>
              <p className="text-stone-500 text-lg leading-relaxed">
                {data.description || "Jesteśmy do Twojej dyspozycji w dni robocze od 7:00 do 19:00. Wybierz dogodną formę kontaktu."}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Telefon</p>
                  <a href={`tel:${data.phone || '+48793376709'}`} className="text-xl font-bold hover:text-orange-500 transition-colors">
                    {data.phone || '+48 793 376 709'}
                  </a>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">E-mail</p>
                  <a href={`mailto:${data.email || 'ziezio2@gmail.com'}`} className="text-xl font-bold hover:text-orange-500 transition-colors">
                    {data.email || 'ziezio2@gmail.com'}
                  </a>
                  <p className="text-xs text-stone-500 mt-1 font-medium">Wnioski i zapytania ofertowe</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-900 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Facebook size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Social Media</p>
                  <a href="https://www.facebook.com/profile.php?id=61558031386658" target="_blank" rel="noopener noreferrer" className="text-base font-bold hover:text-orange-500 transition-colors">facebook.com/rmprojekty</a>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-900 shrink-0">
                   <Clock size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Godziny otwarcia</p>
                  <p className="text-base font-bold">Pn - Pt: 07:00 - 19:00</p>
                  <p className="text-xs text-stone-500 font-medium">Oddzwonimy w ciągu 15 minut</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white p-8 md:p-16 rounded-[3rem] border border-stone-100 shadow-2xl shadow-stone-200/40 min-h-[600px] flex flex-col items-center justify-center overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div 
                    key="form-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full"
                  >
                    <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter text-stone-900">
                      {data.title || "Gotowy na współpracę?"}
                    </h2>
                    <p className="text-stone-500 mb-12 text-lg">Wypełnij formularz poniżej. Oddzwonimy lub odpiszemy w ciągu <span className="font-bold text-stone-900">15 minut</span>.</p>
                    
                    <form 
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
                          const result = await res.json();
                          if (result.success) {
                            setIsSubmitted(true);
                          }
                        } catch (err) {
                          alert('Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub zadzwoń do nas.');
                        } finally {
                          setIsSaving(false);
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
                        <textarea rows={4} required placeholder="Opisz krótko swój projekt..." className="bg-stone-50 border border-stone-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all min-h-[120px]"></textarea>
                      </div>

                      {/* GDPR Consent */}
                      <div className="flex gap-3 items-start mt-2">
                        <div 
                          onClick={() => setGdprAccepted(!gdprAccepted)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer shrink-0 transition-all ${gdprAccepted ? 'bg-orange-500 border-orange-500' : 'bg-white border-stone-200 hover:border-orange-200'}`}
                        >
                          {gdprAccepted && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed cursor-pointer select-none" onClick={() => setGdprAccepted(!gdprAccepted)}>
                          Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania. <span className="font-bold text-stone-900">Polityka prywatności</span>.
                        </p>
                      </div>

                      {/* CAPTCHA */}
                      <div 
                        onClick={!isVerified && !isVerifying ? handleVerify : undefined}
                        className={`flex items-center justify-between bg-stone-50 border-2 rounded-2xl p-5 transition-all duration-300 cursor-pointer ${isVerified ? 'border-green-500' : 'border-stone-100 hover:border-orange-200'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${isVerified ? 'bg-green-500 border-green-500' : 'bg-white border-stone-200'}`}>
                            {isVerifying ? <Loader2 size={16} className="animate-spin text-orange-500" /> : isVerified ? <CheckCircle2 size={16} className="text-white" /> : null}
                          </div>
                          <span className={`font-bold text-sm ${isVerified ? 'text-green-700' : 'text-stone-600'}`}>
                            {isVerifying ? 'Weryfikacja...' : isVerified ? 'Zweryfikowano pomyślnie' : 'Nie jestem robotem'}
                          </span>
                        </div>
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={isSaving || !isVerified || !gdprAccepted}
                        className="bg-stone-900 text-white py-5 rounded-xl text-lg font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                      >
                        {isSaving ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                        {isSaving ? "WYSYŁANIE..." : "WYŚLIJ WIADOMOŚĆ"}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter text-stone-900">Wiadomość wysłana!</h3>
                    <p className="text-stone-500 leading-relaxed max-w-xs mx-auto mb-10 text-lg">
                      Dziękujemy za kontakt. Nasz doradca techniczny skontaktuje się z Tobą w ciągu najbliższych 15 minut.
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
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
