import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDetails.css';

const CartDetails = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { getCartItems, updateItemQuantity } = useCart();

  const [houseNumber, setHouseNumber] = useState('');
  const [landMark, setLandMark] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const cartItems = getCartItems();
    setItems(cartItems);
  }, [getCartItems]);

  const { totalPrice, totalGST } = useMemo(() => {
    let totalPrice = 0;
    let totalGST = 0;

    items.forEach(item => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      const gst = parseFloat(item.totalGST) || 0;

      totalPrice += price * quantity;
      totalGST += gst * quantity;
    });

    return { totalPrice, totalGST };
  }, [items]);

  const totalAmount = (totalPrice + totalGST).toFixed(2);

  const handleQuantityChange = (id, change) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    setItems(updatedItems);
    updateItemQuantity(id, updatedItems.find(item => item.id === id).quantity);
  };

  const handlePlaceOrder = async () => {
    if (!houseNumber || !street || !city || !state || !zipCode || !phoneNumber) {
      alert('Please fill in all address fields.');
      return;
    }

    const orderData = {
      totalAmount,
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        totalGST: item.totalGST,
        quantity: item.quantity,
      })),
      address: {
        houseNumber,
        landMark,
        street,
        city,
        state,
        zipCode,
        phoneNumber,
      },
    };

    try {
      const response = await fetch('http://localhost:8080/api/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        navigate('/feedback');
      } else {
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>₹{parseFloat(item.price).toFixed(2)}</td>
                  <td>₹{parseFloat(item.totalGST).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No items in the cart.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="cart-summary">
          <p>Total Price: ₹{parseFloat(totalPrice).toFixed(2)}</p>
          <p>Total GST: ₹{parseFloat(totalGST).toFixed(2)}</p>
          <p>Total Amount: ₹{totalAmount}</p>
        </div>
      </div>

      <div className="address-form">
        <h2>Address Details</h2>
        <form>
          <input
            type="text"
            placeholder="House Number"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Landmark"
            value={landMark}
            onChange={(e) => setLandMark(e.target.value)}
          />
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </form>
      </div>

      <div className="place-order-container">
        <button type="button" onClick={handlePlaceOrder}>
          Process to Pay
        </button>
      </div>
    </div>
  );
};

export default CartDetails;
