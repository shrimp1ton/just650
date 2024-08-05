import React, { useState } from 'react';
import { useEssays } from '../context/EssayContext';

function SubmitTab() {
  const [title, setTitle] = useState(''); // State for the title
  const [essay, setEssay] = useState(''); // State for the essay content
  const [authorName, setAuthorName] = useState(''); // State for the author's name
  const { addEssay } = useEssays(); // Custom hook to access essay context

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title cannot be empty!');
      return;
    }

    if (!essay.trim()) {
      alert('Essay content cannot be empty!');
      return;
    }

    addEssay({
      title: title.trim(), // Ensure title is included in the submission
      content: essay.trim(),
      isAnonymous: !authorName.trim(),
      authorName: authorName.trim() || 'Anonymous',
    });

    // Reset form fields after submission
    setTitle('');
    setEssay('');
    setAuthorName('');
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
    </div>
  );
}

export default SubmitTab;
