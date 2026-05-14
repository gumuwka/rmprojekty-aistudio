import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function NewsDetail() {
  const { id } = useParams();
  const { content, loading } = useContent();

  if (loading) return null;

  const newsItems = content?.news || [];
  const news = newsItems.find((item: any) => item.id === Number(id));

  if (!news) {
    return (
      <div className="pt-32 md:pt-48 pb-24 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Artykuł nie został znaleziony.</h1>
        <Link to="/aktualnosci" className="text-orange-500 mt-4 inline-block font-bold hover:underline">Powrót do aktualności</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-48 pb-24 min-h-screen bg-white">
      {/* Hero Header Image */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-6 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-stone-200/50 border border-stone-100"
          >
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-stone-400 text-sm">
              <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                {news.category}
              </span>
              <div className="flex items-center gap-2 font-medium">
                <Calendar size={16} />
                <span>{news.date}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-12 text-stone-900 leading-tight">
              {news.title}
            </h1>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed space-y-6">
              <p>{news.excerpt}</p>
              <p>Zapraszamy do kontaktu z naszymi doradcami, którzy odpowiedzą na wszystkie pytania i pomogą zaplanować inwestycję tak, aby uzyskać maksymalną wydajność i możliwe dofinansowania.</p>
            </div>

            {/* Footer / Social Share */}
            <div className="mt-16 pt-12 border-t border-stone-100 flex flex-wrap items-center justify-between gap-8">
              <Link 
                to="/aktualnosci"
                className="flex items-center gap-2 text-stone-900 font-bold hover:text-orange-500 transition-colors group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Wszystkie aktualności
              </Link>

              <div className="flex items-center gap-4">
                <span className="text-stone-400 text-sm font-bold flex items-center gap-2">
                  <Share2 size={16} /> Udostępnij:
                </span>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <Facebook size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-stone-900">Czytaj również</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newsItems.filter((item: any) => item.id !== news.id).slice(0, 2).map((item: any) => (
                <Link 
                  key={item.id}
                  to={`/aktualnosci/${item.id}`}
                  className="group block"
                >
                  <div className="aspect-video rounded-3xl overflow-hidden mb-4 shadow-lg border border-stone-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-bold text-lg group-hover:text-orange-500 transition-colors">{item.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
