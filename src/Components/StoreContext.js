// // StoreContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const StoreContext = createContext();

// export const StoreProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState({});
//   const [foodList, setFoodList] = useState({});
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFoodList = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/foods/all');
//         const foods = response.data.reduce((acc, item) => {
//           acc[item.itemId] = item;
//           return acc;
//         }, {});
//         setFoodList(foods);
//       } catch (error) {
//         console.error('Error fetching food list:', error);
//         setError('Error fetching food list. Please try again later.');
//       }
//     };

//     fetchFoodList();
//   }, []);

//   const addToCart = (itemId, quantity) => {
//     setCartItems((prevCartItems) => ({
//       ...prevCartItems,
//       [itemId]: (prevCartItems[itemId] || 0) + quantity,
//     }));
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prevCartItems) => {
//       const newCartItems = { ...prevCartItems };
//       delete newCartItems[itemId];
//       return newCartItems;
//     });
//   };

//   const getCartItems = () => {
//     return Object.keys(cartItems).map((itemId) => ({
//       ...foodList[itemId],
//       quantity: cartItems[itemId],
//     }));
//   };

//   const getTotalCartAmount = () => {
//     return getCartItems().reduce((total, item) => total + (item.priceWithGST * item.quantity), 0);
//   };

//   const placeOrder = async (orderData) => {
//     try {
//       await axios.post('http://localhost:8080/api/orders/place', orderData);
//       console.log('Order placed successfully');
//       setCartItems({});
//     } catch (error) {
//       console.error('Error placing order:', error);
//       setError('Error placing order. Please try again later.');
//     }
//   };

//   return (
//     <StoreContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartItems, getTotalCartAmount, placeOrder, error }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export const useStore = () => useContext(StoreContext);


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
