import { motion } from 'motion/react';
import { ExternalLink, Zap, Target } from 'lucide-react';

export default function Portfolio() {
  const projects = [
    { title: 'Instalacja 50kW - Hala Przemysłowa', category: 'Uzgodnienia PPOŻ & Projekt', location: 'Warszawa', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop' },
    { title: 'Grant OZE dla Wspólnoty', category: 'Grant OZE BGK', location: 'Wrocław', image: '/assets/projects/grant_oze.png' },
    { title: 'Analiza Nośności Dachu - Magazyn', category: 'Ekspertyza Konstrukcyjna', location: 'Poznań', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop' },
    { title: 'Farma PV 1MW', category: 'Dokumentacja Przyłączeniowa', location: 'Łódź', image: '/assets/projects/farma_pv.png' },
    { title: 'Stacje Ładowania EV - Biurowiec', category: 'Projekt Zasilania & UDT', location: 'Gdańsk', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop' },
    { title: 'Termowizja Dronem - Farma Solarowa', category: 'Diagnostyka UAV', location: 'Lublin', image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000&auto=format&fit=crop' }
  ];

  return (
    <div className="pt-32 pb-24">
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-8 italic tracking-tight"
          >
            Nasze Realizacje
          </motion.h1>
          <p className="text-xl text-stone-600 leading-relaxed italic">
            Zaufali nam instalatorzy i inwestorzy z całej Polski. Zobacz wybrane projekty, nad którymi mieliśmy przyjemność pracować.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
               key={idx}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: idx * 0.1 }}
               className="group relative rounded-[2.5rem] overflow-hidden aspect-square shadow-xl shadow-stone-200/50"
            >
               <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               
               <div className="absolute bottom-0 left-0 p-8 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 w-full">
                  <div className="flex items-center gap-2 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-2">
                     <Target size={12} /> {project.category}
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-1 italic leading-tight">{project.title}</h3>
                  <p className="text-stone-300 text-sm italic mb-6">{project.location}</p>
                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                     Szczegóły realizacji <ExternalLink size={14} />
                  </div>
               </div>

               {/* Static Label (Visible initially) */}
               <div className="absolute top-6 left-6 flex flex-col gap-2 group-hover:opacity-0 transition-opacity">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                     {project.category}
                  </span>
               </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-stone-50 rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-stone-200">
           <div className="md:w-2/3">
              <h2 className="text-4xl font-bold mb-6 italic">Twoja inwestycja może być następna</h2>
              <p className="text-stone-600 text-lg leading-relaxed italic">
                Zapewniamy profesjonalne zaplecze projektowe dla każdej instalacji OZE. Niezależnie od wielkości projektu, gwarantujemy najwyższą jakość dokumentacji.
              </p>
           </div>
           <div className="md:w-1/3 flex justify-center">
              <motion.div 
                 animate={{ rotate: [0, 5, -5, 0] }} 
                 transition={{ repeat: Infinity, duration: 4 }}
                 className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-orange-500/30"
              >
                 <Zap size={48} />
              </motion.div>
           </div>
        </div>
      </section>
    </div>
  );
}
