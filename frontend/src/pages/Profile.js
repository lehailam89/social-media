import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import { AuthContext } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = currentUser?.id === userId;

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, [userId]);

  const fetchUserPosts = useCallback(async () => {
    try {
      const response = await axios.get(`/api/posts/user/${userId}`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, [fetchUserData, fetchUserPosts]);

  const handleSendFriendRequest = async () => {
    try {
      await axios.post(`/api/users/friend-request/${userId}`);
      alert('Friend request sent!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send friend request');
    }
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="error">User not found</div>
      </div>
    );
  }

  const isFriend = user.friends?.some(friend => friend._id === currentUser?.id);

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.avatar} alt={user.firstName} className="profile-avatar" />
          <div className="profile-info">
            <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
            <p className="profile-bio">{user.bio || 'No bio yet'}</p>
            <div className="profile-stats">
              <span>{user.friends?.length || 0} friends</span>
              <span>{posts.length} posts</span>
            </div>
            {!isOwnProfile && !isFriend && (
              <button onClick={handleSendFriendRequest} className="add-friend-btn">
                Add Friend
              </button>
            )}
            {isFriend && (
              <span className="friend-badge">✓ Friends</span>
            )}
          </div>
        </div>

        <div className="profile-posts">
          <h2>Posts</h2>
          {posts.length === 0 ? (
            <div className="no-posts">No posts yet</div>
          ) : (
            posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                onPostDeleted={handlePostDeleted}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
