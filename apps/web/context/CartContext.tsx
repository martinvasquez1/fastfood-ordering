'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the structures matching your Checkout Page requirements
interface CartItem {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  quantity?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addItemToCart: (item: CartItem) => void;
  clearCart: () => void;
}

// 2. Initialize the context with an empty layout
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Create the Provider Component that wraps your app layout
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to handle adding items from other screens
  const addItemToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      // Check if item already exists in the cart array
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
            item.id === newItem.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addItemToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 4. Create and export the custom useCart hook used by your components
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}