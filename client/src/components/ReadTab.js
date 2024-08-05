// src/components/ReadTab.js

import React, { useState } from 'react';
import { useEssays } from '../context/EssayContext';

function ReadTab() {
  const { essays, likeEssay } = useEssays();
  const [sortBy, setSortBy] = useState('mostLiked');

  // Sort essays based on the selected option
  const sortedEssays = [...essays].sort((a, b) =>
    sortBy === 'mostLiked' ? b.likes - a.likes : new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div>
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="mostLiked">Most Liked</option>
        <option value="mostRecent">Most Recent</option>
      </select>
      {sortedEssays.map((essay) => (
        <div
          key={essay._id}
          style={{
            marginBottom: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            whiteSpace: 'pre-wrap', // Ensure text wraps correctly and respects whitespace
          }}
        >
          <h2 style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 'bold', fontFamily: 'Lekton' }}>
            {essay.title}
          </h2>
          <p>{essay.content}</p>
          <p>By: {essay.isAnonymous ? 'Anonymous' : essay.authorName}</p>
          <button onClick={() => likeEssay(essay._id)}>
            👍 Like ({essay.likes})
          </button>
        </div>
      ))}
    </div>
  );
}

export default ReadTab;
