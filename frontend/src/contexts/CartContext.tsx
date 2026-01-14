
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse stored cart", error);
      }
    }
  }, []);
  
  // Update cart count whenever items change
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    
    setShowNotification(true);
    toast.success(`${item.name} added to cart`);
    
    // Hide notification after 2 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast("Item removed from cart");
  };

  // Update quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        showNotification,
        setShowNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
