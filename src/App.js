// src/App.js
import React, { useState } from 'react';
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
  const [showIntro, setShowIntro] = useState(true);
  const [isBlurred, setIsBlurred] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { user } = useAuth(); // Ensure this is called within AuthProvider

  const handleAnimationEnd = () => {
    setShowIntro(false);
  };

  const handleUserInteraction = () => {
    if (!user) {
      setIsBlurred(true);
      setShowLoginPopup(true);
    }
  };

  if (showIntro) {
    return <Intro onAnimationEnd={handleAnimationEnd} />;
  }

  return (
    <div className="App">
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