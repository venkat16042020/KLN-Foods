// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { QRCodeSVG } from 'qrcode.react';
// import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique transactionId
// import './Payment.css';
// import CreditCart from '../Images/CreditCart.jpg';
// import UPI from '../Images/UPI.png';
// import Phonepe from '../Images/Phonepe.png';
// import Gpay from '../Images/Gpay.jpg';
// import Paytm from '../Images/Paytm.jpg';
// import Bhim from '../Images/Bhim.jpg';

// const Payment = () => {
//   const location = useLocation();
//   const { totalAmount } = location.state;

//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [upiApp, setUpiApp] = useState('');
//   const [paymentStatus, setPaymentStatus] = useState(null); // To store payment status
//   const [qrExpired, setQrExpired] = useState(false); // To track QR code expiration

//   useEffect(() => {
//     let timer;
//     if (upiApp) {
//       // Set a timer for 10 minutes (600000 milliseconds)
//       timer = setTimeout(() => {
//         setQrExpired(true);
//       }, 600000);
//     }

//     return () => {
//       clearTimeout(timer); // Clear timer on unmount or when upiApp changes
//     };
//   }, [upiApp]);

//   const processPayment = () => {
//     // Generate a unique transactionId using uuid
//     const transactionId = uuidv4(); // Generates a unique ID

//     const paymentData = {
//       transactionId: transactionId, // Dynamic unique transactionId
//       totalAmount: totalAmount,
//       paymentType: 'upi', // Assuming UPI is the selected payment method
//       orderStatus: "Pending"
//     };


//     fetch('http://localhost:8080/api/payment/process', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(paymentData),
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Check if the payment is successful or failed based on response
//         if (data.status === 'success') {
//           setPaymentStatus('success');
//         } else {
//           setPaymentStatus('failed');
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setPaymentStatus('failed');
//       });
//   };

//   // Call processPayment when the QR code is generated
//   useEffect(() => {
//     if (upiApp && !qrExpired) {
//       processPayment();
//     }
//   }, [upiApp, qrExpired]); // eslint-disable-next-line react-hooks/exhaustive-deps

//   return (
//     <div className="payment-container">
//       {/* Payment methods */}
//       {!paymentMethod && (
//         <div className="payment-options">
//           <div className="payment-option">
//             <img src={CreditCart} alt="Credit/Debit Card" />
//             <button onClick={() => setPaymentMethod('card')}>Credit/Debit Card</button>
//           </div>
//           <div className="payment-option">
//             <img src={UPI} alt="UPI" />
//             <button onClick={() => setPaymentMethod('upi')}>UPI</button>
//           </div>
//           <div className="payment-option">
//             <button onClick={() => setPaymentMethod('bankTransfer')}>Bank Transfer</button>
//           </div>
//         </div>
//       )}

//       {/* UPI options */}
//       {paymentMethod === 'upi' && !upiApp && (
//         <div className="upi-options">
//           <div className="payment-option">
//             <img src={Phonepe} alt="PhonePe" />
//             <button onClick={() => setUpiApp('PhonePe')}>PhonePe</button>
//           </div>
//           <div className="payment-option">
//             <img src={Gpay} alt="GPay" />
//             <button onClick={() => setUpiApp('GPay')}>GPay</button>
//           </div>
//           <div className="payment-option">
//             <img src={Paytm} alt="Paytm" />
//             <button onClick={() => setUpiApp('Paytm')}>Paytm</button>
//           </div>
//           <div className="payment-option">
//             <img src={Bhim} alt="BHIM" />
//             <button onClick={() => setUpiApp('BHIM')}>BHIM</button>
//           </div>
//         </div>
//       )}

//       {/* Show QR code for UPI */}
//       {upiApp && !qrExpired && (
//         <div className="qr-code">
//           <QRCodeSVG 
//             value={`upi://pay?pa=prabhudasparusu@ybl&pn=KLN Food Court&mc=1234&tid=202409251234&tr=${uuidv4()}&am=${totalAmount}&cu=INR&url=https://yourwebsite.com`} 
//           />
//           <p>UPI ID: prabhudasparusu@ybl</p>
//           <p>Please scan the QR code to make your payment.</p>
//         </div>
//       )}

//       {/* Show expired message if QR code is expired */}
//       {qrExpired && (
//         <p style={{ color: 'red' }}>The QR code has expired. Please refresh to get a new QR code.</p>
//       )}

//       {/* Display payment success or failure */}
//       {paymentStatus === 'success' && <p style={{ color: 'green' }}>Payment Successful!</p>}
//       {paymentStatus === 'failed' && <p style={{ color: 'red' }}>Payment Failed. Please try again.</p>}
//     </div>
//   );
// };

// export default Payment;
