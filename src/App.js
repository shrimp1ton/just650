// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubmitTab from './components/SubmitTab';
import ReadTab from './components/ReadTab';
import Intro from './components/Intro';
import Login from './components/Login';
import { EssayProvider } from './context/EssayContext';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import Auth context

function AppContent() {
  const [activeTab, setActiveTab] = useState('submit');
  const [showIntro, setShowIntro] = useState(true); // State to control the intro screen
  const [isBlurred, setIsBlurred] = useState(false); // State to control the blur effect
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State to show/hide login popup
  const { user } = useAuth(); // Get the authenticated user from the Auth context

  const handleAnimationEnd = () => {
    setShowIntro(false); // Hide the intro screen after animation ends
  };

  const handleUserInteraction = () => {
    if (!user) {
      setIsBlurred(true); // Apply blur if the user is not logged in
      setShowLoginPopup(true); // Show the login popup
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
              <button
                className={`button ${activeTab === 'submit' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('submit');
                  handleUserInteraction(); // Check user interaction
                }}
              >
                SUBMIT
              </button>
              <button
                className={`button ${activeTab === 'read' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('read');
                  handleUserInteraction(); // Check user interaction
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
          <Login />
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
          </Routes>
        </Router>
      </EssayProvider>
    </AuthProvider>
  );
}

export default App;
