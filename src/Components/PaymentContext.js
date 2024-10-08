import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [transactionId, setTransactionId] = useState(null); // Store transaction ID

  return (
    <PaymentContext.Provider value={{ payments, setPayments, transactionId, setTransactionId }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => useContext(PaymentContext);
