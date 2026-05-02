import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Libro from './pages/Libro';
import TerzaEta from './pages/TerzaEta';
import Contatti from './pages/Contatti';
import Dashboard from './pages/Dashboard';

// Componente per forzare lo scroll in alto al cambio pagina
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLibroPage = location.pathname === '/un-libro-per-te';

  return (
    <div className="bg-white text-black min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/un-libro-per-te" element={<Libro />} />
          <Route path="/terza-eta" element={<TerzaEta />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/dashboard-gestione" element={<Dashboard />} />
        </Routes>
      </main>

      {!isLibroPage && <Footer />}
    </div>
  );
}

