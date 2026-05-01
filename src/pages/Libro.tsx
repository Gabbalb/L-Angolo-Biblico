import { useState, useEffect } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { motion, AnimatePresence } from 'motion/react';
import { Book, CartItem, Order } from '../types';
import { googleSheetService } from '../services/googleSheetService';
import { ShoppingCart, X, Plus, Minus, Check, ChevronRight } from 'lucide-react';

export default function Libro() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('libri-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: ''
  });

  useEffect(() => {
    googleSheetService.getBooks().then(data => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('libri-cart', JSON.stringify(cart));
  }, [cart]);

  const categories = ['Adulti', 'Bambini', 'Lingua Straniera'] as const;

  const addToCart = (book: Book, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.bookId === book.id);
      if (existing) {
        return prev.map(item => 
          item.bookId === book.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { 
        bookId: book.id, 
        title: book.titolo, 
        author: book.autore, 
        quantity 
      }];
    });
    setSelectedBook(null);
  };

  const removeFromCart = (bookId: string) => {
    setCart(prev => prev.filter(item => item.bookId !== bookId));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('submitting');

    const order: Order = {
      ...formData,
      items: cart
    };

    const success = await googleSheetService.submitOrder(order);
    if (success) {
      setOrderStatus('success');
      setCart([]);
      localStorage.removeItem('libri-cart');
      setTimeout(() => {
        setShowCheckout(false);
        setOrderStatus('idle');
      }, 3000);
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categoriesMapping = {
    'Adulti': 'LIBRI GRATUITI PER GRANDI',
    'Bambini': 'LIBRI GRATUITI PER PICCOLI',
    'Lingua Straniera': 'LIBRI GRATUITI LINGUA STRANIERA'
  };

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center bg-[#F4EBE2]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-2 border-[#8B4513] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-serif italic text-[#8B4513] opacity-60">Caricamento libreria...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-[#F4EBE2] relative px-6 overflow-hidden">
      {/* Sfondo Legno Sfumato */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.15]" 
        style={{ 
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(139, 69, 19, 0.1) 40px, rgba(139, 69, 19, 0.1) 41px), 
                          linear-gradient(to bottom, #F4EBE2, #E8D5C4)` 
        }} 
      />

      <div className="max-w-6xl mx-auto pb-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
          <Reveal>
            <div className="text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.5em] text-[#8B4513] opacity-40 block mb-4">Letteratura ed Anima</span>
              <h1 className="text-5xl md:text-8xl italic leading-tight font-serif text-[#4A2C2A]">Un Libro per te</h1>
            </div>
          </Reveal>

          {cart.length > 0 && !showCheckout && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setShowCheckout(true)}
              className="group flex items-center gap-4 bg-[#4A2C2A] text-white px-8 py-4 rounded-full transition-all hover:bg-[#5D3A37]"
            >
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Il tuo pacco</span>
                <span className="font-serif italic text-lg">{totalItems} {totalItems === 1 ? 'libro' : 'libri'}</span>
              </div>
              <ShoppingCart className="w-5 h-5 ml-2" />
            </motion.button>
          )}
        </div>

        <div className="grid gap-32">
          {categories.map((category) => (
            <div key={category}>
              <Reveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#4A2C2A] uppercase tracking-wider mb-2">
                    {categoriesMapping[category]}
                  </h2>
                  <div className="h-1 w-24 bg-[#4A2C2A]/20 mx-auto" />
                </div>
              </Reveal>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
                {books
                  .filter(book => book.categoria === category)
                  .map((book) => (
                    <motion.div
                      layoutId={`book-${book.id}`}
                      key={book.id}
                      onClick={() => setSelectedBook(book)}
                      className="cursor-pointer group flex flex-col items-center text-center"
                    >
                      <div className="aspect-[3/4] w-full bg-white shadow-2xl rounded-xl overflow-hidden mb-6 relative transition-transform duration-500 group-hover:-translate-y-2">
                        <img 
                          src={book.immagine} 
                          alt={book.titolo}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs uppercase tracking-widest border border-white/40 px-4 py-2 backdrop-blur-sm rounded">Scegli</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {book.pagine && (
                          <p className="text-xl font-serif italic text-[#4A2C2A] opacity-80 decoration-[#a2674e]/30 underline decoration-2 underline-offset-4">
                            {book.pagine} pag.
                          </p>
                        )}
                        <h3 className="text-lg font-serif italic text-[#4A2C2A] group-hover:opacity-60 transition-opacity mt-2">{book.titolo}</h3>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBook(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              layoutId={`book-${selectedBook.id}`}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden relative flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedBook(null)}
                className="absolute top-6 right-6 z-10 p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto">
                <img 
                  src={selectedBook.immagine} 
                  alt={selectedBook.titolo}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4 block">{selectedBook.categoria}</span>
                <h2 className="text-4xl font-serif italic mb-2">{selectedBook.titolo}</h2>
                <p className="text-sm uppercase tracking-widest opacity-40 mb-8">{selectedBook.autore}</p>
                
                <div className="mb-12">
                  <h4 className="text-xs uppercase tracking-widest font-semibold mb-4 opacity-80">La Trama</h4>
                  <p className="text-lg opacity-70 leading-relaxed font-serif italic">
                    {selectedBook.trama}
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <button 
                    onClick={() => addToCart(selectedBook, 1)}
                    className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-black/80 transition-colors"
                  >
                    Richiedi Gratuitamente
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Sidebar */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckout(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="bg-white w-full max-w-md h-full relative z-10 flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-black/5 flex justify-between items-center">
                <h2 className="text-2xl font-serif italic">La tua richiesta</h2>
                <button onClick={() => setShowCheckout(false)} className="hover:opacity-50 transition-opacity">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {orderStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif italic mb-4">Richiesta Inviata!</h3>
                    <p className="opacity-60 font-serif italic">
                      Ti abbiamo inviato una mail di conferma.<br />
                      Presto i libri saranno da te.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-8 mb-12">
                      {cart.map((item) => (
                        <div key={item.bookId} className="flex justify-between items-start">
                          <div>
                            <h4 className="font-serif italic text-lg">{item.title}</h4>
                            <p className="text-[10px] uppercase tracking-widest opacity-40">{item.author}</p>
                            <p className="text-xs mt-2 font-serif">Quantità: {item.quantity}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.bookId)}
                            className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-red-600 transition-all"
                          >
                            Rimuovi
                          </button>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSubmitOrder} className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest font-semibold opacity-80">I tuoi dati</h4>
                        <input
                          required
                          type="text"
                          placeholder="Nome"
                          value={formData.name}
                          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full border-b border-black/10 py-3 text-lg font-serif italic outline-none focus:border-black transition-colors"
                        />
                        <input
                          required
                          type="text"
                          placeholder="Cognome"
                          value={formData.surname}
                          onChange={e => setFormData(prev => ({ ...prev, surname: e.target.value }))}
                          className="w-full border-b border-black/10 py-3 text-lg font-serif italic outline-none focus:border-black transition-colors"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full border-b border-black/10 py-3 text-lg font-serif italic outline-none focus:border-black transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={orderStatus === 'submitting'}
                        className="w-full bg-black text-white py-6 text-xs uppercase tracking-[0.2em] hover:bg-black/80 transition-all disabled:opacity-50"
                      >
                        {orderStatus === 'submitting' ? 'Invio in corso...' : 'Conferma Richiesta Gratuita'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
