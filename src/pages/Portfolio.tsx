import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Zap, Target, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function Portfolio() {
  const { content, loading } = useContent();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Nasze Realizacje - RAD MAR";
  }, []);


  const projects = content?.projects || [];

  return (
    <div className="pt-32 md:pt-48 pb-24 bg-stone-50 min-h-screen">
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 tracking-tighter text-stone-900 uppercase"
          >
            Nasze Realizacje
          </motion.h1>
          <p className="text-xl text-stone-500 leading-relaxed">
            Zaufali nam instalatorzy i inwestorzy z całej Polski. Zobacz wybrane projekty, nad którymi mieliśmy przyjemność pracować.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, idx: number) => (
            <motion.div 
               key={project.id}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: idx * 0.1 }}
               className="group relative rounded-[2.5rem] overflow-hidden aspect-square shadow-xl shadow-stone-200/50 cursor-pointer"
               onClick={() => setLightboxImage(project.image)}
            >
                <img src={project.image} alt={project.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-stone-900 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
           <div className="md:w-2/3 relative z-10 text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">Twoja inwestycja może być następna</h2>
              <p className="text-stone-400 text-lg leading-relaxed">
                Zapewniamy profesjonalne zaplecze projektowe dla każdej instalacji OZE. Niezależnie od wielkości projektu, gwarantujemy najwyższą jakość dokumentacji.
              </p>
           </div>
           <div className="md:w-1/3 flex justify-center relative z-10">
              <motion.div 
                 animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 0.95, 1] }} 
                 transition={{ repeat: 0, duration: 5 }}
                 className="w-40 h-40 bg-orange-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-3xl shadow-orange-500/40"
              >
                 <Zap size={64} />
              </motion.div>
           </div>
           <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-black/50 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImage} 
              alt="Powiększone zdjęcie" 
              className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
