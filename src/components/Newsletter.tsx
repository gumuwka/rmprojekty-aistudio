import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Loader2, X } from 'lucide-react';

export default function Newsletter() {
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

  return (
    <section className="py-24 bg-stone-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Bądź na bieżąco</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight italic">
                Wiedza o OZE prosto na Twoją skrzynkę
              </h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-8 italic">
                Zapisz się do naszego newslettera i otrzymuj informacje o nowych dotacjach, zmianach w prawie oraz najnowszych realizacjach RAD MAR.
              </p>
              
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-stone-900 bg-stone-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover opacity-80" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-stone-900 bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white">
                    +500
                  </div>
                </div>
                <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">Dołącz do ponad 500 subskrybentów</p>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[3rem] shadow-2xl relative">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="text-center py-8"
                    >
                      <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/20">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 italic">Witamy w społeczności!</h3>
                      <p className="text-stone-400 leading-relaxed mb-8 italic">
                        Dziękujemy za zapis. Właśnie wysłaliśmy do Ciebie wiadomość powitalną. Sprawdź swoją skrzynkę!
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="text-orange-500 font-bold hover:underline text-sm uppercase tracking-widest"
                      >
                        Wróć do formularza
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Twój adres e-mail</label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="przyklad@poczta.pl"
                            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-stone-600"
                          />
                          <button
                            type="submit"
                            disabled={status === 'loading' || !gdprAccepted}
                            className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl font-bold transition-all flex items-center gap-2 ${
                              !gdprAccepted || status === 'loading' 
                              ? 'bg-stone-800 text-stone-600 cursor-not-allowed' 
                              : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20'
                            }`}
                          >
                            {status === 'loading' ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <>
                                Zapisz się <Send size={18} />
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start group cursor-pointer" onClick={() => setGdprAccepted(!gdprAccepted)}>
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 transition-all mt-1 ${
                          gdprAccepted ? 'bg-orange-500 border-orange-500' : 'bg-transparent border-white/10 group-hover:border-orange-500/50'
                        }`}>
                          {gdprAccepted && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                        <p className="text-[11px] text-stone-400 leading-relaxed select-none">
                          Wyrażam zgodę na otrzymywanie informacji handlowych i marketingowych drogą elektroniczną od RAD MAR. Możesz wypisać się w każdej chwili. <span className="text-white font-bold underline cursor-pointer">Polityka prywatności</span>.
                        </p>
                      </div>

                      {status === 'error' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-400/10 p-3 rounded-xl border border-red-400/20"
                        >
                          <X size={14} /> Wystąpił błąd. Spróbuj ponownie później.
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
    </section>
  );
}
