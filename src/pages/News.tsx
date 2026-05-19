import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function News() {
  const { content, loading } = useContent();

  useEffect(() => {
    document.title = "Aktualności i Poradnik OZE - RAD MAR";
  }, []);

  if (loading) return null;

  const newsItems = content?.news || [];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-32 md:pt-48 pb-24 min-h-screen bg-stone-50">
      <section className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 text-stone-900 uppercase">
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


      </section>
    </div>
  );
}
