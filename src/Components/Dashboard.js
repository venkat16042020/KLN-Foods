 import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { transactionId, status } = location.state || {};

  return (
    <div>
      <h2>Dashboard</h2>
      {transactionId && status ? (
        <div>
          <h3>Last Updated Payment</h3>
          <p>Transaction ID: {transactionId}</p>
          <p>Status: {status}</p>
        </div>
      ) : (
        <p>No recent updates available.</p>
      )}
    </div>
  );
};

export default Dashboard; 