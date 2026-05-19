import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQPage() {
  useEffect(() => {
    document.title = "Często Zadawane Pytania (FAQ) - RAD MAR";
  }, []);
  const faqs = [
    {
      category: 'Projekty i Uzgodnienia',
      items: [
        { q: 'Dla kogo obowiązkowe jest uzgodnienie PPOŻ?', a: 'Obowiązek uzgodnienia z rzeczoznawcą ds. zabezpieczeń przeciwpożarowych dotyczy wszystkich instalacji o mocy > 6,5 kW (Prawo Budowlane art. 29 pkt. 4 ust. 3 lit. c). Niezbędne jest uzgodnienie projektu oraz zawiadomienie organów Państwowej Straży Pożarnej (art. 56 ust. 1a).' },
        { q: 'Czy domki jednorodzinne wymagają dodatkowych zabezpieczeń?', a: 'Domki jednorodzinne oraz instalacje gruntowe co do zasady nie wymagają stosowania dodatkowych zewnętrznych zabezpieczeń "przeciwpożarowych" typu PROJOY czy SANTON, o ile projekt nie stanowi inaczej. Uzgodnieniu podlegają jednak wszystkie instalacje powyżej 6,5 kW, niezależnie od miejsca montażu.' },
        { q: 'Czy rozbudowa instalacji wymaga nowego uzgodnienia?', a: 'Tak. Rozbudowa instalacji PV (np. z 5 kW na 9 kW) przekraczająca próg 6,5 kW wymaga wykonania uzgodnienia PPOŻ oraz aktualizacji zgłoszenia w OSD (Operatora Systemu Dystrybucyjnego).' },
        { q: 'Kto może dokonać zgłoszenia przyłączenia mikroinstalacji?', a: 'Zgłoszenia przyłączenia do sieci może dokonać zarówno Inwestor, jak i Wykonawca działający w jego imieniu.' },
        { q: 'Jakie oznaczenia są wymagane dla instalacji PV?', a: 'Każda instalacja fotowoltaiczna musi zostać odpowiednio oznaczona zgodnie z normą PN-EN 60364-7-712, co jest kluczowe dla bezpieczeństwa ekip ratowniczych.' },
      ]
    },
    {
      category: 'Dotacje i Programy',
      items: [
        { q: 'W czym pomaga program Mój Prąd 6.0?', a: 'Program oferuje dofinansowanie do instalacji fotowoltaicznych (do 7000 zł) oraz obowiązkowych magazynów energii (do 16 000 zł) lub ciepła (do 5 000 zł). Łącznie można zyskać do 28 000 zł.' },
        { q: 'Jakie są wymogi dla programu Grant OZE BGK?', a: 'Program ten jest skierowany do właścicieli i zarządców budynków wielorodzinnych. Wymaga on m.in. dokumentacji projektowej uzgodnionej z rzeczoznawcą PPOŻ, co zapewniamy w naszej ofercie.' },
        { q: 'Czy audyt energetyczny jest wymagany w programie Czyste Powietrze?', a: 'Tak, jeśli planujesz tzw. kompleksową termomodernizację, audyt energetyczny jest niezbędny, aby uzyskać najwyższy poziom dofinansowania.' }
      ]
    },
    {
      category: 'Inne Usługi',
      items: [
        { q: 'Kiedy warto wykonać termowizję drona?', a: 'Termowizja jest kluczowa dla diagnostyki "hot-spotów" (miejsc przegrzewania się modułów) oraz po gradobiciach lub silnych wichurach, aby wykryć mikropęknięcia niewidoczne gołym okiem.' },
        { q: 'Czy projekt stacji ładowania musi być odebrany przez UDT?', a: 'Każde urządzenie o mocy powyżej 3,7 kW, które służy do świadczenia odpłatnej lub nieodpłatnej usługi ładowania, musi posiadać dokumentację i przejść Badanie Techniczne Wstępne UDT.' }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 italic tracking-tight"
          >
            Pytania i <span className="text-orange-500 underline decoration-stone-200 underline-offset-8">Odpowiedzi</span>
          </motion.h1>
          <p className="text-xl text-stone-600 leading-relaxed italic">
            Zebraliśmy najczęstsze pytania naszych klientów. Jeśli nie znajdziesz tu odpowiedzi, skontaktuj się z nami bezpośrednio.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          {faqs.map((cat, idx) => (
            <div key={idx}>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-400 mb-8 border-l-4 border-orange-500 pl-4">{cat.category}</h2>
              <div className="space-y-4">
                {cat.items.map((item, i) => (
                  <details key={i} className="group bg-white rounded-3xl p-8 shadow-sm border border-stone-200 cursor-pointer overflow-hidden transition-all hover:border-orange-200">
                    <summary className="flex items-center justify-between list-none">
                      <h4 className="text-lg font-bold italic pr-12 group-open:text-orange-600 transition-colors">{item.q}</h4>
                      <ChevronDown className="group-open:rotate-180 transition-transform text-stone-300 group-hover:text-orange-500" />
                    </summary>
                    <div className="mt-6 text-stone-600 leading-relaxed italic border-t border-stone-50 pt-6 animate-in slide-in-from-top-4 duration-300">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center pb-12">
           <div className="inline-flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                 <MessageCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold italic">Nadal masz wątpliwości?</h3>
              <p className="text-stone-500 italic max-w-sm">Chętnie odpowiemy na każde pytanie techniczne i pomożemy dobrać usługę.</p>
              <Link to="/kontakt" className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-orange-600 transition-all">Wyślij nam pytanie</Link>
           </div>
        </div>
      </section>
    </div>
  );
}
