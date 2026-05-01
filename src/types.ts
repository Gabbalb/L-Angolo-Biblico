export interface Book {
  id: string;
  titolo: string;
  autore: string;
  trama: string;
  pagine?: number;
  categoria: 'Bambini' | 'Adulti' | 'Lingua Straniera';
  immagine: string;
}

export interface CartItem {
  bookId: string;
  title: string;
  author: string;
  quantity: number;
}

export interface Order {
  name: string;
  surname: string;
  email: string;
  items: CartItem[];
}
