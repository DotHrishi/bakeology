"use client";

import { createContext, useContext, useState } from "react";

type CartItem = {
  quantity: number;
  image: string;
  price: number;
};

type CartContextType = {
  count: number;
  total: number;
  items: Record<string, CartItem>;
  addItem: (name: string, image: string, price: number) => void;
  removeItem: (name: string) => void;
  getItemCount: (name: string) => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Record<string, CartItem>>({});

  const count = Object.values(items).reduce((acc, curr) => acc + curr.quantity, 0);
  const total = Object.values(items).reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const addItem = (name: string, image: string, price: number) => {
    setItems((prev) => {
      const current = prev[name] || { quantity: 0, image, price };
      return {
        ...prev,
        [name]: { ...current, quantity: current.quantity + 1, image, price },
      };
    });
  };

  const removeItem = (name: string) => {
    setItems((prev) => {
      const current = prev[name];
      if (!current) return prev;

      if (current.quantity <= 1) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: { ...current, quantity: current.quantity - 1 } };
    });
  };

  const getItemCount = (name: string) => items[name]?.quantity || 0;
  const clearCart = () => setItems({});

  return (
    <CartContext.Provider value={{ count, total, items, addItem, removeItem, getItemCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
