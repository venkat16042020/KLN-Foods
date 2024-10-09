// import React, { createContext, useContext, useState } from 'react';

// const PaymentContext = createContext();

// export const PaymentProvider = ({ children }) => {
//   const [payments, setPayments] = useState([]);
//   const [transactionId, setTransactionId] = useState(null); // Store transaction ID

//   return (
//     <PaymentContext.Provider value={{ payments, setPayments, transactionId, setTransactionId }}>
//       {children}
//     </PaymentContext.Provider>
//   );
// };

// export const usePaymentContext = () => useContext(PaymentContext);


// PaymentContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the Payment Context
const PaymentContext = createContext();

// Create a custom hook to use the Payment Context
export const usePaymentContext = () => {
  return useContext(PaymentContext);
};

// Create a provider component
export const PaymentProvider = ({ children }) => {
  const [transactionId, setTransactionId] = useState(null);

  return (
    <PaymentContext.Provider value={{ transactionId, setTransactionId }}>
      {children}
    </PaymentContext.Provider>
  );
};
