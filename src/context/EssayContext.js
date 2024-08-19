import React, { createContext, useContext, useState, useEffect } from 'react';

const EssayContext = createContext();

export const useEssays = () => useContext(EssayContext);

export const EssayProvider = ({ children }) => {
  const [essays, setEssays] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the environment variable

  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/essays`); // Use the base URL from the environment variable
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

    fetchEssays();
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
