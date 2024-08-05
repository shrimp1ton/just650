// src/App.js
import React, { useState } from 'react';
import SubmitTab from './components/SubmitTab';
import ReadTab from './components/ReadTab';
import { EssayProvider } from './context/EssayContext';


function App() {
  const [activeTab, setActiveTab] = useState('submit');

  return (
    <EssayProvider>
      <div className="App">
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
      </div>
    </EssayProvider>
  );
}

export default App;