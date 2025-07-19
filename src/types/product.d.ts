export interface Product {
  id: number;
  title: string;
  price: number;
  rating?: number;
  reviews?: number;
  store: string;
  thumbnail: string;
  link: string;
  description?: string;
  name?: string;
  category?: string;
  confidence?: number;
  brand?: string | null;
  color?: string | null;
}
