import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Target, MapPin, Calendar, ArrowLeft, Zap, CheckCircle2, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { content, loading } = useContent();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) return null;

  const projects = content?.projects || [];
  const project = projects.find((p: any) => p.id === Number(id));

  if (!project) {
    return (
      <div className="pt-32 md:pt-48 pb-24 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Realizacja nie została znaleziona.</h1>
        <Link to="/realizacje" className="text-orange-500 mt-4 inline-block font-bold hover:underline">Powrót do portfolio</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-48 pb-24 min-h-screen bg-white">
      {/* Project Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0 z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-orange-500 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-2"
          >
            <Target size={16} /> {project.category}
          </motion.div>
        </div>
      </section>

      {/* Project Content */}
      <section className="container mx-auto px-4 md:px-6 -mt-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-stone-200/50 border border-stone-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2">
                <div className="w-20 h-1.5 bg-orange-500 mb-8 rounded-full" />
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-8 text-stone-900 leading-[1.1] uppercase">
                  {project.title}
                </h1>
                <p className="text-xl text-stone-500 leading-relaxed mb-12">
                  {project.description}
                </p>

                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <Zap size={24} className="text-orange-500" /> Zakres prac
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(project.scope || []).map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                          <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                          <span className="text-sm font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                   {project.gallery && project.gallery.length > 0 && (
                    <div className="pt-12 mt-12 border-t border-stone-100">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold flex items-center gap-3 text-stone-900">
                           Galeria z realizacji
                        </h3>
                        <div className="flex gap-3">
                            <button 
                              onClick={() => {
                                const el = document.getElementById('gallery-scroll');
                                if (el) el.scrollBy({ left: -el.offsetWidth, behavior: 'smooth' });
                              }} 
                              className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-stone-500 shadow-sm border border-stone-200"
                            >
                              <ChevronLeft size={24} />
                            </button>
                            <button 
                              onClick={() => {
                                const el = document.getElementById('gallery-scroll');
                                if (el) el.scrollBy({ left: el.offsetWidth, behavior: 'smooth' });
                              }} 
                              className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-stone-500 shadow-sm border border-stone-200"
                            >
                              <ChevronRight size={24} />
                            </button>
                         </div>
                      </div>
                      <div 
                        id="gallery-scroll" 
                        className="flex overflow-x-auto snap-x snap-mandatory pb-10 no-scrollbar w-full" 
                        style={{ scrollSnapType: 'x mandatory' }}
                      >
                        {project.gallery.map((img: string, i: number) => (
                          <div 
                            key={i} 
                            onClick={() => setSelectedImage(img)}
                            className="snap-center shrink-0 w-full aspect-video rounded-[2.5rem] overflow-hidden bg-stone-100 border border-stone-200 shadow-xl cursor-zoom-in group relative"
                          >
                             <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Galeria ${i + 1}`} />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-white/90 p-4 rounded-full text-stone-900 shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                                   <Maximize2 size={24} />
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* LIGHTBOX MODAL */}
                  <AnimatePresence>
                    {selectedImage && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] bg-stone-900/95 flex items-center justify-center p-4 md:p-20"
                        onClick={() => setSelectedImage(null)}
                      >
                        <button 
                          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                          onClick={() => setSelectedImage(null)}
                        >
                          <X size={40} />
                        </button>
                        <motion.img 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          src={selectedImage} 
                          className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-40 bg-stone-50 p-8 rounded-[2rem] border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-8 pb-4 border-b border-stone-200">Kluczowe dane</h4>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-1">Lokalizacja</p>
                        <p className="font-bold text-stone-900">{project.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
