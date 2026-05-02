import { useState, useEffect } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { motion } from 'motion/react';
import { Book, Order } from '../types';
import { googleSheetService } from '../services/googleSheetService';
import { LayoutDashboard, BookOpen, ListOrdered, Plus, LogOut } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'books' | 'orders'>('orders');
  const [books, setBooks] = useState<Book[]>([]);
  const [orders, setOrders] = useState<any[]>([]); // User orders from script
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bibbia2024') { // Password semplice per demo
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      googleSheetService.getBooks().then(setBooks);
      // In futuro qui chiameremo un metodo per recuperare gli ordini dal Google Sheet
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-12 shadow-2xl border border-black/5">
          <h1 className="text-3xl font-serif mb-8">Accesso Gestione</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="Password di accesso"
              className="w-full border-b border-black/10 py-3 outline-none focus:border-black transition-colors"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest">
              Entra
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar Dashboard */}
      <div className="w-64 bg-white border-r border-black/5 flex flex-col p-8 fixed h-full pt-32 left-0 top-0">
        <div className="flex items-center gap-3 mb-12">
          <LayoutDashboard className="w-5 h-5 opacity-40" />
          <span className="text-xs uppercase tracking-widest font-semibold opacity-40">Gestione</span>
        </div>
        
        <nav className="space-y-4 flex-grow">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-4 py-2 text-sm transition-all ${activeTab === 'orders' ? 'font-serif text-xl border-b border-black' : 'opacity-40 hover:opacity-100'}`}
          >
            <ListOrdered className="w-4 h-4" />
            Ordini Ricevuti
          </button>
          <button 
            onClick={() => setActiveTab('books')}
            className={`w-full flex items-center gap-4 py-2 text-sm transition-all ${activeTab === 'books' ? 'font-serif text-xl border-b border-black' : 'opacity-40 hover:opacity-100'}`}
          >
            <BookOpen className="w-4 h-4" />
            Catalogo Libri
          </button>
        </nav>

        <button 
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-4 py-2 text-sm opacity-40 hover:opacity-100 text-red-600 transition-all border-t border-black/5 pt-8"
        >
          <LogOut className="w-4 h-4" />
          Esci
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 ml-64 p-12">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-serif">{activeTab === 'books' ? 'Catalogo Libri' : 'Ordini Ricevuti'}</h2>
              <p className="text-xs uppercase tracking-widest opacity-40 mt-2">Dati sincronizzati con Google Sheets</p>
            </div>
            
            {activeTab === 'books' && (
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs uppercase tracking-widest rounded-full">
                <Plus className="w-4 h-4" />
                Nuovo Libro
              </button>
            )}
          </header>

          <div className="bg-white border border-black/5 shadow-sm overflow-hidden">
            {activeTab === 'books' ? (
              <table className="w-full text-left">
                <thead className="bg-[#F8F9FA] border-b border-black/5">
                  <tr className="text-[10px] uppercase tracking-widest opacity-40">
                    <th className="px-6 py-4 font-semibold">Immagine</th>
                    <th className="px-6 py-4 font-semibold">Titolo</th>
                    <th className="px-6 py-4 font-semibold">Autore</th>
                    <th className="px-6 py-4 font-semibold">Categoria</th>
                    <th className="px-6 py-4 font-semibold">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {books.map(book => (
                    <tr key={book.id} className="text-sm">
                      <td className="px-6 py-4">
                        <img src={book.immagine} className="w-10 h-12 object-cover" />
                      </td>
                      <td className="px-6 py-4 font-serif text-base">{book.titolo}</td>
                      <td className="px-6 py-4 opacity-60">{book.autore}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] uppercase tracking-widest bg-[#F8F9FA] px-2 py-1 rounded border border-black/5">
                          {book.categoria}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Modifica</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center">
                <p className="font-serif opacity-40 text-lg">
                  Gli ordini vengono salvati direttamente sul Foglio Google.<br />
                  Controlla il foglio "Ordini" per gestire le spedizioni.
                </p>
                <a 
                  href="#" 
                  target="_blank" 
                  className="mt-8 inline-block text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
                >
                  Apri Foglio Google
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
