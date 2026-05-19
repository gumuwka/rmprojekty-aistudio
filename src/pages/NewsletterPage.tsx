import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Loader2, X, BookOpen, Bell, ShieldCheck, Mail } from 'lucide-react';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [gdprAccepted, setGdprAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprAccepted || !email) return;

    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const benefits = [
    {
      icon: <BookOpen className="text-orange-500" size={24} />,
      title: 'Ekspercka wiedza i prawo',
      desc: 'Bądź na bieżąco ze zmianami w przepisach PPOŻ, zgłoszeniach OSD oraz wymogach technicznych UDT.'
    },
    {
      icon: <Bell className="text-orange-500" size={24} />,
      title: 'Informacje o dofinansowaniach',
      desc: 'Nie przegap naborów do programów Mój Prąd 6.0, Grant OZE BGK czy Czyste Powietrze.'
    },
    {
      icon: <ShieldCheck className="text-orange-500" size={24} />,
      title: 'Bezpieczeństwo i diagnostyka',
      desc: 'Wskazówki techniczne dotyczące termowizji dronem, ochrony instalacji i wydajności paneli.'
    }
  ];

  return (
    <div className="pt-44 md:pt-48 pb-24 bg-stone-50 min-h-screen relative overflow-hidden flex items-center">
      {/* Background blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] -mr-48" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] -ml-48" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left side: Information and Benefits */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-stone-900 leading-tight italic">
                  Zapisz się do <br />
                  <span className="text-orange-500 underline decoration-stone-200 underline-offset-8">Newslettera</span>
                </h1>
                <p className="text-stone-600 text-lg leading-relaxed mt-6 italic">
                  Dołącz do społeczności profesjonalistów, instalatorów i inwestorów. Otrzymuj merytoryczne i sprawdzone materiały bezpośrednio na swoją skrzynkę.
                </p>
              </div>

              {/* Benefits list */}
              <div className="flex flex-col gap-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-stone-200 shadow-sm transition-all hover:border-orange-200">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 mb-1 italic">{benefit.title}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed italic">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Subscription Form Card */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-stone-900 text-white p-8 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden border border-stone-800">
                {/* Visual highlights */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -mr-24 -mt-24" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -ml-24 -mb-24" />

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      className="text-center py-10 relative z-10"
                    >
                      <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/20">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 italic">Subskrypcja aktywna!</h3>
                      <p className="text-stone-400 leading-relaxed mb-8 italic">
                        Dziękujemy za zaufanie. Wysłaliśmy do Ciebie wiadomość z potwierdzeniem. Jeśli jej nie widzisz, sprawdź folder spam.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="text-orange-500 font-bold hover:text-orange-400 text-sm uppercase tracking-widest transition-colors"
                      >
                        Użyj innego adresu
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6 relative z-10"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-500">
                            <Mail size={20} />
                          </div>
                          <div>
                            <h2 className="text-lg font-bold text-white italic">Formularz zapisu</h2>
                            <p className="text-xs text-stone-500 uppercase tracking-widest">Brak spamu, tylko konkrety</p>
                          </div>
                        </div>

                        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Twój adres e-mail</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="przyklad@poczta.pl"
                          className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-stone-700 text-sm"
                        />
                      </div>

                      {/* GDPR Consent */}
                      <div className="flex gap-4 items-start group cursor-pointer" onClick={() => setGdprAccepted(!gdprAccepted)}>
                        <div className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 transition-all mt-0.5 ${
                          gdprAccepted ? 'bg-orange-500 border-orange-500' : 'bg-transparent border-white/10 group-hover:border-orange-500/50'
                        }`}>
                          {gdprAccepted && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                        <p className="text-[10px] text-stone-400 leading-relaxed select-none">
                          Wyrażam zgodę na otrzymywanie informacji o nowościach i ofertach od RAD MAR. Możesz cofnąć zgodę w każdej chwili. <span className="text-white font-bold underline cursor-pointer">Polityka prywatności</span>.
                        </p>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === 'loading' || !gdprAccepted}
                        className={`py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-base shadow-xl ${
                          !gdprAccepted || status === 'loading'
                            ? 'bg-stone-800 text-stone-600 cursor-not-allowed'
                            : 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/10'
                        }`}
                      >
                        {status === 'loading' ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <>
                            Zatwierdź zapis <Send size={18} />
                          </>
                        )}
                      </button>

                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-400/10 p-3 rounded-xl border border-red-400/20"
                        >
                          <X size={14} /> Wystąpił błąd zapisu. Spróbuj ponownie.
                        </motion.div>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
