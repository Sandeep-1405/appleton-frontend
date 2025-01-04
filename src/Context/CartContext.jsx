import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart,setCart] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);

    const addToCart = (product, quantity) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item._id === product._id);

            if (existingProductIndex !== -1) {
                console.log("Product already in cart. Updating quantity...");
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += quantity;
                console.log("Updated Cart:", updatedCart);
                return updatedCart;
            } else {
                console.log("Adding new product to cart:", product);
                const newCart = [...prevCart, { ...product, quantity }];
                console.log("New Cart:", newCart);
                return newCart;
            }
        });
    };

      
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart,addToCart, removeFromCart, updateQuantity, clearCart,totalPrice,setTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
