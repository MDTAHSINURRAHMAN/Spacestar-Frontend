export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number | string;
  category: string;
  stock: number | string;
  isPreOrder: boolean | string;
  sizes: string[];
  colors: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}
