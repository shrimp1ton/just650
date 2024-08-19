// src/App.js
import React, { useState } from 'react';
import SubmitTab from './components/SubmitTab';
import ReadTab from './components/ReadTab';
import Intro from './components/Intro'; // Import the Intro component
import { EssayProvider } from './context/EssayContext';


function App() {
 const [activeTab, setActiveTab] = useState('submit');
 const [showIntro, setShowIntro] = useState(true); // State to control the intro screen


 const handleAnimationEnd = () => {
   const introElement = document.querySelector('.intro-container');
   introElement.classList.add('fade-out');


   setTimeout(() => {
     setShowIntro(false); // Hide the intro screen after the fade-out
   }, 1000); // Allow time for the fade-out transition
 };


 return (
   <EssayProvider>
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
   </EssayProvider>
 );
}


export default App;



