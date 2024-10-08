import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDetails.css';

const CartDetails = () => {
    const [items, setItems] = useState([]);
    const { getCartItems, updateItemQuantity } = useCart();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [newAddress, setNewAddress] = useState({
        houseNumber: '',
        landMark: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const cartItems = getCartItems();
        setItems(cartItems);
        const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];
        setAddresses(savedAddresses);
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

    // Calculate total amount for display
    const totalAmountDisplay = (totalPrice + totalGST).toFixed(2); // This is for display

    // Calculate total amount for backend (in cents)
    const totalAmountBackend = (totalPrice + totalGST) * 100; // This is for backend

    const handleQuantityChange = (id, change) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        );
        setItems(updatedItems);
        const updatedItem = updatedItems.find(item => item.id === id);
        updateItemQuantity(id, updatedItem ? updatedItem.quantity : 0);
    };

    const handlePlaceOrder = async () => {
        const selectedAddress = selectedAddressIndex !== null ? addresses[selectedAddressIndex] : null;
        if (!selectedAddress) {
            alert('Please select an address.');
            return;
        }

        const orderData = {
            totalAmount: totalAmountBackend, // Total amount in cents
            items: items.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                totalGST: item.totalGST,
            })),
            address: selectedAddress,
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
                const data = await response.json(); // Use the data variable
                alert(`Order placed successfully! Order ID: ${data.orderId}`);
                navigate('/payment', { state: { orderData } });
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            alert('Failed to place order due to an error. Please try again.');
        }
    };

    const handleAddAddress = () => {
        const updatedAddresses = [...addresses, newAddress];
        setAddresses(updatedAddresses);
        localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
        setNewAddress({
            houseNumber: '',
            landMark: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            phoneNumber: '',
        });
    };

    const handleEditAddress = (index) => {
        setNewAddress(addresses[index]);
        setSelectedAddressIndex(index);
    };

    const handleDeleteAddress = (index) => {
        const updatedAddresses = addresses.filter((_, idx) => idx !== index);
        setAddresses(updatedAddresses);
        localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
        if (selectedAddressIndex === index) {
            setSelectedAddressIndex(null);
        }
    };

    const handleSelectAddress = (index) => {
        setSelectedAddressIndex(index);
    };

    return (
        <div className="cart-details-container">
            <div className="cart-details">
                <h2>Cart Details</h2>
                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        <h3>Items:</h3>
                        <ul>
                            {items.map((item) => (
                                <li key={`cart-item-${item.id}`} className="cart-item">
                                    <span>{item.name}</span>
                                    <span className="price">₹{item.price}</span>
                                    <p>
                                        <span onClick={() => handleQuantityChange(item.id, -1)}>-</span>
                                        {item.quantity}
                                        <span onClick={() => handleQuantityChange(item.id, 1)}>+</span>
                                    </p>
                                    <span className="total-gst">(Total GST: ₹{item.totalGST})</span>
                                </li>
                            ))}
                        </ul>
                        <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                        <p>Total GST: ₹{totalGST.toFixed(2)}</p>
                        <p>Total Amount: ₹{totalAmountDisplay}</p> {/* Display total amount as ₹548.00 */}
                    </div>
                )}
            </div>
            <div className="address-selection">
                <h3>Select Address:</h3>
                <div className="address-grid">
                    {addresses.map((address, index) => (
                        <div key={index} className={`address-item ${selectedAddressIndex === index ? 'selected' : ''}`}>
                            <p>{address.houseNumber}, {address.landMark}, {address.street}, {address.city}, {address.state} - {address.zipCode}</p>
                            <p>Phone: {address.phoneNumber}</p>
                            <div className="address-buttons">
                                <button onClick={() => handleEditAddress(index)}>Edit</button>
                                <button onClick={() => handleDeleteAddress(index)}>Delete</button>
                                <button onClick={() => handleSelectAddress(index)}>Select</button>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedAddressIndex !== null && (
                    <div className="selected-address">
                        <h4>Selected Address:</h4>
                        <p>{addresses[selectedAddressIndex].houseNumber}, {addresses[selectedAddressIndex].landMark}, {addresses[selectedAddressIndex].street}, {addresses[selectedAddressIndex].city}, {addresses[selectedAddressIndex].state} - {addresses[selectedAddressIndex].zipCode}</p>
                        <p>Phone: {addresses[selectedAddressIndex].phoneNumber}</p>
                    </div>
                )}
                <h4>Add New Address:</h4>
                <div className="new-address-form">
                    <input
                        type="text"
                        placeholder="House Number"
                        value={newAddress.houseNumber}
                        onChange={(e) => setNewAddress({ ...newAddress, houseNumber: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Landmark"
                        value={newAddress.landMark}
                        onChange={(e) => setNewAddress({ ...newAddress, landMark: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Street"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Zip Code"
                        value={newAddress.zipCode}
                        onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={newAddress.phoneNumber}
                        onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
                    />
                    <button onClick={handleAddAddress}>Add Address</button>
                </div>
            </div>
            <div className="place-order-button">
                <button onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
    );
};

export default CartDetails;






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
