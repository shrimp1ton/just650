// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubmitTab from './components/SubmitTab';
import ReadTab from './components/ReadTab';
import Intro from './components/Intro';
import LoginPopup from './components/Login';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { EssayProvider } from './context/EssayContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProfileBanner from './components/ProfileBanner'; // Import the ProfileBanner component

function AppContent() {
  const [activeTab, setActiveTab] = useState('submit');
  const [showIntro, setShowIntro] = useState(true);
  const [isBlurred, setIsBlurred] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const introShown = localStorage.getItem('introShown');
    if (introShown) {
      setShowIntro(false);
    }
  }, []);

  const handleAnimationEnd = () => {
    setShowIntro(false);
    localStorage.setItem('introShown', 'true');
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
            <nav>
              {user && <ProfileBanner user={user} />}
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
            {activeTab === 'submit' ? <SubmitTab onClick={handleUserInteraction} /> : <ReadTab />}
          </div>
        </>
      )}

      {showLoginPopup && (
        <div className="login-popup">
          <LoginPopup />
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
            <Route path="/" element={<AppContent />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </EssayProvider>
    </AuthProvider>
  );
}

export default App;
