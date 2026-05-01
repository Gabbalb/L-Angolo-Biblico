import { motion } from 'motion/react';
import { Heart, ChevronDown } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#97CCEA]">
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
            src="https://images.pexels.com/photos/27672478/pexels-photo-27672478.jpeg?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover object-center grayscale"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center relative z-10"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] mb-12 block opacity-60"></span>
          <h1 className="text-7xl md:text-[10rem] font-serif mb-12 italic leading-none tracking-tighter text-balance">
            L'Angolo<br />Biblico
          </h1>
          <p className="text-xl md:text-2xl max-w-xl mx-auto font-serif italic text-balance leading-relaxed">
            "Gratuitamente avete ricevuto,<br />gratuitamente date"
          </p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute bottom-8 flex flex-col items-center z-10 md:hidden"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] opacity-40 mb-1">Scopri di più</span>
          <div className="flex flex-col -space-y-9 opacity-20">
            <ChevronDown size={48} strokeWidth={1} />
            <ChevronDown size={48} strokeWidth={1} />
          </div>
        </motion.div>
      </section>

      {/* 2. SECTION: UN LIBRO PER TE */}
      <section className="pt-[30px] pb-[100px] px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <Reveal>
            <div className="aspect-[3/4] bg-[#F5F5F5] flex items-center justify-center p-12 overflow-hidden group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <img 
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600" 
                  alt="Libro antico"
                  className="w-full h-full object-cover mix-blend-multiply opacity-80"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </Reveal>
          
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-5xl md:text-7xl italic leading-[1.1] tracking-tight">Un Libro<br />per te</h2>
            </Reveal>
            <Reveal>
              <div className="space-y-6">
                <p className="text-lg md:text-xl opacity-70 leading-relaxed max-w-md">
                  Vogliamo regalarti un libro, ce ne sono di vari temi, tutti con fondamento biblico. Scegli il tuo.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="pt-8">
                <Link 
                  to="/un-libro-per-te"
                  className="group relative inline-block py-6 px-12 border border-black overflow-hidden bg-white hover:text-white transition-colors duration-500"
                >
                  <span className="relative z-10 text-xl uppercase tracking-[0.3em] font-bold">Esplora</span>
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </Link>
                <p className="text-[10px] mt-6 opacity-40 uppercase tracking-[0.2em] italic">
                  Tocca l'area per visualizzare i testi disponibili
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. SECTION: TERZA ETÀ */}
      <section className="py-48 px-6 bg-[#97CCEA]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           <Heart size={400} strokeWidth={0.5} className="text-black" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.5em] opacity-50 block">Comunità</span>
          </Reveal>
          <Reveal>
            <h2 className="text-6xl md:text-9xl italic leading-none">Terza Età</h2>
          </Reveal>
          <Reveal>
            <p className="text-xl md:text-3xl max-w-3xl mx-auto opacity-70 leading-relaxed font-serif italic">
              L'Angolo Biblico porta sollievo, gioia e riflessione agli anziani delle Case riposo. Scopri le nostre attività.
            </p>
          </Reveal>
          
          <Reveal>
            <div className="pt-12">
              <Link 
                to="/terza-eta"
                className="inline-block px-14 py-7 bg-white border border-black text-xl uppercase tracking-[0.4em] font-bold hover:bg-black hover:text-white transition-all duration-700 shadow-sm"
              >
                Attività
              </Link>
              <p className="text-[10px] mt-8 opacity-40 uppercase tracking-[0.3em] italic">
                Scopri le nostre attività.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
