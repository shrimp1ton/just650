// src/App.js
import React, { useState } from 'react';
import SubmitTab from './components/SubmitTab';
import ReadTab from './components/ReadTab';
import Intro from './components/Intro';
import Login from './components/Login';
import { EssayProvider } from './context/EssayContext';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import Auth context

function AppContent() {
  const [activeTab, setActiveTab] = useState('submit');
  const [showIntro, setShowIntro] = useState(true); // State to control the intro screen
  const { user } = useAuth(); // Get the authenticated user from the Auth context

  const handleAnimationEnd = () => {
    const introElement = document.querySelector('.intro-container');
    introElement.classList.add('fade-out');

    setTimeout(() => {
      setShowIntro(false); // Hide the intro screen after the fade-out
    }, 1000); // Allow time for the fade-out transition
  };

  if (!user) {
    return <Login />; // Show the login screen if the user is not authenticated
  }

  return (
    <div className="App">
      {showIntro ? (
        <Intro onAnimationEnd={handleAnimationEnd} />
      ) : (
        <>
          <nav>
            <button
              className={`button ${activeTab === 'submit' ? 'active' : ''}`}
              onClick={() => setActiveTab('submit')}
            >
              SUBMIT
            </button>
            <button
              className={`button ${activeTab === 'read' ? 'active' : ''}`}
              onClick={() => setActiveTab('read')}
            >
              READ
            </button>
          </nav>
          {activeTab === 'submit' ? <SubmitTab /> : <ReadTab />}
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <EssayProvider>
        <AppContent />
      </EssayProvider>
    </AuthProvider>
  );
}

export default App;
