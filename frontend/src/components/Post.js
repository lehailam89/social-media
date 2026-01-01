import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Post.css';

const Post = ({ post, onPostUpdated, onPostDeleted }) => {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const isLiked = likes.includes(user?.id);
  const isOwner = post.user._id === user?.id;

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

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/api/posts/${post._id}`);
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

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.user.avatar} alt={post.user.firstName} className="avatar" />
        <div className="post-user-info">
          <Link to={`/profile/${post.user._id}`} className="post-user-name">
            {post.user.firstName} {post.user.lastName}
          </Link>
          <span className="post-date">
            {new Date(post.createdAt).toLocaleDateString('vi-VN')}
          </span>
        </div>
        {isOwner && (
          <button onClick={handleDeletePost} className="delete-post-btn">
            Delete
          </button>
        )}
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="post-image" />}
      </div>

      <div className="post-stats">
        <span>{likes.length} likes</span>
        <span>{comments.length} comments</span>
      </div>

      <div className="post-actions">
        <button onClick={handleLike} className={`action-btn ${isLiked ? 'liked' : ''}`}>
          {isLiked ? '👍 Liked' : '👍 Like'}
        </button>
        <button onClick={() => setShowComments(!showComments)} className="action-btn">
          💬 Comment
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-submit">Post</button>
          </form>
          
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <img src={comment.user.avatar} alt={comment.user.firstName} className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-user-name">
                      {comment.user.firstName} {comment.user.lastName}
                    </span>
                    {comment.user._id === user?.id && (
                      <button 
                        onClick={() => handleDeleteComment(comment._id)}
                        className="delete-comment-btn"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
