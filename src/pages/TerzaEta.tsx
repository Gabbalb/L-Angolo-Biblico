import { Reveal } from '../components/ui/Reveal';
import { Heart } from 'lucide-react';

export default function TerzaEta() {
  return (
    <div className="pt-32 min-h-screen bg-[#97CCEA]/10 px-6">
      <div className="max-w-4xl mx-auto pb-32 text-center">
        <Reveal>
          <div className="flex justify-center mb-12">
            <Heart size={64} strokeWidth={1} className="text-red-500 opacity-60" />
          </div>
          <span className="text-xs uppercase tracking-[0.5em] opacity-50 block mb-8">Insieme nel cammino</span>
          <h1 className="text-6xl md:text-9xl mb-16 leading-none">Terza Età</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-70 leading-relaxed font-serif mb-24">
            Uno spazio di accoglienza dove l'esperienza diventa dono e il tempo si trasforma in condivisione.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          <Reveal>
            <div className="bg-white p-12 border border-black/5">
              <h3 className="text-2xl font-serif mb-6">Incontri di Lettura</h3>
              <p className="opacity-70 leading-relaxed">
                Ogni martedì pomeriggio ci riuniamo per leggere insieme testi che ispirano e aprono il cuore al dialogo.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-white p-12 border border-black/5">
              <h3 className="text-2xl font-serif mb-6">Momenti di Pace</h3>
              <p className="opacity-70 leading-relaxed">
                Spazi dedicati al silenzio e alla meditazione guidata, per ritrovare equilibrio e serenità interiore.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
