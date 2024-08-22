// src/components/AdminPortal.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPortal = () => {
  const { isAdmin } = useAuth();

  const handleClearEssays = async () => {
    try {
      const response = await fetch('/api/clearEssays', { method: 'POST' });
      if (response.ok) {
        alert('Essays cleared successfully');
      } else {
        alert('Failed to clear essays');
      }
    } catch (error) {
      console.error('Error clearing essays:', error);
      alert('Error clearing essays');
    }
  };

  const handleBanUser = async (uid) => {
    try {
      const response = await fetch(`/api/banUser?uid=${uid}`, { method: 'POST' });
      if (response.ok) {
        alert('User banned successfully');
      } else {
        alert('Failed to ban user');
      }
    } catch (error) {
      console.error('Error banning user:', error);
      alert('Error banning user');
    }
  };

  if (!isAdmin) {
    return <div>You do not have access to this page.</div>;
  }

  return (
    <div>
      <h2>Admin Portal</h2>
      <button onClick={handleClearEssays}>Clear All Essays</button>
      <div>
        <h3>Ban User</h3>
        <input type="text" placeholder="Enter User ID" id="banUserId" />
        <button onClick={() => handleBanUser(document.getElementById('banUserId').value)}>
          Ban User
        </button>
      </div>
    </div>
  );
};

export default AdminPortal;
