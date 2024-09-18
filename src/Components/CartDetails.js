

import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import './CartDetails.css';

const CartDetails = () => {
  const [items, setItems] = useState([]);
  const { getCartItems } = useCart();

  useEffect(() => {
    
    const cartItems = getCartItems();
    setItems(cartItems);
  }, [getCartItems]);

  const calculateTotal = () => {
    const totalPrice = items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity || 0), 0);
    const totalGST = items.reduce((acc, item) => acc + (parseFloat(item.totalGST) * item.quantity || 0), 0);
    return { totalPrice, totalGST };
  };

  const { totalPrice, totalGST } = calculateTotal();

  return (
    <div className="cart-details-container">
      
      <div className="cart-details">
        <table className="cart-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>GST</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.totalGST}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No items in the cart.</td>
              </tr>
            )}
          </tbody>
        </table>

       
        <div className="cart-summary">
          
          <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
          <p>Total GST: ₹{totalGST.toFixed(2)}</p>
        </div>
      </div>
      <div className="address-form">
        <h2>Address Details</h2>
        <form>
         
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Phone" />

          <div className="place-order-container">
            <button type="button">Place Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartDetails;
