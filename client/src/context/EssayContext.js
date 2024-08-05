// src/context/EssayContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const EssayContext = createContext();

export const useEssays = () => useContext(EssayContext);

export const EssayProvider = ({ children }) => {
  const [essays, setEssays] = useState([]);

  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/essays');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEssays(data);
      } catch (error) {
        console.error('Error fetching essays:', error);
      }
    };

    fetchEssays();
  }, []);

  const addEssay = async (newEssay) => {
    try {
      const response = await fetch('http://localhost:3000/api/essays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEssay),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEssays((prevEssays) => [...prevEssays, data]);
    } catch (error) {
      console.error('Error adding essay:', error);
    }
  };

  const likeEssay = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/essays/${id}/like`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedEssay = await response.json();
      setEssays((prevEssays) =>
        prevEssays.map((essay) => (essay._id === updatedEssay._id ? updatedEssay : essay))
      );
    } catch (error) {
      console.error('Error liking essay:', error);
    }
  };

  return (
    <EssayContext.Provider value={{ essays, addEssay, likeEssay }}>
      {children}
    </EssayContext.Provider>
  );
};
