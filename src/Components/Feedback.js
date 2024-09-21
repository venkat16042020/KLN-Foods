import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feedback.css'; 

const Feedback = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [userEmail, setUserEmail] = useState(''); 

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/all');
        setEmails(response.data); 
        
        
        if (response.data.length > 0) {
         
          setUserEmail(response.data[0].email); 
        }
      } catch (err) {
        setError('Failed to fetch emails');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedbackText(e.target.value);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const feedbackData = { email: userEmail, text: feedbackText };
      const response = await axios.post('http://localhost:8080/api/feedbacks/add', feedbackData);
      console.log('Feedback submitted:', response.data);
      setFeedbackText(''); 
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleClear = () => {
    setFeedbackText(''); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="feedback-container">
      <h2>User Emails</h2>
      <ul>
        {emails.map((user, index) => (
          <li key={index}>{user.email}</li>
        ))}
      </ul>

      <h3>Submit Your Feedback</h3>
      <form onSubmit={handleFeedbackSubmit} className="feedback-form">
        <textarea
          value={feedbackText}
          onChange={handleFeedbackChange}
          placeholder="Write your feedback here..."
          required
        />
        <div className="button-container">
          <button type="submit" className="submit-button">Submit Feedback</button>
          <button type="button" onClick={handleClear} className="clear-button">Clear</button>
        </div>
      </form>
      <p>Your Email: {userEmail}</p> 
    </div>
  );
};

export default Feedback;
