import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Stories from '../components/Stories';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-container">
        {/* Left Sidebar */}
        <div className="home-sidebar-left">
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div className="home-content">
          <Stories />
          <CreatePost onPostCreated={handlePostCreated} />
          
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="no-posts">No posts yet. Create the first one!</div>
          ) : (
            posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                onPostUpdated={handlePostUpdated}
                onPostDeleted={handlePostDeleted}
              />
            ))
          )}
        </div>

        {/* Right Sidebar */}
        <div className="home-sidebar-right">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
