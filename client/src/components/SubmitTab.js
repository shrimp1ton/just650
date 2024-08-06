// src/components/SubmitTab.js

import React, { useState } from 'react';
import { useEssays } from '../context/EssayContext';

function SubmitTab() {
  const [title, setTitle] = useState('');
  const [essay, setEssay] = useState('');
  const [authorName, setAuthorName] = useState('');
  const { addEssay } = useEssays();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE_URL}/essays`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content: essay,
          authorName: authorName || 'Anonymous',
          isAnonymous: !authorName, // or however you determine anonymity
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const savedEssay = await response.json();
      console.log('Essay submitted:', savedEssay);

      // Reset form fields
      setTitle('');
      setEssay('');
      setAuthorName('');
    } catch (error) {
      console.error('Error submitting essay:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Essay Title"
        style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
      />
      <textarea
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        placeholder="Write your essay here"
        style={{ width: '100%', height: '200px', marginBottom: '10px', padding: '10px' }}
      />
      <input
        type="text"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Your Name (optional)"
        style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
      />
      <button className="subessay-button" type="submit">
        Submit Essay
      </button>
    </form>
  );
}

export default SubmitTab;
