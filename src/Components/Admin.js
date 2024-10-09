import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css'

const Admin = () => {
  const [payments, setPayments] = useState([]);
  const [transactionId, setTransactionId] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  // Fetch all payments on component mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:8080/payments/all');
        if (!response.ok) throw new Error('Failed to fetch payments');
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error(error);
        alert('Error fetching payments: ' + error.message);
      }
    };
    fetchPayments();
  }, []);

  // Update payment status
  const updatePaymentStatus = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/payments/transaction/${transactionId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update payment status');

      // Navigate to Dashboard component and pass the updated details
      navigate('/dashboard', { state: { transactionId, status } });

    } catch (error) {
      console.error(error);
      alert('Error updating payment status: ' + error.message);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Payment Management</h2>
      <h3>All Payments</h3>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.transactionId}>
                <td>{payment.transactionId}</td>
                <td>{payment.totalAmount}</td>
                <td>{payment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No payments found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Update Payment Status</h3>
      <form onSubmit={updatePaymentStatus}>
        <input
          type="text"
          placeholder="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
        <button type="submit">Update Status</button>
      </form>
    </div>
  );
};

export default Admin;




