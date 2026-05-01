import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Un Libro per te', path: '/un-libro-per-te' },
    { name: 'Terza Età', path: '/terza-eta' },
    { name: 'Contatti', path: '/contatti' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black/5 pl-[23px] pr-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center transition-opacity hover:opacity-70">
          <img 
            src="/logo.jpg" 
            alt="L'Angolo Biblico Logo" 
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] pl-[0.4em] opacity-40 font-serif italic whitespace-nowrap">
            non è religione
          </span>
        </div>

        <button 
          onClick={toggleMenu}
          className="p-2 hover:opacity-50 transition-opacity z-[60]"
        >
          {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-12 text-center">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link 
                    to={item.path}
                    onClick={toggleMenu}
                    className="text-4xl md:text-6xl font-serif italic hover:opacity-50 transition-opacity"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-12 text-[10px] uppercase tracking-[0.5em] opacity-30 italic">
              ...non è religione...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
