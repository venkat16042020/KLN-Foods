import React, { createContext, useContext, useState } from 'react';


const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId, quantity) => {
    setCartItems((prevCartItems) => {
      const item = prevCartItems[itemId];
      if (item) {
        return {
          ...prevCartItems,
          [itemId]: {
            ...item,
            quantity: item.quantity + quantity,
          },
        };
      } else {
       
        return {
          ...prevCartItems,
          [itemId]: {
            
            name: 'Item Name', 
            priceWithGST: 100, 
            quantity: quantity,
          },
        };
      }
    });
  };

 
  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      delete updatedCartItems[itemId];
      return updatedCartItems;
    });
  };

  
  const clearCart = () => {
    setCartItems({});
  };

  return (
    <StoreContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
};


export const useStore = () => useContext(StoreContext);
