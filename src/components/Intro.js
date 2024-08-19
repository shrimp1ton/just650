import React, { useEffect, useState } from 'react';


const Intro = ({ onAnimationEnd }) => {
const [text, setText] = useState('');
const fullText = 'Just 650.';


useEffect(() => {
   let index = 0;
   const typingInterval = setInterval(() => {
     if (index <= fullText.length) {
       setText(fullText.slice(0, index));
       console.log("Current text:", fullText.slice(0, index)); // Add this line
       index++;
     } else {
       clearInterval(typingInterval);
       setTimeout(() => {
         onAnimationEnd();
       }, 1000);
     }
   }, 200);
    return () => clearInterval(typingInterval);
}, [onAnimationEnd]);


return (
   <div className="intro-container">
     <div className="intro-text">{text}</div>
     <div className="loading-bar">
       <div className="loading-fill"></div>
     </div> 
   </div>
 );
};


export default Intro;
