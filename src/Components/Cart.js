import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState({});
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { addItemToCart, getCartItems } = useCart(); 

  useEffect(() => {
    
    axios.get('http://localhost:8080/foods/all')
      .then(response => {
        const filteredItems = response.data.filter(item => item.categoryName === category);
        setItems(filteredItems);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, [category]);

 
  useEffect(() => {
    const cartItems = getCartItems();  
    console.log('Current items in cart:', cartItems); 
  }, [getCartItems]);

  const handleIncrease = (itemId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      newCart[itemId] = (newCart[itemId] || 0) + 1;
      return newCart;
    });
  };

  const handleDecrease = (itemId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId]; 
      }
      return newCart;
    });
  };

  const handleAddToCart = (item) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (!newCart[item.id]) {
        newCart[item.id] = 1; 
      }
      return newCart;
    });
    addItemToCart(item, 1); 
  };

  return (
    <div>
      <h2>Items in {category}</h2>
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="item-image" />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>GST: ₹{item.totalGST}</p>
              {cart[item.id] ? (
                <div className="quantity-controls">
                  <button onClick={() => handleDecrease(item.id)}>-</button>
                  <span>{cart[item.id]}</span>
                  <button onClick={() => handleIncrease(item.id)}>+</button>
                </div>
              ) : (
                <button onClick={() => handleAddToCart(item)} className="add-to-cart">
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;



