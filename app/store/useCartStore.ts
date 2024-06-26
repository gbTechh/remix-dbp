// src/store/useCartStore.ts
import { create } from "zustand";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          ),
        };
      } else {
        return { items: [...state.items, product] };
      }
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));
