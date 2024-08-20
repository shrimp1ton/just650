import React, { useState, useEffect } from 'react';
import { useEssays } from '../context/EssayContext';

function ReadTab() {
  const { essays, likeEssay } = useEssays();
  const [sortBy, setSortBy] = useState('mostLiked');
  const [replies, setReplies] = useState({});
  const [newReplyContent, setNewReplyContent] = useState({});
  const [replyAuthor, setReplyAuthor] = useState({});
  const [userLikes, setUserLikes] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const sortedEssays = [...essays].sort((a, b) =>
    sortBy === 'mostLiked' ? b.likes - a.likes : b.timestamp - a.timestamp
  );

  useEffect(() => {
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

    // Load user likes from localStorage
    const storedLikes = localStorage.getItem('userLikes');
    if (storedLikes) {
      setUserLikes(JSON.parse(storedLikes));
    }
  }, [essays, API_BASE_URL]);

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
      {sortedEssays.map((essay) => (
        <div key={essay._id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
          <h2 style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 'bold', fontFamily: 'Lekton' }}>
            {essay.title}
          </h2>
          <p>{essay.content}</p>
          <p>By: {essay.isAnonymous ? 'Anonymous' : essay.authorName}</p>
          <button onClick={() => handleLike(essay._id)}>
            👍 Like ({essay.likes})
          </button>
          <div>
            <h3>Replies</h3>
            {(replies[essay._id] || []).map((reply) => (
              <div key={reply._id} style={{ marginTop: '10px', padding: '5px', borderBottom: '1px solid #eee' }}>
                <p>{reply.content}</p>
                <p><i>By: {reply.authorName} on {new Date(reply.timestamp).toLocaleString()}</i></p>
              </div>
            ))}
            <textarea
              value={newReplyContent[essay._id] || ''}
              onChange={(e) => setNewReplyContent({ ...newReplyContent, [essay._id]: e.target.value })}
              placeholder="Write your reply here"
              style={{ width: '100%', height: '80px', marginTop: '10px' }}
            />
            <input
              type="text"
              value={replyAuthor[essay._id] || ''}
              onChange={(e) => setReplyAuthor({ ...replyAuthor, [essay._id]: e.target.value })}
              placeholder="Your Name (optional)"
              style={{ width: '100%', marginTop: '5px', padding: '5px' }}
            />
            <button onClick={() => handleReplySubmit(essay._id)} style={{ marginTop: '5px' }}>
              Submit Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReadTab;
