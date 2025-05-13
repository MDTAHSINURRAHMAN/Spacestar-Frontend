import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  image: string;
  size: string;
  availableSizes: string[];
  color: string;
  availableColors: string[];
  quantity: number;
  price: number;
  total: number;
  shippingDate?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, "_id" | "total">>
    ) => {
      const newItem = {
        ...action.payload,
        _id: Math.random().toString(36).substr(2, 9), // Simple ID generation
        total: action.payload.price * action.payload.quantity,
      };
      state.items.push(newItem);
    },
    updateCartItem: (
      state,
      action: PayloadAction<{ itemId: string; updates: Partial<CartItem> }>
    ) => {
      const { itemId, updates } = action.payload;
      const item = state.items.find((item) => item._id === itemId);
      if (item) {
        Object.assign(item, updates);
        // Recalculate total if quantity or price changed
        if (updates.quantity || updates.price) {
          item.total =
            (updates.price || item.price) * (updates.quantity || item.quantity);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    addSizeVariant: (
      state,
      action: PayloadAction<{
        productId: string;
        size: string;
        quantity: number;
      }>
    ) => {
      const { productId, size, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        const newItem = {
          ...existingItem,
          _id: Math.random().toString(36).substr(2, 9),
          size,
          quantity,
          total: existingItem.price * quantity,
        };
        state.items.push(newItem);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  updateCartItem,
  removeFromCart,
  addSizeVariant,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
