import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, Search, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { services } from '../servicesData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setSearchQuery('');
    setIsSearchFocused(false);
  }, [location]);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Oferta', path: '/#oferta' },
    { name: 'Realizacje', path: '/realizacje' },
    { name: 'O nas', path: '/o-nas' },
    { name: 'Aktualności', path: '/aktualnosci' },
    { name: 'Kontakt', path: '/kontakt' },
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Tier 1: Brand & Contact Info */}
      <div className={cn(
        "w-full transition-all duration-500 bg-white border-b border-stone-100",
        scrolled ? "py-2" : "py-3"
      )}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <img 
              src="/assets/logo.png" 
              alt="RAD MAR Logo" 
              className={cn(
                "w-auto object-contain transition-all duration-500 group-hover:scale-105",
                scrolled ? "h-8 md:h-10" : "h-10 md:h-12"
              )}
            />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-grow max-w-lg relative" ref={searchRef}>
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-orange-500 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Wyszukaj usługę..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
              />
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchQuery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-stone-100 overflow-hidden z-[60]"
                >
                  {filteredServices.length > 0 ? (
                    <div className="p-1">
                      {filteredServices.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => navigate(`/oferta/${service.id}`)}
                          className="w-full text-left p-2 hover:bg-stone-50 rounded-lg transition-colors flex items-center gap-3 group"
                        >
                          <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <Search size={12} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-stone-900">{service.title}</p>
                            <p className="text-xs text-stone-500 line-clamp-1">{service.shortDescription}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-sm text-stone-500">Nie znaleźliśmy pasujących usług.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+48793376709"
              className="flex items-center gap-2 text-base font-bold text-stone-900 hover:text-orange-600 transition-colors"
            >
              <Phone size={16} className="text-orange-500" />
              +48 793 376 709
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-stone-50 rounded-lg text-stone-900 border border-stone-200"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2: Navigation Links - Desktop Only */}
      <div className={cn(
        "hidden md:block w-full transition-all duration-500",
        scrolled 
          ? "bg-[#ffb100] shadow-lg py-3.5" 
          : "bg-[#ffb100] py-4"
      )}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-black transition-all hover:text-white/80 relative py-1 tracking-tight uppercase',
                  location.pathname === link.path 
                    ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full' 
                    : 'text-stone-900'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col md:hidden"
          >
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto" />
              <button onClick={() => setIsOpen(false)} className="p-2 bg-stone-50 rounded-xl">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-8">
              {/* Search in Mobile */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type="text"
                  placeholder="Wyszukaj usługę..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-4 pl-12 pr-4 text-base focus:outline-none focus:border-orange-500 italic"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {filteredServices.map(service => (
                      <button
                        key={service.id}
                        onClick={() => navigate(`/oferta/${service.id}`)}
                        className="w-full text-left p-4 bg-stone-50 rounded-2xl flex items-center gap-4"
                      >
                        <div className="w-10 h-10 bg-[#ffb100] rounded-xl flex items-center justify-center text-stone-900">
                          <Search size={18} />
                        </div>
                        <span className="font-bold italic text-stone-900">{service.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Nawigacja</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'block text-2xl font-black tracking-tighter transition-colors',
                      location.pathname === link.path ? 'text-orange-600' : 'text-stone-900'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Contact */}
              <div className="space-y-4 pt-8 border-t border-stone-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Kontakt</p>
                <a
                  href="tel:+48793376709"
                  className="flex items-center gap-4 p-4 bg-[#ffb100] text-stone-900 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/10"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  +48 793 376 709
                </a>
              </div>
            </div>
            
            <div className="p-6 border-t border-stone-100 bg-stone-50">
              <div className="flex items-center justify-center gap-4 text-stone-400">
                <Clock size={16} />
                <span className="text-xs font-bold italic">Pn-Pt: 8:00 - 18:00</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
