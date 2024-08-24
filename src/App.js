// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SubmitTab from './components/SubmitTab';
import ReadTab from './components/ReadTab';
import Intro from './components/Intro';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProfileBanner from './components/ProfileBanner';
import AdminPortal from './components/AdminPortal';
import { EssayProvider } from './context/EssayContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('submit');
  const [showIntro, setShowIntro] = useState(false); // Start without intro
  const [isBlurred, setIsBlurred] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { user } = useAuth(); // Get user from AuthContext
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    if (user && window.location.pathname === '/') {
      // If user is logged in and on the landing page, show the intro
      setShowIntro(true);
    }
  }, [user]);

  const handleAnimationEnd = () => {
    setShowIntro(false);
    navigate('/intro'); // Navigate to /intro to show the main content
  };

  const handleUserInteraction = () => {
    if (!user) {
      setIsBlurred(true);
      setShowLoginPopup(true);
    }
  };

  return (
    <div className="App">
      {showIntro ? (
        <Intro onAnimationEnd={handleAnimationEnd} />
      ) : (
        <>
          <header className="header">
            {user && <ProfileBanner user={user} />}
            <nav>
              <button
                className={`button ${activeTab === 'submit' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('submit');
                  handleUserInteraction();
                }}
              >
                SUBMIT
              </button>
              <button
                className={`button ${activeTab === 'read' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('read');
                  handleUserInteraction();
                }}
              >
                READ
              </button>
            </nav>
          </header>
          <div className={`App-content ${isBlurred ? 'blurred' : ''}`}>
            {activeTab === 'submit' ? (
              <SubmitTab triggerLogin={handleUserInteraction} />
            ) : (
              <ReadTab />
            )}
          </div>
        </>
      )}

      {showLoginPopup && (
        <div className="login-popup">
          <LoginPage />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <EssayProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/intro" element={<AppContent />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPortal />} />
          </Routes>
        </Router>
      </EssayProvider>
    </AuthProvider>
  );
}

export default App;
