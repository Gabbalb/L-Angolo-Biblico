import { Reveal } from '../components/ui/Reveal';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Contatti() {
  return (
    <div className="pt-32 min-h-screen bg-white px-6">
      <div className="max-w-4xl mx-auto pb-32">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.5em] opacity-50 block mb-8">Apertura</span>
          <h1 className="text-6xl md:text-9xl italic mb-16 leading-none">Contatti</h1>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-24 mt-24">
          <Reveal>
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <Phone size={32} strokeWidth={1} className="opacity-40" />
                <div>
                  <h3 className="text-xs uppercase tracking-widest opacity-40 mb-2">Telefono</h3>
                  <a href="tel:+39012345678" className="text-2xl font-serif italic hover:opacity-50 transition-opacity">
                    +39 012 345678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <Mail size={32} strokeWidth={1} className="opacity-40" />
                <div>
                  <h3 className="text-xs uppercase tracking-widest opacity-40 mb-2">Email</h3>
                  <a href="mailto:info@angolobiblico.it" className="text-2xl font-serif italic hover:opacity-50 transition-opacity">
                    info@angolobiblico.it
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <MapPin size={32} strokeWidth={1} className="opacity-40" />
                <div>
                  <h3 className="text-xs uppercase tracking-widest opacity-40 mb-2">Sede</h3>
                  <p className="text-2xl font-serif italic">
                    Via della Pace, 12<br />
                    00100 Roma (RM)
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-[#001D3D] text-[#97CCEA] p-12">
              <h3 className="text-2xl font-serif italic mb-8">Scrivici un messaggio</h3>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="border-b border-[#97CCEA]/20 pb-4">
                  <input type="text" placeholder="Il tuo Nome" className="w-full bg-transparent outline-none placeholder:text-[#97CCEA]/30 text-lg" />
                </div>
                <div className="border-b border-[#97CCEA]/20 pb-4">
                  <input type="email" placeholder="La tua Email" className="w-full bg-transparent outline-none placeholder:text-[#97CCEA]/30 text-lg" />
                </div>
                <div className="border-b border-[#97CCEA]/20 pb-12">
                  <textarea placeholder="Come possiamo aiutarti?" className="w-full bg-transparent outline-none placeholder:text-[#97CCEA]/30 text-lg resize-none"></textarea>
                </div>
                <button className="w-full bg-[#97CCEA] text-[#001D3D] py-6 font-bold uppercase tracking-widest hover:bg-white transition-colors">Invia</button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
