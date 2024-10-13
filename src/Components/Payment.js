import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import './Payment.css'; 
import Phonepe from '../Images/Phonepe.png';
import Gpay from '../Images/Gpay.jpg';
import Paytm from '../Images/Paytm.jpg';
import Bhim from '../Images/Bhim.jpg';
import { usePaymentContext } from './PaymentContext';

const Payment = () => {
  const location = useLocation();
  const { totalAmount = 0 } = location.state || {}; 
  const { setTransactionId } = usePaymentContext();

  
  const amount = typeof totalAmount === 'number' ? totalAmount : parseFloat(totalAmount) || 0;

  
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transactionId, setLocalTransactionId] = useState(null);

  
  const generateTransactionId = useCallback(() => {
    const newTransactionId = `KLN${Math.floor(1000000 + Math.random() * 9000000)}`;
    setTransactionId(newTransactionId);
    setLocalTransactionId(newTransactionId);
    return newTransactionId;
  }, [setTransactionId]);

  const processPayment = useCallback(async (app) => {
    const newTransactionId = generateTransactionId();
    const paymentData = {
      transactionId: newTransactionId,
      totalAmount: amount,
      status: 'Pending',
    };

    try {
      const response = await fetch('http://localhost:8080/payments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate payment: ' + response.statusText);
      }

      console.log('Payment request sent successfully:', await response.json());
      setPaymentProcessed(true);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment: ' + error.message);
    }
  }, [generateTransactionId, amount]);

  
  useEffect(() => {
    let interval;
    if (paymentProcessed && transactionId) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`http://localhost:8080/payments/transaction/${transactionId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch payment status');
          }
          const data = await response.json();
          setPaymentStatus(data.status);
          if (data.status !== 'Pending') {
            clearInterval(interval); 
          }
        } catch (error) {
          console.error('Error fetching payment status:', error);
        }
      }, 3000); 

      return () => clearInterval(interval);
    }
  }, [paymentProcessed, transactionId]);

  return (
    <div className="payment-container">
      
      <p>Total Amount: ₹{amount.toFixed(2)}</p> 

      {!paymentProcessed && !paymentStatus && (
        <>
          <h3>Select Payment Method</h3>
          <div className="upi-options">
            <div className="payment-option">
              <img src={Phonepe} alt="PhonePe" />
              <button onClick={() => processPayment('PhonePe')}>PhonePe</button>
            </div>
            <div className="payment-option">
              <img src={Gpay} alt="GPay" />
              <button onClick={() => processPayment('GPay')}>GPay</button>
            </div>
            <div className="payment-option">
              <img src={Paytm} alt="Paytm" />
              <button onClick={() => processPayment('Paytm')}>Paytm</button>
            </div>
            <div className="payment-option">
              <img src={Bhim} alt="BHIM" />
              <button onClick={() => processPayment('BHIM')}>BHIM</button>
            </div>
          </div>
        </>
      )}

      {paymentProcessed && (
        <div className="qr-code">
          <h3>Scan the QR Code to Pay</h3>
          <QRCodeSVG 
            value={`upi://pay?pa=prabhudasparusu@ybl&pn=KLNFoodCourt&mc=1234&tid=${transactionId}&amount=${amount}&tn=Payment for Order`} 
          />
        </div>
      )}

      {paymentStatus && (
        <div className="payment-status">
          <h3>Payment Status: {paymentStatus}</h3>
        </div>
      )}
    </div>
  );
};

export default Payment;
