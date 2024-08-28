import React, { useState, useEffect, useRef } from 'react';
import { useEssays } from '../context/EssayContext';
import gsap from 'gsap';
import '../styles.css'; // Import the CSS file

function ReadTab() {
  const { essays, likeEssay } = useEssays();
  const [sortBy, setSortBy] = useState('mostLiked');
  const [replies, setReplies] = useState({});
  const [newReplyContent, setNewReplyContent] = useState({});
  const [replyAuthor, setReplyAuthor] = useState({});
  const [userLikes, setUserLikes] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const essayRefs = useRef([]);

  const sortedEssays = [...essays].sort((a, b) =>
    sortBy === 'mostLiked' ? b.likes - a.likes : b.timestamp - a.timestamp
  );

  useEffect(() => {
    gsap.from(essayRefs.current, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.5,
      ease: 'power3.out',
    });

    const fetchReplies = async (essayId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/replies/${essayId}`);
        const data = await response.json();
        setReplies((prevReplies) => ({
          ...prevReplies,
          [essayId]: data,
        }));
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };

    essays.forEach((essay) => {
      fetchReplies(essay._id);
    });

    const storedLikes = localStorage.getItem('userLikes');
    if (storedLikes) {
      setUserLikes(JSON.parse(storedLikes));
    }
  }, [essays, sortBy, API_BASE_URL]);

  const handleLike = async (essayId) => {
    if (!userLikes[essayId]) {
      try {
        await likeEssay(essayId);
        setUserLikes((prevLikes) => {
          const newLikes = { ...prevLikes, [essayId]: true };
          localStorage.setItem('userLikes', JSON.stringify(newLikes));
          return newLikes;
        });
      } catch (error) {
        console.error('Error liking essay:', error);
      }
    } else {
      console.log('User has already liked this essay.');
    }
  };

  const handleReplySubmit = async (essayId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          essayId,
          content: newReplyContent[essayId],
          authorName: replyAuthor[essayId] || 'Anonymous',
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const savedReply = await response.json();
      setReplies((prevReplies) => ({
        ...prevReplies,
        [essayId]: [...(prevReplies[essayId] || []), savedReply],
      }));
      setNewReplyContent((prev) => ({ ...prev, [essayId]: '' }));
      setReplyAuthor((prev) => ({ ...prev, [essayId]: '' }));
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  return (
    <div>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="mostLiked">Most Liked</option>
        <option value="mostRecent">Most Recent</option>
      </select>
      {sortedEssays.map((essay, index) => (
        <div
          key={essay._id}
          className="essay-container"
          ref={(el) => (essayRefs.current[index] = el)}
        >
          <h2 className="essay-title">{essay.title}</h2>
          <p>{essay.content}</p>
          <p>By: {essay.isAnonymous ? 'Anonymous' : essay.authorName}</p>
          <button
            onClick={() => handleLike(essay._id)}
            className="like-button"
          >
            👍 Like ({essay.likes})
          </button>
          <div>
            <h3>Replies</h3>
            <div className="replies-container">
              {(replies[essay._id] || []).map((reply) => (
                <div key={reply._id} className="reply">
                  <p>{reply.content}</p>
                  <p><i>By: {reply.authorName} on {new Date(reply.timestamp).toLocaleString()}</i></p>
                </div>
              ))}
            </div>
            <textarea
              value={newReplyContent[essay._id] || ''}
              onChange={(e) => setNewReplyContent({ ...newReplyContent, [essay._id]: e.target.value })}
              placeholder="Write your reply here"
              className="reply-input"
            />
            <input
              type="text"
              value={replyAuthor[essay._id] || ''}
              onChange={(e) => setReplyAuthor({ ...replyAuthor, [essay._id]: e.target.value })}
              placeholder="Your Name (optional)"
              className="author-input"
            />
            <button
              onClick={() => handleReplySubmit(essay._id)}
              className="reply-submit-button"
            >
              Submit Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReadTab;
