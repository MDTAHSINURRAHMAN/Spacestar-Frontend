export interface Review {
  _id: string;
  productId: string;
  name: string;
  rating: string;
  review: string;
  image?: string;
  imageUrl?: string;
  subtext?: string;
  createdAt: string;
  updatedAt: string;
}
