import { motion } from 'motion/react';
import { Heart, Phone, ArrowDown } from 'lucide-react';
import { ReactNode } from 'react';

const Reveal = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const fiscalCode = "12345678901";

  return (
    <div className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION (FLOEMA STYLE WITH BACKGROUND) */}
      <section className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#97CCEA]">
        {/* Sky Background Image (simulante la foto dell'utente) */}
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
          <span className="text-[10px] uppercase tracking-[0.6em] mb-12 block opacity-60">L'Associazione</span>
          <h1 className="text-7xl md:text-[10rem] font-serif mb-12 italic leading-none tracking-tighter">
            L'Angolo<br />Biblico
          </h1>
          <p className="text-xl md:text-2xl max-w-xl mx-auto font-serif italic text-balance leading-relaxed">
            "Gratuitamente avete ricevuto,<br />gratuitamente date"
          </p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute bottom-16 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] opacity-40">Scopri di più</span>
          <div className="w-[1px] h-12 bg-black opacity-20"></div>
        </motion.div>
      </section>

      {/* 2. SECTION: UN LIBRO PER TE (REFINED) */}
      <section className="py-48 px-6 bg-white">
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
              <h2 className="text-5xl md:text-7xl italic leading-[1.1] tracking-tight">Il soffio<br />delle parole</h2>
            </Reveal>
            <Reveal>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-serif italic opacity-60">"Un Libro per te"</p>
                <p className="text-lg md:text-xl opacity-70 leading-relaxed max-w-md">
                  Una raccolta curata con amore, pensata per offrire spunti di riflessione e calore durante il cammino.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="pt-8">
                <button 
                  className="group relative inline-block py-6 px-12 border border-black overflow-hidden bg-white hover:text-white transition-colors duration-500"
                >
                  <span className="relative z-10 text-xl uppercase tracking-[0.3em] font-bold">Esplora</span>
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
                <p className="text-[10px] mt-6 opacity-40 uppercase tracking-[0.2em] italic">
                  Tocca l'area per visualizzare i testi disponibli
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. SECTION: TERZA ETÀ (REFINED) */}
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
              «La vecchiaia è un porto di quiete, non di stanchezza.»<br />
              Siamo qui per condividere ogni istante.
            </p>
          </Reveal>
          
          <Reveal>
            <div className="pt-12">
              <button 
                className="inline-block px-14 py-7 bg-white border border-black text-xl uppercase tracking-[0.4em] font-bold hover:bg-black hover:text-white transition-all duration-700 shadow-sm"
              >
                Attività
              </button>
              <p className="text-[10px] mt-8 opacity-40 uppercase tracking-[0.3em] italic">
                Scopri i nostri incontri settimanali
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. FOOTER (REFINED) */}
      <footer className="py-48 px-6 bg-[#001D3D] text-[#97CCEA]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-end">
          <Reveal>
            <div className="space-y-12 text-left">
              <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block">Contatto</span>
              <p className="text-4xl md:text-7xl font-serif italic border-b border-[#97CCEA]/20 pb-4">Parliamo.</p>
              <div className="space-y-4">
                <a href="tel:+3900000000" className="text-2xl md:text-4xl block hover:opacity-100 opacity-70 transition-opacity">
                  +39 012 345678
                </a>
                <p className="text-sm uppercase tracking-[0.2em] opacity-40">Lunedì — Sabato, 9:00 - 18:00</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-12 text-right md:text-right">
             <Reveal>
               <div className="space-y-4">
                 <span className="text-[10px] uppercase tracking-[0.4em] opacity-40">Sostegno</span>
                 <p className="text-xl md:text-2xl font-mono tracking-tighter opacity-80">
                   COD. FISCALE {fiscalCode}
                 </p>
               </div>
             </Reveal>

             <Reveal>
               <p className="text-[9px] uppercase tracking-[0.3em] opacity-30 mt-24">
                 © 2026 L'Angolo Biblico Associazione<br />
                 La semplicità del dono.
               </p>
             </Reveal>
          </div>
        </div>
      </footer>
    </div>
  );
}

