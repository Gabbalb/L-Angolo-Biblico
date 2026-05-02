export interface Book {
  id: string;
  titolo: string;
  autore: string;
  trama: string;
  pagine?: number;
  categoria: 'Bambini' | 'Adulti' | 'Lingua Straniera';
  immagine: string;
  esaurito?: boolean;
}

export interface CartItem {
  bookId: string;
  title: string;
  author: string;
  image: string;
  quantity: number;
}

export interface Order {
  name: string;
  surname: string;
  email: string;
  notes?: string;
  items: CartItem[];
}
