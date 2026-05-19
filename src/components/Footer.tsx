import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center">
              <img 
                src="/assets/logo.png" 
                alt="RAD MAR Logo" 
                width={120}
                height={48}
                loading="lazy"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Eksperckie projekty OZE i kompleksowe doradztwo dla firm instalacyjnych oraz inwestorów indywidualnych w całej Polsce.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61558031386658" 
                className="hover:text-orange-500 transition-colors"
                aria-label="Profil Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="mailto:ziezio2@gmail.com" 
                className="hover:text-orange-500 transition-colors"
                aria-label="Wyślij e-mail"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Nawigacja</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Strona Główna</Link></li>
              <li><Link to="/oferta" className="hover:text-orange-500 transition-colors">Nasza Oferta</Link></li>
              <li><Link to="/realizacje" className="hover:text-orange-500 transition-colors">Realizacje</Link></li>
              <li><Link to="/faq" className="hover:text-orange-500 transition-colors">Najczęstsze pytania</Link></li>
              <li><Link to="/newsletter" className="hover:text-orange-500 transition-colors">Newsletter</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Kontakt</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <a href="tel:+48793376709" className="hover:text-white transition-colors">+48 793 376 709</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <a href="mailto:ziezio2@gmail.com" className="hover:text-white transition-colors">ziezio2@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0" />
                <span>Obszar całej Polski</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-orange-500 shrink-0" />
                <span>Pn - Pt: 07:00 - 19:00</span>
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="bg-stone-900/50 p-6 rounded-2xl border border-stone-800 flex flex-col gap-4">
            <h4 className="text-white font-semibold text-base">Potrzebujesz projektu?</h4>
            <p className="text-xs">Zadzwoń do nas lub wyślij wiadomość, a my przygotujemy bezpłatną wycenę dla Ciebie.</p>
            <Link 
              to="/kontakt" 
              className="mt-2 bg-orange-500 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-all text-center"
            >
              Wyślij Zapytanie
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {currentYear} RAD MAR. Wszystkie prawa zastrzeżone.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors">Polityka prywatności</span>
            <span className="hover:text-white transition-colors">Regulamin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
