// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './Components/CartContext';
import { AuthProvider } from './Components/AuthContext';
import { PaymentProvider } from './Components/PaymentContext'; // Import the PaymentProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <PaymentProvider> {/* Wrap with PaymentProvider */}
          <App />
        </PaymentProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
