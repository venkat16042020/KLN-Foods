// import React, { useState, useEffect, useCallback } from 'react';
// import { useLocation } from 'react-router-dom';
// import { QRCodeSVG } from 'qrcode.react';
// import './Payment.css';
// import Phonepe from '../Images/Phonepe.png';
// import Gpay from '../Images/Gpay.jpg';
// import Paytm from '../Images/Paytm.jpg';
// import Bhim from '../Images/Bhim.jpg';
// import { usePaymentContext } from './PaymentContext';

// const Payment = () => {
//   const location = useLocation();
//   const { totalAmount = 0 } = location.state || {}; // Ensure totalAmount is not undefined
//   const { setTransactionId } = usePaymentContext();
//   const [upiApp, setUpiApp] = useState(''); // Track selected UPI app
//   const [paymentProcessed, setPaymentProcessed] = useState(false); // Payment processing flag
//   const [paymentStatus, setPaymentStatus] = useState(null); // Payment status ('Pending', 'Success', 'Failed')
//   const [transactionId, setLocalTransactionId] = useState(null); // Local transaction ID

//   // Generate a transaction ID
//   const generateTransactionId = useCallback(() => {
//     const newTransactionId = `KLN${Math.floor(1000000 + Math.random() * 9000000)}`;
//     setTransactionId(newTransactionId); // Update transaction ID in context
//     setLocalTransactionId(newTransactionId); // Store locally
//     return newTransactionId;
//   }, [setTransactionId]);

//   // Process the payment and save the data to the backend
//   const processPayment = useCallback(async (app) => {
//     const newTransactionId = generateTransactionId(); // Generate a new transaction ID

//     const paymentData = {
//       transactionId: newTransactionId,
//       totalAmount,
//       paymentType: 'upi',
//       status: 'Pending',
//     };

//     try {
//       const response = await fetch('http://localhost:8080/payments/add', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(paymentData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to initiate payment: ' + response.statusText);
//       }

//       console.log('Payment request sent successfully:', await response.json());
//       setUpiApp(app); // Set selected UPI app
//       setPaymentProcessed(true); // Mark payment as initiated
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       alert('Error processing payment: ' + error.message); // Alert the user
//     }
//   }, [generateTransactionId, totalAmount]);

//   // Poll for payment status using the generated transaction ID
//   useEffect(() => {
//     let interval;
//     if (paymentProcessed && transactionId) {
//       interval = setInterval(async () => {
//         try {
//           const response = await fetch(`http://localhost:8080/payments/${transactionId}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch payment status');
//           }
//           const data = await response.json();
//           setPaymentStatus(data.status); // Update payment status from admin
//           if (data.status !== 'Pending') {
//             clearInterval(interval); // Stop polling once status is either 'Success' or 'Failed'
//           }
//         } catch (error) {
//           console.error('Error fetching payment status:', error);
//         }
//       }, 3000); // Poll every 3 seconds

//       return () => clearInterval(interval); // Clear interval on component unmount
//     }
//   }, [paymentProcessed, transactionId]);

//   return (
//     <div className="payment-container">
//       <h2>Payment Page</h2>
//       <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>

//       {/* Display payment options and QR code only if payment status is Pending */}
//       {!paymentProcessed && !paymentStatus && (
//         <>
//           <h3>Select Payment Method</h3>
//           <div className="upi-options">
//             <div className="payment-option">
//               <img src={Phonepe} alt="PhonePe" />
//               <button onClick={() => processPayment('PhonePe')}>PhonePe</button>
//             </div>
//             <div className="payment-option">
//               <img src={Gpay} alt="GPay" />
//               <button onClick={() => processPayment('GPay')}>GPay</button>
//             </div>
//             <div className="payment-option">
//               <img src={Paytm} alt="Paytm" />
//               <button onClick={() => processPayment('Paytm')}>Paytm</button>
//             </div>
//             <div className="payment-option">
//               <img src={Bhim} alt="BHIM" />
//               <button onClick={() => processPayment('BHIM')}>BHIM</button>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Show QR code only if payment is initiated */}
//       {upiApp && paymentProcessed && !paymentStatus && (
//         <div className="qr-code">
//           <h3>Scan to Pay with {upiApp}</h3>
//           <QRCodeSVG value={`upi://pay?pa=merchantUPI@bank&pn=MerchantName&am=${totalAmount}&cu=INR`} />
//         </div>
//       )}

//       {/* Show payment status after admin updates */}
//       {paymentStatus && (
//         <div className="payment-status">
//           <h3>Payment Status</h3>
//           {paymentStatus === 'Success' ? (
//             <p>Payment Successful! Transaction ID: {transactionId}</p>
//           ) : paymentStatus === 'Failed' ? (
//             <p>Payment Failed! Please try again. Transaction ID: {transactionId}</p>
//           ) : (
//             <p>Waiting for admin confirmation...</p>
//           )}
//         </div>
//       )}

//       {/* Show waiting for confirmation if status is not updated yet */}
//       {paymentProcessed && !paymentStatus && (
//         <div className="latest-payment">
//           <h3>Waiting for payment confirmation...</h3>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;


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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const cartItems = getCartItems();
    setItems(cartItems);

    const savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
    if (savedAddress) {
      setHouseNumber(savedAddress.houseNumber);
      setLandMark(savedAddress.landMark);
      setStreet(savedAddress.street);
      setCity(savedAddress.city);
      setState(savedAddress.state);
      setZipCode(savedAddress.zipCode);
      setPhoneNumber(savedAddress.phoneNumber);
    }
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
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    );
    setItems(updatedItems);
    const updatedItem = updatedItems.find(item => item.id === id);
    updateItemQuantity(id, updatedItem ? updatedItem.quantity : 0);
  };

  const handlePlaceOrder = async () => {
    if (!houseNumber || !street || !city || !state || !zipCode || !phoneNumber) {
      alert('Please fill in all address fields.');
      return;
    }

    const orderData = {
      totalAmount: totalAmount * 100,
      items: items,
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

      const data = await response.json();
      if (data.message === 'Order placed successfully.') {
        alert('Order placed successfully!');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      alert('Error occurred during the order process.');
      console.error(error);
    }
  };

  const handleSaveAddress = () => {
    const address = {
      houseNumber,
      landMark,
      street,
      city,
      state,
      zipCode,
      phoneNumber,
    };
    localStorage.setItem('savedAddress', JSON.stringify(address));
    setIsEditing(false);
    alert('Address saved successfully!');
  };

  return (
    <div className="cart-details-container">
      <div className="cart-details">
        <table className="cart-table">
          <thead>
            <tr>
              <th>S.No</th>
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
              items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>₹{parseFloat(item.price).toFixed(2)}</td>
                  <td>₹{parseFloat(item.totalGST).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => handleQuantityChange(item.id, -1)} style={{ marginRight: '10px' }}>-</button>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <span 
                    style={{ color: 'blue', cursor: 'pointer' }} 
                    onClick={() => navigate('/home')}
                  >
                    Visited the Restaurant
                  </span>
                </td>
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

      <div className="address-form" style={{ marginTop: '20px' }}>
        <h2>Address Details</h2>
        <form>
          <input type="text" placeholder="House Number" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} disabled={!isEditing} />
          <input type="text" placeholder="Landmark" value={landMark} onChange={(e) => setLandMark(e.target.value)} disabled={!isEditing} />
          <input type="text" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} disabled={!isEditing} />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} disabled={!isEditing} />
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} disabled={!isEditing} />
          <input type="text" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} disabled={!isEditing} />
          <input type="text" placeholder="Phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={!isEditing} />
        </form>
        <button onClick={isEditing ? handleSaveAddress : () => setIsEditing(true)} style={{ marginTop: '10px' }}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="place-order-container" style={{ marginTop: '20px', textAlign: 'right' }}>
        <button type="button" onClick={handlePlaceOrder} style={{ width: '100%' }}>
          Process to Pay
        </button>
      </div>
    </div>
  );
};

export default CartDetails;
