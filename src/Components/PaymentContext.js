import React, { createContext, useState, useContext } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [transactionId, setTransactionId] = useState('');
  const [status, setStatus] = useState('');

  return (
    <PaymentContext.Provider value={{ transactionId, setTransactionId, status, setStatus }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => useContext(PaymentContext);
