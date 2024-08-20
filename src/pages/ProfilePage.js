// src/pages/ProfilePage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updatePassword } from 'firebase/auth';
import '../styles.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profilePic, setProfilePic] = useState(user.photoURL || '');
  const [newName, setNewName] = useState(user.displayName || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);

      try {
        await updateProfile(user, { photoURL: imageUrl });
        setSuccess('Profile picture updated successfully!');
      } catch (err) {
        setError('Failed to update profile picture.');
      }
    }
  };

  const handleNameChange = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, { displayName: newName });
      setSuccess('Name updated successfully!');
      setError(null);
    } catch (err) {
      setError('Failed to update name: ' + err.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await updatePassword(user, newPassword);
      setSuccess('Password updated successfully!');
      setError(null);
    } catch (err) {
      setError('Failed to update password: ' + err.message);
    }
  };

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      
      <div className="profile-details">
        <div className="profile-pic-section">
          <img
            src={profilePic || '../assets/Default_pfp.jpg'}
            alt="Profile"
            className="profile-pic-large"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="profile-pic-input"
          />
        </div>
        <div className="profile-name-section">
          <form onSubmit={handleNameChange}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Your Name"
              className="profile-name-input"
            />
            <button type="submit" className="update-name-button">
              Update Name
            </button>
          </form>
        </div>
      </div>

      <form onSubmit={handlePasswordChange} className="password-form">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit" className="update-button">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
