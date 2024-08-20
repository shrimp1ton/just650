// src/components/Header.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import profilePlaceholder from '../assets/profile-placeholder.png'; // Add a placeholder image

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      {user && (
        <div className="profile-section">
          <img src={profilePlaceholder} alt="Profile" className="profile-picture" />
          <span className="greeting">Hi, {user.displayName || 'User'}</span>
        </div>
      )}
    </header>
  );
};

export default Header;
