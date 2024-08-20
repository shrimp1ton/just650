// src/components/ProfileBanner.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Ensure your styles are imported

const ProfileBanner = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="profile-banner">
      <div
        className="profile-info"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <img
            src={require('../assets/Default_pfp.jpg').default} // Adjusted image path
            alt="Profile"
            className="profile-pic"
        />
        <span>Hi, {user.displayName || 'User'}</span>
      </div>
      {isDropdownOpen && (
        <div className="profile-dropdown">
          <button onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default ProfileBanner;
