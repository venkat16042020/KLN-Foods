import React, { useEffect } from 'react';
import { usePaymentContext } from './PaymentContext'; 

const Dashboard = () => {
  const { transactionId, status } = usePaymentContext();

  useEffect(() => {
  
    console.log(`Current Transaction ID: ${transactionId}`);
    console.log(`Current Status: ${status}`);

   
  }, [transactionId, status]);

 
  const getQuote = (status) => {
    switch (status) {
      case 'Success':
        return "Thank You for Visiting. Enjoy your food!";
      case 'Failed':
        return "Payment failed. Please try again; delicious food is waiting for you!";
      default:
        return "";
    }
  };

  return (
    <div>
      
      <div className="dashboard-info">
        <h3>Payment Information</h3>
        {transactionId ? (
          <p>
            <strong>Transaction ID:</strong> {transactionId}
          </p>
        ) : (
          <p>No transaction ID available.</p>
        )}
        {status ? (
          <p>
            <strong>Status:</strong> {status}
          </p>
        ) : (
          <p>No status available.</p>
        )}
      </div>

     
      <div className="dashboard-quote">
        {getQuote(status) && (
          <p className="quote-message">{getQuote(status)}</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
