export interface CartItem {
    _id: string;
    productId: string;
    name: string;
    image: string;
    shippingDate: string;
    size: string;
    availableSizes: string[];
    color: string;
    availableColors: string[];
    quantity: number;
    price: number;
    total: number;
    addedAt: string;
  }
  
  export interface Cart {
    cartId: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
  }
  