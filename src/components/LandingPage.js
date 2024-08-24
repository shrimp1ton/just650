// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import the corresponding CSS

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="content-container">
        <h1 className="landing-title">Just 650.</h1>
        <p className="landing-subtitle">
          Empowering students to perfect their personal statements with community feedback—one draft at a time.
        </p>
        <div className="button-container">
          <button className="landing-button" onClick={() => navigate('/login')}>Log In</button>
          <button className="landing-button" onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
