import { Book, Order } from '../types';

// Sostituisci questo con l'URL della tua Web App di Google Apps Script una volta pubblicata
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''; 

export const googleSheetService = {
  async getBooks(): Promise<Book[]> {
    if (!GOOGLE_SCRIPT_URL) {
      // Dati di esempio se l'URL non è configurato
      return [
        {
          id: '1',
          titolo: '5 DOMANDE CRUCIALI',
          autore: 'Tom Short',
          trama: 'Spunti di riflessione che trasformeranno la tua vita.',
          pagine: 87,
          categoria: 'Adulti',
          immagine: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'
        },
        {
          id: '2',
          titolo: '15 RAGIONI PER CONSIDERARE LA GENESI COME STORIA',
          autore: 'Don Batten',
          trama: 'Un analisi scientifica e biblica sulle origini.',
          pagine: 34,
          categoria: 'Adulti',
          immagine: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400'
        },
        {
          id: '3',
          titolo: 'Gesù mi ama',
          autore: 'L. Bianchi',
          trama: 'Storie bibliche per i più piccoli.',
          pagine: 24,
          categoria: 'Bambini',
          immagine: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400'
        }
      ];
    }

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      return await response.json();
    } catch (error) {
      console.error('Errore nel recupero dei libri:', error);
      return [];
    }
  },

  async submitOrder(order: Order): Promise<boolean> {
    if (!GOOGLE_SCRIPT_URL) {
      console.log('Simulazione invio ordine:', order);
      return true;
    }

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Spesso necessario con Google Script Web Apps
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      return true; // Con no-cors non possiamo leggere la risposta effettiva, assumiamo successo
    } catch (error) {
      console.error('Errore nell\'invio dell\'ordine:', error);
      return false;
    }
  }
};
