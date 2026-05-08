import { Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FloatingCTA() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const element = document.getElementById('kontakt-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/kontakt');
    }
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-orange-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      aria-label="Szybkie zapytanie"
    >
      <div className="absolute right-full mr-4 bg-white text-stone-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-stone-100">
        Szybkie zapytanie!
      </div>
      <Send size={28} className="fill-white/20" />
      <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-orange-600 animate-ping"></span>
    </motion.button>
  );
}
