import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Phone, Mail, Facebook, Clock, MapPin, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="pt-32 pb-24">
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Contact Info */}
          <div className="lg:w-1/3 flex flex-col gap-12">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold mb-6 italic tracking-tight"
              >
                Kontakt
              </motion.h1>
              <p className="text-stone-500 italic">Jesteśmy do Twojej dyspozycji w dni robocze od 9:00 do 19:00. Wybierz dogodną formę kontaktu.</p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-1">Telefon</p>
                  <a href="tel:+48793376709" className="text-xl font-bold hover:text-orange-500 transition-colors">+48 793 376 709</a>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-1">E-mail</p>
                  <a href="mailto:ziezio@gmail.com" className="text-xl font-bold hover:text-orange-500 transition-colors">ziezio@gmail.com</a>
                  <p className="text-xs text-stone-500 mt-1 italic">Wnioski i zapytania ofertowe</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-900 shrink-0">
                  <Facebook size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-1">Social Media</p>
                  <a href="https://www.facebook.com/profile.php?id=61558031386658" target="_blank" rel="noopener noreferrer" className="text-base font-bold hover:text-orange-500 transition-colors italic">facebook.com/rmprojekty</a>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-900 shrink-0">
                   <Clock size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-1">Godziny otwarcia</p>
                  <p className="text-base font-bold italic">Pn - Pt: 09:00 - 19:00</p>
                  <p className="text-xs text-stone-500 italic">Oddzwonimy w ciągu 15 minut</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-8 rounded-3xl border border-stone-100">
               <div className="flex items-center gap-3 mb-4">
                  <MessageSquare size={20} className="text-orange-500" />
                  <span className="font-bold italic">Szybki kontakt przez WhatsApp</span>
               </div>
               <p className="text-sm text-stone-500 italic mb-6">Możesz również napisać do nas bezpośrednio na WhatsApp w celu uzyskania szybkiej odpowiedzi.</p>
               <a 
                 href="https://wa.me/48793376709" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-[#25D366] text-white w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                >
                 Otwórz WhatsApp
               </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white p-8 md:p-16 rounded-[3rem] border border-stone-200 shadow-2xl shadow-stone-200/50 min-h-[600px] flex flex-col items-center justify-center overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div 
                    key="form-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full"
                  >
                    <h2 className="text-3xl font-bold mb-4 italic">Wyślij zapytanie</h2>
                    <p className="text-stone-500 mb-12 italic">Przygotujemy dla Ciebie bezpłatną wycenę projektu lub doradzimy w kwestii dotacji.</p>
                    
                    <form 
                      onSubmit={async (e) => {
                         e.preventDefault();
                         const target = e.target as HTMLFormElement;
                         const submitBtn = target.querySelector('button[type="submit"]') as HTMLButtonElement;
                         const originalText = submitBtn.innerHTML;

                         submitBtn.disabled = true;
                         submitBtn.innerHTML = '<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> Wysyłanie...';

                         const formData = {
                            name: (target[0] as HTMLInputElement).value,
                            company: (target[1] as HTMLInputElement).value,
                            email: (target[2] as HTMLInputElement).value,
                            phone: (target[3] as HTMLInputElement).value,
                            service: (target[4] as HTMLSelectElement).value,
                            message: (target[5] as HTMLTextAreaElement).value,
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
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                       <div className="flex flex-col gap-2">
                          <label className="text-xs font-black uppercase tracking-widest text-stone-400">Twoje Imię i Nazwisko</label>
                          <input type="text" required className="bg-stone-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="Np. Jan Kowalski" />
                       </div>
                       <div className="flex flex-col gap-2">
                          <label className="text-xs font-black uppercase tracking-widest text-stone-400">Nazwa Firmy (opcjonalnie)</label>
                          <input type="text" className="bg-stone-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="Nazwa Twojej firmy" />
                       </div>
                       <div className="flex flex-col gap-2">
                          <label className="text-xs font-black uppercase tracking-widest text-stone-400">Adres E-mail</label>
                          <input type="email" required className="bg-stone-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="twoj-mail@domena.pl" />
                       </div>
                       <div className="flex flex-col gap-2">
                          <label className="text-xs font-black uppercase tracking-widest text-stone-400">Numer Telefonu</label>
                          <input type="tel" required className="bg-stone-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="+48 000 000 000" />
                       </div>
                       <div className="md:col-span-2 flex flex-col gap-2">
                          <label className="text-xs font-black uppercase tracking-widest text-stone-400">Temat zapytania</label>
                          <select className="bg-stone-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all appearance-none cursor-pointer">
                             <option>Uzgodnienia PPOŻ</option>
                             <option>Projekt PV*SOL / SolarEdge</option>
                             <option>Dotacja OZE / Grant OZE</option>
                             <option>Analiza konstrukcyjna dachu</option>
                             <option>Farma Fotowoltaiczna / PV Farm</option>
                             <option>Stacja ładowania (Projekt/Ekspertyza)</option>
                             <option>Inne zapytanie</option>
                          </select>
                       </div>
                       <div className="md:col-span-2 flex flex-col gap-2">
                          <label className="text-xs font-black uppercase tracking-widest text-stone-400">Treść Wiadomości</label>
                          <textarea rows={5} required className="bg-stone-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="Opisz krótko swój projekt lub zadaj nam pytanie..."></textarea>
                       </div>
                       <div className="md:col-span-2 flex items-center gap-4 py-4">
                          <input type="checkbox" required id="consent" className="w-5 h-5 rounded accent-orange-600" />
                          <label htmlFor="consent" className="text-xs text-stone-500 italic">Wyrażam zgodę na przetwarzanie danych osobowych w celu kontaktu ofertowego.</label>
                       </div>
                       <div className="md:col-span-2">
                          <button type="submit" className="w-full bg-black text-white py-6 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-4 group">
                             Wyślij Wiadomość <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                          <p className="text-[10px] text-stone-400 text-center mt-6 uppercase tracking-widest font-black">Oddzwonimy w ciągu 15 minut</p>
                       </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-bold mb-6 italic">Wiadomość została wysłana!</h3>
                    <p className="text-stone-500 leading-relaxed max-w-sm mx-auto italic mb-10 text-lg">
                      Dziękujemy za kontakt. Twoje zapytanie trafiło bezpośrednio do naszego zespołu projektowego. Skontaktujemy się z Tobą najszybciej jak to możliwe.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="bg-stone-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-xl"
                    >
                      Wyślij nową wiadomość
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
