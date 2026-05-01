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
          immagine: '/copertine/5_domande_cruciali.jpeg'
        },
        {
          id: '2',
          titolo: '15 RAGIONI PER CONSIDERARE LA GENESI COME STORIA',
          autore: 'Don Batten',
          trama: 'Un analisi scientifica e biblica sulle origini.',
          pagine: 34,
          categoria: 'Adulti',
          immagine: '/copertine/15_ragioni.jpeg'
        },
        {
          id: '3',
          titolo: 'NELL\'OMBRA DELL\'ONNIPOTENTE',
          autore: 'Elisabeth Elliot',
          trama: 'La biografia di Jim Elliot, un uomo che ha dato tutto per il Vangelo.',
          pagine: 297,
          categoria: 'Adulti',
          immagine: '/copertine/nell_ombra_dell_onnipotente.jpeg'
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
