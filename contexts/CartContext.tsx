'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem, Cart } from '@/lib/types';
import { calculateTax, safeJSONParse } from '@/lib/utils';

// Cart actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; customRoseCount?: number; customPrice?: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Cart context type
interface CartContextType {
  cart: Cart;
  addItem: (product: Product, customRoseCount?: number, customPrice?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Local storage key
const CART_STORAGE_KEY = 'bouquets_cart';

// Calculate cart totals
function calculateCartTotals(items: CartItem[]): { subtotal: number; tax: number; total: number } {
  const subtotal = items.reduce((sum, item) => {
    const price = item.customPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

// Cart reducer
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find(item => 
        item.product.id === action.payload.product.id &&
        item.customRoseCount === action.payload.customRoseCount
      );
      if (existingItem) {
        return state.map(item =>
          item.product.id === action.payload.product.id &&
          item.customRoseCount === action.payload.customRoseCount
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { 
        product: action.payload.product, 
        quantity: 1,
        customRoseCount: action.payload.customRoseCount,
        customPrice: action.payload.customPrice
      }];
    }

    case 'REMOVE_ITEM': {
      return state.filter(item => item.product.id !== action.payload);
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return state.filter(item => item.product.id !== action.payload.productId);
      }
      return state.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    }

    case 'CLEAR_CART': {
      return [];
    }

    case 'LOAD_CART': {
      return action.payload;
    }

    default:
      return state;
  }
}

// Cart provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = safeJSONParse<CartItem[]>(savedCart, []);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addItem = React.useCallback((product: Product, customRoseCount?: number, customPrice?: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, customRoseCount, customPrice } });
  }, [dispatch]);

  const removeItem = React.useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  }, [dispatch]);

  const updateQuantity = React.useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }, [dispatch]);

  const clearCart = React.useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  const { subtotal, tax, total } = calculateCartTotals(items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const cart: Cart = {
    items,
    subtotal,
    tax,
    total,
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
