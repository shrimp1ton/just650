// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Ensure this is imported to apply styles

const LoginPopup = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <div className="login-popup">
      <h2>Welcome</h2>
      <button className="popup-button" onClick={handleLoginClick}>
        Login
      </button>
      <button className="popup-button" onClick={handleRegisterClick}>
        Register
      </button>
    </div>
  );
};

export default LoginPopup;
