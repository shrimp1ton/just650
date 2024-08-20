import React, { createContext, useContext, useState, useEffect } from 'react';

const EssayContext = createContext();

export const useEssays = () => useContext(EssayContext);

export const EssayProvider = ({ children }) => {
  const [essays, setEssays] = useState([]);
  const [userLikes, setUserLikes] = useState({}); // Store user likes

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the environment variable

  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/essays`);
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Network response was not ok: ${response.statusText}. Details: ${errorDetails}`);
        }
        const data = await response.json();
        setEssays(data);
      } catch (error) {
        console.error('Error fetching essays:', error);
      }
    };

    fetchEssays(); // Fetch essays on component mount

    // Load user likes from localStorage
    const storedLikes = localStorage.getItem('userLikes');
    if (storedLikes) {
      setUserLikes(JSON.parse(storedLikes));
    }
  }, [API_BASE_URL]);

  const addEssay = async (newEssay) => {
    try {
      const response = await fetch(`${API_BASE_URL}/essays`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEssay),
      });
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Network response was not ok: ${response.statusText}. Details: ${errorDetails}`);
      }
      const data = await response.json();
      setEssays((prevEssays) => [...prevEssays, data]);
    } catch (error) {
      console.error('Error adding essay:', error);
    }
  };

  const likeEssay = async (id) => {
    if (!userLikes[id]) {
      try {
        const response = await fetch(`${API_BASE_URL}/essays/${id}/like`, {
          method: 'PUT',
        });
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Network response was not ok: ${response.statusText}. Details: ${errorDetails}`);
        }
        const updatedEssay = await response.json();
        setEssays((prevEssays) =>
          prevEssays.map((essay) => (essay._id === updatedEssay._id ? updatedEssay : essay))
        );
        setUserLikes((prevLikes) => {
          const newLikes = { ...prevLikes, [id]: true };
          localStorage.setItem('userLikes', JSON.stringify(newLikes));
          return newLikes;
        });
      } catch (error) {
        console.error('Error liking essay:', error);
      }
    } else {
      // Handle unlike logic here if needed
    }
  };

  return (
    <EssayContext.Provider value={{ essays, addEssay, likeEssay }}>
      {children}
    </EssayContext.Provider>
  );
};
