import { Book, Order } from '../types';

// Sostituisci questo con l'URL della tua Web App di Google Apps Script una volta pubblicata
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''; 

export const googleSheetService = {
  async getBooks(): Promise<Book[]> {
    if (!GOOGLE_SCRIPT_URL) {
      // Dati di esempio se l'URL non è configurato
      const languages: Book[] = [
        { id: 'l1', titolo: 'Arabo', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Araba.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/sa.png' },
        { id: 'l2', titolo: 'Albanese', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Albanese.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/al.png' },
        { id: 'l3', titolo: 'Bengali', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Bengali.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/bd.png' },
        { id: 'l4', titolo: 'Bulgaro', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Bulgara.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/bg.png' },
        { id: 'l5', titolo: 'Ceco', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Ceca.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/cz.png' },
        { id: 'l6', titolo: 'Cinese', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Cinese.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/cn.png' },
        { id: 'l7', titolo: 'Croato', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Croata.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/hr.png' },
        { id: 'l8', titolo: 'Curdo', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Curda.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/iq.png' },
        { id: 'l9', titolo: 'Ebraico', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Ebraica.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/il.png' },
        { id: 'l10', titolo: 'Francese', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Francese.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/fr.png' },
        { id: 'l11', titolo: 'Indi', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Indi.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/in.png', esaurito: true },
        { id: 'l12', titolo: 'Inglese', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Inglese.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/gb.png' },
        { id: 'l13', titolo: 'Panjabi', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Panjabi.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/pk.png', esaurito: true },
        { id: 'l14', titolo: 'Persiano Farsi', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Persiana.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/ir.png' },
        { id: 'l15', titolo: 'Polacco', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Polacca.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/pl.png' },
        { id: 'l16', titolo: 'Portoghese', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Portoghese.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/pt.png' },
        { id: 'l17', titolo: 'Rumeno', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Rumena.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/ro.png' },
        { id: 'l18', titolo: 'Russo', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Russa.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/ru.png', esaurito: true },
        { id: 'l19', titolo: 'Serbo', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Serba.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/rs.png' },
        { id: 'l20', titolo: 'Sloveno', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Slovena.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/si.png' },
        { id: 'l21', titolo: 'Spagnolo', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Spagnola.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/es.png' },
        { id: 'l22', titolo: 'Swahili', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Swahili.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/tz.png' },
        { id: 'l23', titolo: 'Tedesco', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Tedesca.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/de.png' },
        { id: 'l24', titolo: 'Turco', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Turca.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/tr.png' },
        { id: 'l25', titolo: 'Ucraino', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Ucraina.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/ua.png' },
        { id: 'l26', titolo: 'Ungherese', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Ungherese.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/hu.png' },
        { id: 'l27', titolo: 'Urdu', autore: 'Lingua Straniera', trama: 'Testi biblici in lingua Urdu.', categoria: 'Lingua Straniera', immagine: 'https://flagcdn.com/w320/pk.png', esaurito: true },
      ];

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
          immagine: '/copertine/15_ragioni.jpeg',
          esaurito: true
        },
        {
          id: '3',
          titolo: 'NELL\'OMBRA DELL\'ONNIPOTENTE',
          autore: 'Elisabeth Elliot',
          trama: 'La biografia di Jim Elliot, un uomo che ha dato tutto per il Vangelo.',
          pagine: 297,
          categoria: 'Adulti',
          immagine: '/copertine/nell_ombra_dell_onnipotente.jpeg'
        },
        {
          id: 'b1',
          titolo: 'I FRATELLI CUORDILEPRE',
          autore: 'Astrid Lindgren',
          trama: 'Una storia di coraggio e amore fraterno.',
          categoria: 'Bambini',
          immagine: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400'
        },
        ...languages
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
