import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import EditPost from './EditPost';
import './Post.css';

const Post = ({ post, onPostUpdated, onPostDeleted }) => {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [isPinned, setIsPinned] = useState(post.pinned || false);
  const [isSaved, setIsSaved] = useState(post.savedBy?.includes(user?._id || user?.id) || false);
  const menuRef = useRef(null);

  const userId = user?._id || user?.id;
  const isLiked = likes.includes(userId);
  const isOwner = post.user._id === userId;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/posts/${post._id}/like`);
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;

    try {
      const response = await axios.post('/api/comments', {
        postId: post._id,
        content: newComment
      });
      
      setComments([response.data.comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handlePinPost = async () => {
    try {
      const response = await axios.post(`/api/posts/${post._id}/pin`);
      setIsPinned(response.data.pinned);
      setShowMenu(false);
      alert(response.data.message);
    } catch (error) {
      console.error('Error pinning post:', error);
    }
  };

  const handleSavePost = async () => {
    try {
      const response = await axios.post(`/api/posts/${post._id}/save`);
      setIsSaved(response.data.saved);
      setShowMenu(false);
      alert(response.data.message);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEditPost = () => {
    setShowMenu(false);
    setShowEditPost(true);
  };

  const handleDeletePost = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
        await axios.delete(`/api/posts/${post._id}`);
        setShowMenu(false);
        onPostDeleted(post._id);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    
    if (diffInSeconds < 60) return 'Vừa xong';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} ngày`;
    
    return postDate.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <div className="post">
        <div className="post-header">
          <Link to={`/profile/${post.user._id}`}>
            <img 
              src={post.user.avatar || `https://ui-avatars.com/api/?name=${post.user.firstName}+${post.user.lastName}&background=random`} 
              alt={post.user.firstName} 
              className="post-avatar" 
            />
          </Link>
          <div className="post-user-info">
            <Link to={`/profile/${post.user._id}`} className="post-user-name">
              {post.user.firstName} {post.user.lastName}
            </Link>
            <div className="post-meta">
              <span className="post-date">{formatDate(post.createdAt)}</span>
              <span className="post-privacy">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM4.5 8a.5.5 0 01.5-.5h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="post-menu-container" ref={menuRef}>
            <button 
              onClick={() => setShowMenu(!showMenu)} 
              className="post-menu-btn"
            >
              <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                <g fillRule="evenodd" transform="translate(-446 -350)">
                  <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                </g>
              </svg>
            </button>
            
            {showMenu && (
              <div className="post-menu-dropdown">
                {isOwner && (
                  <>
                    <button onClick={handlePinPost} className="menu-item">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                        <path d="M10 0a1 1 0 011 1v5.586l4.707-4.707a1 1 0 111.414 1.414L12.414 8H18a1 1 0 110 2h-5.586l4.707 4.707a1 1 0 01-1.414 1.414L11 11.414V17a1 1 0 11-2 0v-5.586l-4.707 4.707a1 1 0 01-1.414-1.414L7.586 10H2a1 1 0 110-2h5.586L2.879 3.293a1 1 0 011.414-1.414L9 6.586V1a1 1 0 011-1z"></path>
                      </svg>
                      <span>{isPinned ? 'Bỏ ghim bài viết' : 'Ghim bài viết'}</span>
                    </button>
                  </>
                )}
                
                <button onClick={handleSavePost} className="menu-item">
                  <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                    <path d="M17 3a3 3 0 013 3v12a1 1 0 01-1.613.787l-6.887-5.21-6.887 5.21A1 1 0 013 18V6a3 3 0 013-3h11z"></path>
                  </svg>
                  <span>{isSaved ? 'Bỏ lưu bài viết' : 'Lưu bài viết'}</span>
                  {!isSaved && <p>Thêm vào danh sách đã lưu.</p>}
                </button>
                
                {isOwner && (
                  <>
                    <button onClick={handleEditPost} className="menu-item">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.379-8.379-2.828-2.828z"></path>
                      </svg>
                      <span>Chỉnh sửa bài viết</span>
                    </button>
                    
                    <div className="menu-divider"></div>
                    
                    <button onClick={handleDeletePost} className="menu-item">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                        <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"></path>
                      </svg>
                      <span>Chuyển vào kho lưu trữ</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {post.image && (
        <div className="post-image-container">
          <img src={post.image} alt="Post" className="post-image" />
        </div>
      )}

      <div className="post-stats">
        <div className="post-reactions">
          {likes.length > 0 && (
            <>
              <div className="reaction-icons">
                <span className="reaction-icon like">👍</span>
              </div>
              <span className="reaction-count">{likes.length}</span>
            </>
          )}
        </div>
        <div className="post-stats-right">
          {comments.length > 0 && (
            <span 
              className="comment-count" 
              onClick={() => setShowComments(true)}
            >
              {comments.length} bình luận
            </span>
          )}
        </div>
      </div>

      <div className="post-divider"></div>

      <div className="post-actions">
        <button onClick={handleLike} className={`post-action-btn ${isLiked ? 'liked' : ''}`}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M16.5 3.5C14.76 3.5 13.09 4.24 12 5.5 10.91 4.24 9.24 3.5 7.5 3.5 4.42 3.5 2 5.92 2 9c0 4.16 3.42 7.93 8.55 12.54l1.45 1.31 1.45-1.32C18.58 16.93 22 13.16 22 9c0-3.08-2.42-5.5-5.5-5.5z"></path>
          </svg>
          <span>Thích</span>
        </button>
        <button onClick={() => setShowComments(!showComments)} className="post-action-btn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.3-3.86-.83l-.28-.15-2.91.49.49-2.91-.15-.28C4.3 14.68 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"></path>
          </svg>
          <span>Bình luận</span>
        </button>
        <button className="post-action-btn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path>
          </svg>
          <span>Chia sẻ</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <Link to={`/profile/${comment.user._id}`}>
                  <img 
                    src={comment.user.avatar || `https://ui-avatars.com/api/?name=${comment.user.firstName}+${comment.user.lastName}&background=random`} 
                    alt={comment.user.firstName} 
                    className="comment-avatar" 
                  />
                </Link>
                <div className="comment-bubble">
                  <Link to={`/profile/${comment.user._id}`} className="comment-user-name">
                    {comment.user.firstName} {comment.user.lastName}
                  </Link>
                  <p className="comment-text">{comment.content}</p>
                  {comment.user._id === userId && (
                    <button 
                      onClick={() => handleDeleteComment(comment._id)}
                      className="delete-comment-btn"
                      title="Xóa bình luận"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleComment} className="comment-form">
            <img 
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`} 
              alt={user?.firstName}
              className="comment-form-avatar"
            />
            <input
              type="text"
              placeholder="Viết bình luận..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
          </form>
        </div>
      )}
    </div>
    
    {showEditPost && (
      <EditPost 
        post={post}
        onClose={() => setShowEditPost(false)}
        onPostUpdated={(updatedPost) => {
          onPostUpdated(updatedPost);
          setShowEditPost(false);
        }}
      />
    )}
    </>
  );
};

export default Post;
