import { motion } from 'motion/react';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function News() {
  const { content, loading } = useContent();

  if (loading) return null;

  const newsItems = content?.news || [];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-48 pb-24 min-h-screen bg-stone-50">
      <section className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-stone-900 uppercase">
            Aktualności
          </h1>
          <p className="text-xl text-stone-500 leading-relaxed">
            Bądź na bieżąco z tym, co dzieje się w świecie energii odnawialnej i naszej firmie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news: any, index: number) => (
            <motion.div
              key={news.id}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-stone-200 hover:border-orange-500 transition-all hover:shadow-2xl hover:shadow-orange-500/5 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-stone-900">
                    {news.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-stone-400 text-sm mb-4">
                  <Calendar size={16} />
                  <span>{news.date}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-stone-900 group-hover:text-orange-600 transition-colors leading-tight">
                  {news.title}
                </h3>
                
                <p className="text-stone-500 text-sm leading-relaxed mb-8 flex-grow">
                  {news.excerpt}
                </p>
                
                <Link 
                  to={`/aktualnosci/${news.id}`}
                  className="flex items-center gap-2 text-stone-900 font-bold group/link"
                >
                  Czytaj więcej 
                  <ArrowRight size={18} className="text-orange-500 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeInUp}
          className="mt-24 bg-stone-900 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-8">
              <Newspaper size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Nie przegap żadnej aktualizacji
            </h2>
            <p className="text-stone-400 mb-10 text-lg">
              Zapisz się do naszego newslettera i otrzymuj najważniejsze informacje ze świata OZE bezpośrednio na swoją skrzynkę.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Twój adres e-mail" 
                className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-colors">
                Zapisz się
              </button>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none" />
        </motion.div>
      </section>
    </div>
  );
}
