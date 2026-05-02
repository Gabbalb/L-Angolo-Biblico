import { useState, useEffect } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { motion, AnimatePresence } from 'motion/react';
import { Book, CartItem, Order } from '../types';
import { googleSheetService } from '../services/googleSheetService';
import { ShoppingCart, X, Plus, Minus, Check, ChevronRight } from 'lucide-react';

export default function Libro() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [qtyToOrder, setQtyToOrder] = useState(1);
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
    email: '',
    notes: ''
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
        image: book.immagine,
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
              <h1 className="text-5xl md:text-8xl leading-tight font-serif text-[#4A2C2A]">Un Libro per te</h1>
            </div>
          </Reveal>
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
                      onClick={() => {
                        if (!book.esaurito) {
                          setSelectedBook(book);
                          setQtyToOrder(1);
                        }
                      }}
                      className={`group flex flex-col items-center text-center ${book.esaurito ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className={`aspect-[3/4] w-full bg-white shadow-2xl rounded-xl overflow-hidden mb-6 relative transition-all duration-500 ${book.esaurito ? 'grayscale opacity-60' : 'group-hover:-translate-y-2'}`}>
                        <img 
                          src={book.immagine} 
                          alt={book.titolo}
                          className={`w-full h-full ${book.categoria === 'Lingua Straniera' ? 'object-contain p-4 rounded-full' : 'object-cover'}`}
                        />
                        
                        {book.esaurito && (
                          <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden pointer-events-none">
                            <div className="absolute top-6 -left-8 w-40 bg-red-600 text-white text-[10px] uppercase font-bold py-1 tracking-widest text-center -rotate-45 shadow-lg">
                              Esaurito
                            </div>
                          </div>
                        )}

                        {!book.esaurito && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs uppercase tracking-widest border border-white/40 px-4 py-2 backdrop-blur-sm rounded">Scegli</span>
                          </div>
                        )}
                      </div>
                      <div className={`space-y-1 ${book.esaurito ? 'opacity-40' : ''}`}>
                        {book.pagine && (
                          <p className="text-xl font-serif text-[#4A2C2A] opacity-80 decoration-[#a2674e]/30 underline decoration-2 underline-offset-4">
                            {book.pagine} pag.
                          </p>
                        )}
                        <h3 className="text-lg font-serif text-[#4A2C2A] group-hover:opacity-60 transition-opacity mt-2">{book.titolo}</h3>
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
                <h2 className="text-4xl font-serif mb-2">{selectedBook.titolo}</h2>
                <div className="flex items-center gap-4 mb-8">
                  <p className="text-sm uppercase tracking-widest opacity-40">{selectedBook.autore}</p>
                  {selectedBook.pagine && (
                    <>
                      <div className="w-[1px] h-3 bg-black/10" />
                      <p className="text-sm font-serif italic text-[#8B4513] opacity-60">{selectedBook.pagine} pagine</p>
                    </>
                  )}
                </div>
                
                <div className="mb-12">
                  <h4 className="text-xs uppercase tracking-widest font-semibold mb-4 opacity-80">La Trama</h4>
                  <p className="text-lg opacity-70 leading-relaxed font-serif">
                    {selectedBook.trama}
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-6">
                    <span className="text-xs uppercase tracking-widest font-semibold opacity-60">Quantità</span>
                    <div className="flex items-center border border-black/10 rounded-full px-4 py-2">
                      <button 
                        onClick={() => setQtyToOrder(Math.max(1, qtyToOrder - 1))}
                        className="p-1 hover:opacity-50 transition-opacity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-serif text-lg">{qtyToOrder}</span>
                      <button 
                        onClick={() => setQtyToOrder(qtyToOrder + 1)}
                        className="p-1 hover:opacity-50 transition-opacity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => addToCart(selectedBook, qtyToOrder)}
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
                <h2 className="text-2xl font-serif">La tua richiesta</h2>
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
                    <h3 className="text-2xl font-serif mb-4">Richiesta Inviata!</h3>
                    <p className="opacity-60 font-serif">
                      Ti abbiamo inviato una mail di conferma.<br />
                      Presto i libri saranno da te.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-8 mb-12">
                      {cart.map((item) => (
                        <div key={item.bookId} className="flex gap-4 items-center group">
                          <div className="w-16 h-20 bg-black/5 flex-shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-lg leading-tight truncate">{item.title}</h4>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 truncate">{item.author}</p>
                            <p className="text-xs mt-1 font-serif">Q.tà: {item.quantity}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.bookId)}
                            className="p-2 text-red-400 hover:text-red-600 transition-colors"
                            title="Rimuovi"
                          >
                            <X className="w-5 h-5" />
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
                        <textarea
                          placeholder="Eventuali note o richieste (lingue straniere, ecc.)"
                          value={formData.notes}
                          onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          className="w-full border-b border-black/10 py-3 text-lg font-serif italic outline-none focus:border-black transition-colors resize-none h-24"
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

      {/* Floating Bottom Cart Bar */}
      <AnimatePresence>
        {cart.length > 0 && !showCheckout && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-8 left-0 right-0 z-[80] px-6 pointer-events-none"
          >
            <div className="max-w-6xl mx-auto flex justify-center md:justify-end">
              <button
                onClick={() => setShowCheckout(true)}
                className="pointer-events-auto group flex items-center gap-6 bg-[#4A2C2A] text-white px-10 py-5 rounded-full shadow-[0_20px_50px_rgba(74,44,42,0.3)] transition-all hover:scale-105 active:scale-95"
              >
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Il tuo pacco</span>
                  <span className="font-serif text-xl">{totalItems} {totalItems === 1 ? 'libro' : 'libri'}</span>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ShoppingCart className="w-6 h-6" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
