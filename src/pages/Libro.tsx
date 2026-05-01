import { Reveal } from '../components/ui/Reveal';
import { motion } from 'motion/react';

export default function Libro() {
  return (
    <div className="pt-32 min-h-screen bg-white px-6">
      <div className="max-w-4xl mx-auto pb-32">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.5em] opacity-50 block mb-8">Letteratura ed Anima</span>
          <h1 className="text-6xl md:text-8xl italic mb-16 leading-tight">Un Libro<br />per te</h1>
        </Reveal>

        <div className="grid gap-16">
          <Reveal>
            <div className="border-b border-black/10 pb-12">
              <h2 className="text-3xl font-serif italic mb-4">Sulle ali della speranza</h2>
              <p className="text-lg opacity-70 max-w-2xl">
                Un testo che esplora la profondità del conforto spirituale nei momenti di transizione.
              </p>
            </div>
          </Reveal>
          
          <Reveal>
            <div className="border-b border-black/10 pb-12">
              <h2 className="text-3xl font-serif italic mb-4">Il cammino dell'ascolto</h2>
              <p className="text-lg opacity-70 max-w-2xl">
                Imparare a sentire la voce del silenzio e la saggezza dei piccoli gesti quotidiani.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-24 p-12 bg-black text-white">
            <p className="text-xl font-serif italic mb-8">"I libri sono specchi: riflettono ciò che abbiamo già dentro di noi."</p>
            <button className="text-sm uppercase tracking-widest border-b border-white pb-1">Richiedi una copia</button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
