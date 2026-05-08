import { motion } from 'motion/react';
import { CheckCircle2, Shield, Users, Target, Phone, Mail, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-bold mb-8 italic tracking-tight"
            >
              Doświadczenie <br /> w służbie <span className="text-orange-500 underline decoration-stone-200 underline-offset-8">ekologii</span>
            </motion.h1>
            <p className="text-xl text-stone-600 leading-relaxed italic mb-8">
              RAD MAR to zespół specjalistów, dla których odnawialne źródła energii to nie tylko praca, ale misja wspierania polskiej energetyki w transformacji na zieloną stronę mocy.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <span className="block text-4xl font-bold text-stone-900 mb-1 italic">10+</span>
                <span className="text-sm font-bold text-stone-500 uppercase tracking-widest">Lat w branży</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-stone-900 mb-1 italic">500+</span>
                <span className="text-sm font-bold text-stone-500 uppercase tracking-widest">Projektów</span>
              </div>
            </div>
            <Link to="/kontakt" className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-orange-500 transition-colors">Skontaktuj się z nami</Link>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="aspect-square rounded-[3rem] bg-stone-100 overflow-hidden border border-stone-200">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Biuro RAD MAR" 
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-stone-100 hidden md:block max-w-[280px]">
                <p className="text-sm font-bold italic text-stone-800 leading-relaxed italic">
                  "Szybkość realizacji to nasz znak rozpoznawczy. Rozumiemy potrzeby dynamicznego rynku fotowoltaiki."
                </p>
                <p className="mt-4 text-xs font-bold text-orange-500 uppercase tracking-widest">— Zespół RAD MAR</p>
             </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone-50 py-24 border-y border-stone-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 italic">Nasze Wartości</h2>
            <p className="text-stone-500 italic">To na nich budujemy zaufanie naszych partnerów biznesowych.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-6 items-center text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-orange-500 shadow-sm border border-stone-200">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold italic">Bezpieczeństwo</h3>
              <p className="text-stone-600 italic">Każdy projekt przechodzi rygorystyczną weryfikację pod kątem zgodności z aktualnymi przepisami i normami bezpieczeństwa.</p>
            </div>
            <div className="flex flex-col gap-6 items-center text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-orange-500 shadow-sm border border-stone-200">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold italic">Partnerstwo</h3>
              <p className="text-stone-600 italic">Nie jesteśmy tylko podwykonawcą. Jesteśmy merytorycznym wsparciem dla firm instalacyjnych na każdym etapie realizacji.</p>
            </div>
            <div className="flex flex-col gap-6 items-center text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-orange-500 shadow-sm border border-stone-200">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold italic">Elastyczność</h3>
              <p className="text-stone-600 italic">Dostosowujemy się do indywidualnych potrzeb – od prostych domowych instalacji po wielkoskalowe farmy i stacje ładowania.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Mission */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 italic">Misja i Wizja</h2>
          <div className="space-y-8 text-lg text-stone-600 leading-relaxed italic">
             <p>
               Naszą misją jest dostarczanie najwyższej jakości dokumentacji projektowej, która staje się solidnym fundamentem dla ekologicznych inwestycji. Wierzymy, że profesjonalizm na etapie planowania przekłada się na bezpieczeństwo i wydajność instalacji przez dziesięciolecia.
             </p>
             <p>
               Działamy na terenie całego kraju, wspierając lokalne firmy energetyczne w pozyskiwaniu dotacji takich jak Czyste Powietrze czy Mój Prąd, co realnie wpływa na poprawę jakości powietrza w naszych miastach.
             </p>
          </div>
        </div>
      </section>
    </div>
  );
}
