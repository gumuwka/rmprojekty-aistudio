import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, Sun, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Oferta', path: '/oferta' },
    { name: 'Realizacje', path: '/realizacje' },
    { name: 'O firmie', path: '/o-firmie' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontakt', path: '/kontakt' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-stone-200 py-3 shadow-sm'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img 
            src="/assets/logo.png" 
            alt="RAD MAR Logo" 
            className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-orange-600',
                location.pathname === link.path ? 'text-orange-600' : 'text-stone-600'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+48793376709"
            className="flex items-center gap-2 text-sm font-semibold text-stone-900 hover:text-orange-600 transition-colors"
          >
            <Phone size={16} />
            +48 793 376 709
          </a>
          <Link
            to="/kontakt"
            className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition-all flex items-center gap-2"
          >
            Darmowa wycena <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Trigger */}
        <button
          className="md:hidden p-2 text-stone-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-lg font-medium py-2 border-b border-stone-50 last:border-0',
                    location.pathname === link.path ? 'text-orange-600' : 'text-stone-900'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="tel:+48793376709"
                  className="flex items-center justify-center gap-2 bg-stone-100 py-3 rounded-xl font-semibold"
                >
                  <Phone size={18} />
                  Zadzwoń teraz
                </a>
                <Link
                  to="/kontakt"
                  className="bg-black text-white py-3 rounded-xl font-semibold text-center"
                >
                  Darmowa wycena
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
