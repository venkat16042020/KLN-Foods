// import React, { useState, useEffect, useMemo } from 'react';
// import { useCart } from './CartContext';
// import { useNavigate } from 'react-router-dom';
// import './CartDetails.css';

// const CartDetails = () => {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const { getCartItems, updateItemQuantity } = useCart();

//   const [houseNumber, setHouseNumber] = useState('');
//   const [landMark, setLandMark] = useState('');
//   const [street, setStreet] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [zipCode, setZipCode] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const cartItems = getCartItems();
//     setItems(cartItems);
//     const savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
//     if (savedAddress) {
//       setHouseNumber(savedAddress.houseNumber);
//       setLandMark(savedAddress.landMark);
//       setStreet(savedAddress.street);
//       setCity(savedAddress.city);
//       setState(savedAddress.state);
//       setZipCode(savedAddress.zipCode);
//       setPhoneNumber(savedAddress.phoneNumber);
//     }
//   }, [getCartItems]);

//   const { totalPrice, totalGST } = useMemo(() => {
//     let totalPrice = 0;
//     let totalGST = 0;
//     items.forEach(item => {
//       const price = parseFloat(item.price) || 0;
//       const quantity = parseInt(item.quantity, 10) || 0;
//       const gst = parseFloat(item.totalGST) || 0;
//       totalPrice += price * quantity;
//       totalGST += gst * quantity;
//     });
//     return { totalPrice, totalGST };
//   }, [items]);

//   const totalAmount = (totalPrice + totalGST).toFixed(2);

//   const handleQuantityChange = (id, change) => {
//     const updatedItems = items.map(item =>
//       item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
//     );
//     setItems(updatedItems);
//     const updatedItem = updatedItems.find(item => item.id === id);
//     updateItemQuantity(id, updatedItem ? updatedItem.quantity : 0);
//   };

//   const handlePlaceOrder = async () => {
//     if (!houseNumber || !street || !city || !state || !zipCode || !phoneNumber) {
//       alert('Please fill in all address fields.');
//       return;
//     }

//     const orderData = {
//       totalAmount: totalAmount * 100,
//       items: items,
//       address: {
//         houseNumber,
//         landMark,
//         street,
//         city,
//         state,
//         zipCode,
//         phoneNumber,
//       },
//     };

//     try {
//       const response = await fetch('http://localhost:8080/api/createOrder', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       });

//       const data = await response.json();
//       if (data.orderId) {
//         const options = {
//           key: 'rzp_test_HGl3PTqZYOKXbN',
//           amount: totalAmount * 100,
//           currency: 'INR',
//           name: 'KLN Food Court',
//           description: 'Order Payment',
//           order_id: data.orderId,
//           handler: function (response) {
//             alert('Payment Successful!');
//           },
//           prefill: {
//             name: 'Customer Name',
//             email: 'customer@example.com',
//             contact: phoneNumber,
//           },
//           notes: {
//             address: `${houseNumber}, ${landMark}, ${street}, ${city}, ${state}, ${zipCode}`,
//           },
//           theme: {
//             color: '#F37254',
//           },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//       } else {
//         alert('Failed to create order. Please try again.');
//       }
//     } catch (error) {
//       alert('Error occurred during the payment process.');
//       console.error(error);
//     }
//   };

//   const handleSaveAddress = () => {
//     const address = {
//       houseNumber,
//       landMark,
//       street,
//       city,
//       state,
//       zipCode,
//       phoneNumber,
//     };
//     localStorage.setItem('savedAddress', JSON.stringify(address));
//     setIsEditing(false);
//     alert('Address saved successfully!');
//   };

//   return (
//     <div className="cart-details-container">
//       <div className="cart-details">
//         <table className="cart-table">
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>GST</th>
//               <th>Quantity</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length > 0 ? (
//               items.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{index + 1}</td>
//                   <td>{item.id}</td>
//                   <td>{item.name}</td>
//                   <td>₹{parseFloat(item.price).toFixed(2)}</td>
//                   <td>₹{parseFloat(item.totalGST).toFixed(2)}</td>
//                   <td>{item.quantity}</td>
//                   <td>
//                     <button onClick={() => handleQuantityChange(item.id, -1)} style={{ marginRight: '10px' }}>-</button>
//                     <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">
//                   <span 
//                     style={{ color: 'blue', cursor: 'pointer' }} 
//                     onClick={() => navigate('/home')}
//                   >
//                     Visited the Restaurant
//                   </span>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <div className="cart-summary">
//           <p>Total Price: ₹{parseFloat(totalPrice).toFixed(2)}</p>
//           <p>Total GST: ₹{parseFloat(totalGST).toFixed(2)}</p>
//           <p>Total Amount: ₹{totalAmount}</p>
//         </div>
//       </div>

//       <div className="address-form" style={{ marginTop: '20px' }}>
//         <h2>Address Details</h2>
//         <form>
//           <input
//             type="text"
//             placeholder="House Number"
//             value={houseNumber}
//             onChange={(e) => setHouseNumber(e.target.value)}
//             disabled={!isEditing}
//           />
//           <input
//             type="text"
//             placeholder="Landmark"
//             value={landMark}
//             onChange={(e) => setLandMark(e.target.value)}
//             disabled={!isEditing}
//           />
//           <input
//             type="text"
//             placeholder="Street"
//             value={street}
//             onChange={(e) => setStreet(e.target.value)}
//             disabled={!isEditing}
//           />
//           <input
//             type="text"
//             placeholder="City"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             disabled={!isEditing}
//           />
//           <input
//             type="text"
//             placeholder="State"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             disabled={!isEditing}
//           />
//           <input
//             type="text"
//             placeholder="Zip Code"
//             value={zipCode}
//             onChange={(e) => setZipCode(e.target.value)}
//             disabled={!isEditing}
//           />
//           <input
//             type="text"
//             placeholder="Phone"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             disabled={!isEditing}
//           />
//         </form>
//         <button 
//           onClick={isEditing ? handleSaveAddress : () => setIsEditing(true)} 
//           style={{ marginTop: '10px' }}
//         >
//           {isEditing ? 'Save' : 'Edit'}
//         </button>
//       </div>

//       <div className="place-order-container" style={{ marginTop: '20px', textAlign: 'right' }}>
//         <button type="button" onClick={handlePlaceOrder} style={{ width: '100%' }}>
//           Process to Pay
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartDetails;


import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from './CartContext'; // Adjust the import path according to your structure
import { useNavigate } from 'react-router-dom';
import './CartDetails.css';

const CartDetails = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { getCartItems, updateItemQuantity } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewAddressFields, setShowNewAddressFields] = useState(false); // State to toggle new address fields
  const [newAddress, setNewAddress] = useState({
    houseNumber: '',
    landMark: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
  });

  // Fetch cart items and saved addresses
  useEffect(() => {
    const cartItems = getCartItems();
    setItems(cartItems);
    const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];
    setAddresses(savedAddresses);
  }, [getCartItems]);

  // Calculate total price and total GST
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

  // Handle quantity changes
  const handleQuantityChange = (id, change) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    );
    setItems(updatedItems);
    const updatedItem = updatedItems.find(item => item.id === id);
    updateItemQuantity(id, updatedItem ? updatedItem.quantity : 0);
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert('Please select an address.');
      return;
    }

    // Log values to debug
    console.log('Total Price:', totalPrice);
    console.log('Total GST:', totalGST);
    console.log('Total Amount:', totalAmount);

    // Pass totalAmount to Payment component
    navigate('/payment', { state: { items, address: selectedAddress, totalAmount } });
  };

  // Handle address saving
  const handleSaveAddress = () => {
    const updatedAddresses = isEditing
      ? addresses.map(addr => (addr.phoneNumber === newAddress.phoneNumber ? newAddress : addr))
      : [...addresses, newAddress];

    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
    alert(`${isEditing ? 'Address updated' : 'Address saved'} successfully!`);

    // Reset newAddress and exit editing mode
    setNewAddress({
      houseNumber: '',
      landMark: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
    });
    setIsEditing(false);
    setShowNewAddressFields(false); // Hide new address fields
  };

  // Handle address deletion
  const handleDeleteAddress = (phoneNumber) => {
    const updatedAddresses = addresses.filter(addr => addr.phoneNumber !== phoneNumber);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses);
    alert('Address deleted successfully!');
  };

  // Handle address selection
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="cart-details-container">
      <div className="cart-details">
        <h2>Cart Items</h2>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.name}</p>
              <p>₹{parseFloat(item.price).toFixed(2)}</p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span className="quantity-display">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
        <div className="cart-summary">
          <p>Total Price: ₹{parseFloat(totalPrice).toFixed(2)}</p>
          <p>Total GST: ₹{parseFloat(totalGST).toFixed(2)}</p>
          <p>Total Amount: ₹{totalAmount}</p>
        </div>
      </div>

      <div className="address-details">
        <h2>Address Details</h2>
        <div className="address-list">
          {addresses.map((address, index) => (
            <div key={index} className="address-item">
              <p>
                {address.houseNumber}, {address.landMark}, {address.street}, {address.city}, {address.state}, {address.zipCode}, {address.phoneNumber}
              </p>
              <button onClick={() => handleSelectAddress(address)}>
                {selectedAddress === address ? 'Selected' : 'Select'}
              </button>
              <button onClick={() => {
                setNewAddress(address);
                setIsEditing(true);
              }}>Edit</button>
              <button onClick={() => handleDeleteAddress(address.phoneNumber)}>Delete</button>
            </div>
          ))}
        </div>

        {showNewAddressFields && (
          <form className="new-address-form">
            {Object.keys(newAddress).map((key, index) => (
              <div key={key} className="input-group">
                <input
                  type="text"
                  placeholder={key.replace(/([A-Z])/g, ' ')}
                  value={newAddress[key]}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, [key]: e.target.value }))}
                />
              </div>
            ))}
          </form>
        )}
        
        <button onClick={() => setShowNewAddressFields(prev => !prev)}>
          {showNewAddressFields ? 'Cancel' : 'Add New Address'}
        </button>
        
        {showNewAddressFields && (
          <button onClick={handleSaveAddress}>
            Save Address
          </button>
        )}

        <div className="place-order-container">
          <button type="button" onClick={handlePlaceOrder}>
            Process to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;





