import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import { AuthContext } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  const isOwnProfile = (currentUser?._id || currentUser?.id) === userId;

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
      alert('Đã gửi lời mời kết bạn!');
    } catch (error) {
      alert(error.response?.data?.message || 'Không thể gửi lời mời kết bạn');
    }
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="loading">Đang tải trang cá nhân...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="error">Không tìm thấy người dùng</div>
      </div>
    );
  }

  const isFriend = user.friends?.some(friend => friend._id === (currentUser?._id || currentUser?.id));

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        {/* Cover Photo */}
        <div className="profile-cover">
          <img 
            src={user.coverPhoto || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop'} 
            alt="Cover" 
          />
          {isOwnProfile && (
            <button className="edit-cover-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
              </svg>
              Thêm ảnh bìa
            </button>
          )}
        </div>

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-header-content">
            <div className="profile-avatar-container">
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random&size=168`} 
                alt={user.firstName}
                className="profile-avatar"
              />
              {isOwnProfile && (
                <button className="edit-avatar-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                  </svg>
                </button>
              )}
            </div>

            <div className="profile-info">
              <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
              <p className="profile-friends-count">{user.friends?.length || 300} người bạn</p>
            </div>

            <div className="profile-actions">
              {isOwnProfile ? (
                <>
                  <button className="btn-primary">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                    Thêm vào tin
                  </button>
                  <button className="btn-secondary">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                    </svg>
                    Chỉnh sửa trang cá nhân
                  </button>
                </>
              ) : (
                <>
                  {!isFriend ? (
                    <button onClick={handleSendFriendRequest} className="btn-primary">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                      Thêm bạn bè
                    </button>
                  ) : (
                    <button className="btn-friends">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      Bạn bè
                    </button>
                  )}
                  <button className="btn-secondary">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                    Nhắn tin
                  </button>
                </>
              )}
              <button className="btn-icon">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <g fillRule="evenodd" transform="translate(-446 -350)">
                    <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>

          <div className="profile-divider"></div>

          {/* Profile Tabs */}
          <div className="profile-tabs">
            <button 
              className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              Bài viết
            </button>
            <button className="profile-tab">Giới thiệu</button>
            <button className="profile-tab">Bạn bè</button>
            <button className="profile-tab">Ảnh</button>
            <button className="profile-tab">Reels</button>
            <button className="profile-tab">Check in</button>
            <button className="profile-tab">
              Xem thêm
              <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                <path d="M10 14l-5-5h10z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Left Column */}
          <div className="profile-left">
            <div className="intro-card">
              <h3>Giới thiệu</h3>
              <button className="btn-add-bio">Thêm tiểu sử</button>
              <button className="btn-edit-details">Chỉnh sửa chi tiết</button>
              <button className="btn-add-featured">Thêm sở thích</button>
            </div>

            {isOwnProfile && (
              <div className="privacy-card">
                <div className="privacy-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="#1877f2">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"></path>
                  </svg>
                </div>
                <h4>Bạn đã khóa bảo vệ trang cá nhân</h4>
                <Link to="/privacy">Tìm hiểu thêm</Link>
              </div>
            )}
          </div>

          {/* Main Column */}
          <div className="profile-main">
            {isOwnProfile && <CreatePost onPostCreated={handlePostCreated} />}
            
            <div className="posts-section">
              {posts.length === 0 ? (
                <div className="no-posts-card">
                  <h3>Không có bài viết nào</h3>
                  <p>Bắt đầu chia sẻ những khoảnh khắc của bạn!</p>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
