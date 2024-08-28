import React, { useState, useEffect, useRef } from 'react';
import { useEssays } from '../context/EssayContext';
import { useAuth } from '../context/AuthContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { gsap } from 'gsap';
import '../styles.css';

function SubmitTab({ triggerLogin }) {
  const [title, setTitle] = useState('');
  const [essay, setEssay] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [userEssays, setUserEssays] = useState([]);
  const { addEssay } = useEssays();
  const { user } = useAuth();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const formRef = useRef(null);
  const titleInputRef = useRef(null);
  const essayInputRef = useRef(null);
  const authorNameInputRef = useRef(null);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    if (user) {
      const fetchUserEssays = async () => {
        const db = getFirestore();
        const essaysRef = collection(db, 'essays');
        const q = query(essaysRef, where('authorId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const essays = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }));

        setUserEssays(essays);
      };

      fetchUserEssays();
    }

    // GSAP Animations
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }
    );

    gsap.fromTo(
      [titleInputRef.current, essayInputRef.current, authorNameInputRef.current],
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2,
      }
    );

    gsap.fromTo(
      submitButtonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.8, ease: 'bounce.out' }
    );
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      triggerLogin();
      return;
    }

    if (!title.trim()) {
      alert('Title cannot be empty!');
      return;
    }

    if (!essay.trim()) {
      alert('Essay content cannot be empty!');
      return;
    }

    try {
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
          authorId: user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit essay');
      }

      const newEssay = await response.json();

      addEssay(newEssay);
      setUserEssays((prevEssays) => [...prevEssays, newEssay]);

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
      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Essay Title"
          className="title-input"
          ref={titleInputRef}
        />
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Write your essay here"
          className="essay-input"
          ref={essayInputRef}
        />
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Author Name (Leave blank if you want to remain anonymous)"
          className="author-name-input"
          ref={authorNameInputRef}
        />
        <button
          className="subessay-button"
          type="submit"
          ref={submitButtonRef}
        >
          Submit Essay
        </button>
      </form>

      <div className="grass-design"></div>

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
