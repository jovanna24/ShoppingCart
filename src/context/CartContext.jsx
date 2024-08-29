import React, { createContext, useState, useEffect } from 'react';

const getInitialCart = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
}

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart()); 

  useEffect(() => { 
    localStorage.setItem('cart', JSON.stringify(cart))
  })

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingProduct = prevCart.find(item => item.itemNumber === product.itemNumber);
      if (existingProduct) {
        // If it exists, increase the quantity (or simply return the cart as is)
        return prevCart.map(item => 
          item.itemNumber === product.itemNumber 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
        );
      } else {
        // If it does not exist, add it to the cart with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter(item => item.itemNumber !== product.itemNumber));
  };

  const updateQuantity = (product, quantity) => {
    setCart((prevCart) => 
      prevCart.map(item => 
        item.itemNumber === product.itemNumber
        ? { ...item, quantity }
        : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
