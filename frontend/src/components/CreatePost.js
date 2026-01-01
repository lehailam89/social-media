import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('Please enter some content');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/posts', {
        content,
        image
      });
      
      setContent('');
      setImage('');
      onPostCreated(response.data.post);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <div className="create-post-header">
        <img src={user?.avatar} alt={user?.firstName} className="avatar" />
        <div className="user-info">
          <span className="user-name">{user?.firstName} {user?.lastName}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="create-post-textarea"
          rows="3"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="create-post-input"
        />
        <button type="submit" disabled={loading} className="create-post-button">
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
