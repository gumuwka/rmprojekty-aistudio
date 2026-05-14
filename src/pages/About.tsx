import { motion } from 'motion/react';
import { CheckCircle2, Shield, Users, Target, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function About() {
  const { content, loading } = useContent();

  if (loading) return null;

  const data = content?.about || {};

  return (
    <div className="pt-48 pb-24 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-32">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] uppercase text-stone-900">
                {data.title || "Liderzy\nEnergii"}
              </h1>
              <p className="text-xl text-stone-500 leading-relaxed mb-12 max-w-xl">
                {data.description || "RAD MAR to zespół specjalistów, dla których odnawialne źródła energii to nie tylko praca, ale misja wspierania polskiej energetyki."}
              </p>
              
              <div className="flex flex-wrap gap-12 mb-12">
                <div className="flex flex-col">
                  <span className="text-5xl font-black text-stone-900 tracking-tighter uppercase">{data.stat1_value || "10+"}</span>
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-2">{data.stat1_label || "Lat doświadczenia"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-5xl font-black text-stone-900 tracking-tighter uppercase">{data.stat2_value || "1000+"}</span>
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-2">{data.stat2_label || "Zrealizowanych projektów"}</span>
                </div>
              </div>

              <Link 
                to="/kontakt" 
                className="bg-stone-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 w-fit hover:bg-orange-600 transition-all shadow-xl shadow-stone-900/10"
              >
                Rozpocznij współpracę <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
          <div className="lg:w-1/2 relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="aspect-[4/5] rounded-[3.5rem] bg-stone-100 overflow-hidden shadow-2xl relative"
             >
                <img 
                  src={data.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"} 
                  alt="Biuro RAD MAR" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-orange-500/10 mix-blend-multiply" />
             </motion.div>
             {/* Decorative element */}
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500 rounded-[2rem] -z-10 animate-pulse opacity-20 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Stats/Values Bento */}
      <section className="bg-stone-50 py-32 border-y border-stone-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="bg-white p-12 rounded-[3rem] border border-stone-200 shadow-sm flex flex-col gap-8">
               <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                  <Shield size={28} />
               </div>
               <div>
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{data.box1_title || "Bezpieczeństwo"}</h3>
                  <p className="text-stone-500 leading-relaxed">
                    {data.box1_desc || data.quality_desc || "Każdy projekt przechodzi rygorystyczną weryfikację pod kątem zgodności z aktualnymi przepisami PPOŻ."}
                  </p>
               </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-12 rounded-[3rem] border border-stone-200 shadow-sm flex flex-col gap-8 md:translate-y-12">
               <div className="w-14 h-14 bg-stone-900 rounded-2xl flex items-center justify-center text-white">
                  <Zap size={28} />
               </div>
               <div>
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{data.box2_title || "Doświadczenie"}</h3>
                  <p className="text-stone-500 leading-relaxed">
                    {data.box2_desc || data.experience_desc || "Tysiące projektów dla największych deweloperów i firm instalacyjnych w całej Polsce."}
                  </p>
               </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-12 rounded-[3rem] border border-stone-200 shadow-sm flex flex-col gap-8">
               <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
                  <Users size={28} />
               </div>
               <div>
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{data.box3_title || "Zaufanie"}</h3>
                  <p className="text-stone-500 leading-relaxed">
                    {data.box3_desc || "Budujemy trwałe relacje oparte na merytorycznym wsparciu i rzetelności w dostarczaniu dokumentacji."}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 py-32 text-center">
         <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter text-stone-900 max-w-4xl mx-auto leading-tight">
            Gotowy na profesjonalny projekt?
         </h2>
         <Link 
          to="/kontakt"
          className="text-2xl font-black text-orange-500 hover:text-stone-900 transition-colors uppercase tracking-widest flex items-center justify-center gap-4 group"
         >
           Porozmawiajmy o współpracy
           <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
         </Link>
      </section>
    </div>
  );
}
