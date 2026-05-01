import { Reveal } from '../ui/Reveal';

export const Footer = () => {
  const fiscalCode = "03205040987";

  return (
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
              L'Angolo Biblico<br />
               Non è religione.
             </p>
           </Reveal>
        </div>
      </div>
    </footer>
  );
};
