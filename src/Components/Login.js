import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import axios from 'axios';
import "./Login.css";
import KLN1 from '../Images/KLN1.jpeg';
import KLN5 from '../Images/KLN5.jpeg';
import KLN from '../Images/KLN.jpeg';
import Biryani from '../Images/Biryani.jpg';
import Tiffin from '../Images/Tffin.jpg';
import Veg from '../Images/veg.jpg';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/users/all');
      const users = response.data;
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        setMessage("");
        logIn(matchedUser.firstName);
        onLoginSuccess(matchedUser.firstName);
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        setMessage("Incorrect email or password.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setMessage("An error occurred while logging in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    if (!isLoggedIn) {
      setMessage("Please log in to view this content.");
    } else {
      navigate("/home");
    }
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };

  return (
    <div className="page-container">
      <div className="left-container">
        <div className="round-link" onClick={handleImageClick}>
          <img src={Biryani} alt="Biryani" />
          <p><b>Biryani</b></p>
        </div>
        <div className="round-link" onClick={handleImageClick}>
          <img src={Tiffin} alt="Tiffin" />
          <p><b>Tiffins</b></p>
        </div>
        <div className="round-link" onClick={handleImageClick}>
          <img src={Veg} alt="Veg" />
          <p><b>Veg</b></p>
        </div>
      </div>
      <div className="center-container">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                }}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage("");
                }}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              <button type="button" onClick={handleClear}>
                Clear
              </button>
            </div>
            {message && <p className="error-message">{message}</p>}
            {!isLoggedIn && (
              <p>
                New member? <Link to="/signup">Signup</Link>
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="right-container">
        <div className="image-container">
          <div className="image-container-inner">
            <img src={KLN5} alt="KLN5" />
            <img src={KLN1} alt="KLN1" />
            <img src={KLN} alt="KLN" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
