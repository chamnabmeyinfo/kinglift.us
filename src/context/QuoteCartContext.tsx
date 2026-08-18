import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, QuoteCartItem, RFQSubmission } from '../types';
import confetti from 'canvas-confetti';

interface QuoteCartContextType {
  items: QuoteCartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number, selectedAccessories?: string[]) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalEstimatedMSRP: number;
  totalItemCount: number;
  submitRFQ: (formData: Omit<RFQSubmission, 'id' | 'items' | 'submittedAt'>) => Promise<RFQSubmission>;
  lastSubmission: RFQSubmission | null;
  clearLastSubmission: () => void;
}

const QuoteCartContext = createContext<QuoteCartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'kinglift_quote_cart_v1';

export const QuoteCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteCartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<RFQSubmission | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart items', e);
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  const addToCart = (product: Product, quantity = 1, selectedAccessories: string[] = []) => {
    setItems(prevItems => {
      const existing = prevItems.find(item => item.product.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, selectedAccessories: Array.from(new Set([...(item.selectedAccessories || []), ...selectedAccessories])) }
            : item
        );
      }
      return [...prevItems, { product, quantity, selectedAccessories }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalEstimatedMSRP = items.reduce((sum, item) => {
    const base = item.product.pricing.startingMSRP * item.quantity;
    const accCost = (item.selectedAccessories || []).reduce((accSum, accName) => {
      const acc = item.product.accessories?.find(a => a.name === accName);
      return accSum + (acc ? acc.price * item.quantity : 0);
    }, 0);
    return sum + base + accCost;
  }, 0);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const submitRFQ = async (formData: Omit<RFQSubmission, 'id' | 'items' | 'submittedAt'>): Promise<RFQSubmission> => {
    const itemsPayload = items.map(item => ({
      modelNumber: item.product.modelNumber,
      name: item.product.name,
      quantity: item.quantity,
      msrp: item.product.pricing.startingMSRP
    }));

    let submission: RFQSubmission = {
      ...formData,
      id: `RFQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
      items: itemsPayload,
      submittedAt: new Date().toISOString()
    };

    // Send to backend API
    try {
      const res = await fetch('/api/rfqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: itemsPayload
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.rfq) submission = data.rfq;
      }
    } catch (err) {
      console.warn('Backend API offline, persisting to local storage', err);
    }

    // Store in localStorage for reference
    try {
      const history = JSON.parse(localStorage.getItem('kinglift_rfq_history') || '[]');
      history.unshift(submission);
      localStorage.setItem('kinglift_rfq_history', JSON.stringify(history.slice(0, 20)));
    } catch (e) {
      console.error(e);
    }

    setLastSubmission(submission);
    clearCart();
    closeCart();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#D97706', '#FFFFFF', '#3B82F6']
      });
    } catch {
      // ignore
    }

    return submission;
  };

  const clearLastSubmission = () => setLastSubmission(null);

  return (
    <QuoteCartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalEstimatedMSRP,
        totalItemCount,
        submitRFQ,
        lastSubmission,
        clearLastSubmission
      }}
    >
      {children}
    </QuoteCartContext.Provider>
  );
};

export const useQuoteCart = () => {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error('useQuoteCart must be used within a QuoteCartProvider');
  }
  return context;
};
