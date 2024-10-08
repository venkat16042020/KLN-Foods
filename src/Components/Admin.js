import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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



// import React, { useState, useEffect } from 'react';

// const Admin = () => {
//   const [payments, setPayments] = useState([]);
//   const [selectedTransactionId, setSelectedTransactionId] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch all payments on component mount
//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/payments/all');
//         if (!response.ok) throw new Error('Failed to fetch payments');
//         const data = await response.json();
//         setPayments(data);
//       } catch (error) {
//         console.error(error);
//         alert('Error fetching payments: ' + error.message);
//       }
//     };
//     fetchPayments();
//   }, []);

//   // Open modal for updating status
//   const handleUpdate = (transactionId) => {
//     setSelectedTransactionId(transactionId);
//     setIsModalOpen(true);
//   };

//   // Close the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedTransactionId('');
//     setSelectedStatus('');
//   };

//   // Update payment status
//   const updatePaymentStatus = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/payments/transaction/${selectedTransactionId}/status`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: selectedStatus }),
//       });
//       if (!response.ok) throw new Error('Failed to update payment status');

//       alert('Payment status updated successfully');

//       // Fetch updated payments
//       const updatedPaymentsResponse = await fetch('http://localhost:8080/payments/all');
//       const updatedPayments = await updatedPaymentsResponse.json();
//       setPayments(updatedPayments);
//       closeModal(); // Close the modal after update
//     } catch (error) {
//       console.error(error);
//       alert('Error updating payment status: ' + error.message);
//     }
//   };

//   return (
//     <div className="admin-container">
//       <h2>Admin Payment Management</h2>
//       <h3>All Payments</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>SNo</th>
//             <th>Transaction ID</th>
//             <th>Total Amount</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.length > 0 ? (
//             payments.map((payment, index) => (
//               <tr key={payment.transactionId}>
//                 <td>{index + 1}</td>
//                 <td>{payment.transactionId}</td>
//                 <td>{payment.totalAmount}</td>
//                 <td>{payment.status}</td>
//                 <td>
//                   <button onClick={() => handleUpdate(payment.transactionId)}>
//                     Update
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No payments found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Modal for selecting status */}
//       {isModalOpen && (
//         <div className="modal">
//           <h3>Update Payment Status</h3>
//           <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} required>
//             <option value="">Select Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Success">Success</option>
//             <option value="Failed">Failed</option>
//           </select>
//           <br />
//           <button onClick={updatePaymentStatus}>Confirm Update</button>
//           <button onClick={closeModal}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;

