// src/components/SubmitTab.js

import React, { useState, useEffect } from 'react';
import { useEssays } from '../context/EssayContext';
import { useAuth } from '../context/AuthContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function SubmitTab({ triggerLogin }) { // Receive triggerLogin as a prop
  const [title, setTitle] = useState(''); // State for the title
  const [essay, setEssay] = useState(''); // State for the essay content
  const [authorName, setAuthorName] = useState(''); // State for the author's name
  const [userEssays, setUserEssays] = useState([]); // State for storing user's essays
  const { addEssay } = useEssays(); // Custom hook to access essay context
  const { user } = useAuth(); // Access the current authenticated user

  // Fetch the API base URL from environment variables
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchUserEssays = async () => {
      if (user) {
        const db = getFirestore();
        const essaysRef = collection(db, 'essays');
        const q = query(essaysRef, where('authorId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const essays = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }));

        setUserEssays(essays);
      }
    };

    fetchUserEssays();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!user) {
      triggerLogin(); // Trigger the login/register popup
      return;
    }

    // Validate input fields
    if (!title.trim()) {
      alert('Title cannot be empty!');
      return;
    }

    if (!essay.trim()) {
      alert('Essay content cannot be empty!');
      return;
    }

    try {
      // Send POST request to submit the essay
      const response = await fetch(`${API_BASE_URL}/essays`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: essay.trim(),
          isAnonymous: !authorName.trim(),
          authorName: authorName.trim() || 'Anonymous',
          authorId: user.uid, // Associate the essay with the current user
        }),
      });

      // Check if the response was successful
      if (!response.ok) {
        throw new Error('Failed to submit essay');
      }

      const newEssay = await response.json();

      // Use the addEssay function to update the context
      addEssay(newEssay);

      // Add the new essay to the user's essays
      setUserEssays((prevEssays) => [...prevEssays, newEssay]);

      // Reset form fields after submission
      setTitle('');
      setEssay('');
      setAuthorName('');
      alert('Essay submitted successfully!');
    } catch (error) {
      console.error('Error submitting essay:', error);
      alert('There was an error submitting your essay. Please try again.');
    }
  };

  return (
    <div className="submit-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Essay Title"
          className="title-input" // Optional class for styling
        />
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Write your essay here"
          className="essay-input" // Optional class for styling
        />
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Author Name (Leave blank if you want to remain anonymous)"
          className="author-name-input"
        />
        <button className="subessay-button" type="submit">
          Submit Essay
        </button>
      </form>

      <div className="grass-design"></div> {/* Grass design container */}

      <h2 className="my-essays-header">My Essays</h2>
      <ul>
        {userEssays.map((essay) => (
          <li key={essay.id}>
            <a href={`/essay/${essay.id}`}>{essay.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubmitTab;
