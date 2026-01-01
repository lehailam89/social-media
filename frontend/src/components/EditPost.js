import React, { useState } from 'react';
import axios from 'axios';
import './EditPost.css';

const EditPost = ({ post, onClose, onPostUpdated }) => {
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(post.image || '');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const response = await axios.post('/api/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });
      
      setImage(response.data.imageUrl);
      setUploadProgress(0);
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
      alert('Lỗi khi tải ảnh lên!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Vui lòng nhập nội dung bài viết!');
      return;
    }

    try {
      const response = await axios.put(`/api/posts/${post._id}`, {
        content,
        image
      });

      onPostUpdated(response.data.post);
      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Lỗi khi cập nhật bài viết!');
    }
  };

  const handleRemoveImage = () => {
    setImage('');
  };

  return (
    <div className="edit-post-modal" onClick={onClose}>
      <div className="edit-post-content" onClick={(e) => e.stopPropagation()}>
        <div className="edit-post-header">
          <h2>Chỉnh sửa bài viết</h2>
          <button onClick={onClose} className="close-btn">
            <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
              <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
            </svg>
          </button>
        </div>

        <div className="edit-post-user">
          <img 
            src={post.user.avatar || `https://ui-avatars.com/api/?name=${post.user.firstName}+${post.user.lastName}&background=random`}
            alt={post.user.firstName}
            className="edit-post-avatar"
          />
          <div className="edit-post-user-name">
            {post.user.firstName} {post.user.lastName}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`${post.user.firstName} ơi, bạn đang nghĩ gì thế?`}
            className="edit-post-textarea"
            autoFocus
          />

          {image && (
            <div className="edit-post-image-preview">
              <img src={image} alt="Preview" />
              <button 
                type="button" 
                onClick={handleRemoveImage}
                className="remove-image-btn"
              >
                ✕
              </button>
            </div>
          )}

          {uploading && (
            <div className="upload-progress">
              <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          )}

          <div className="edit-post-actions">
            <label className="add-media-btn">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#45bd62">
                <path d="M13.5 9a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 0113.5 9zm8.527 3.371a.75.75 0 01.146 1.052l-3.371 4.494c-.95 1.265-2.735 1.444-4.007.455l-1.79-1.393a.75.75 0 00-.917 0l-1.85 1.438c-1.286 1-3.068.834-4.029-.373L2.846 13.55a.75.75 0 011.198-.897l3.363 4.494c.427.57 1.223.644 1.789.166l1.85-1.438c1.288-1 3.069-.835 4.031.372l1.79 1.393c.565.44 1.368.37 1.824-.126l3.371-4.494a.75.75 0 011.055-.15zM13.5 3C18.75 3 23 7.25 23 12.5S18.75 22 13.5 22 4 17.75 4 12.5 8.25 3 13.5 3zm0 1.5c-4.548 0-8.5 3.952-8.5 8.5s3.952 8.5 8.5 8.5 8.5-3.952 8.5-8.5-3.952-8.5-8.5-8.5z"></path>
              </svg>
              <span>Ảnh/video</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>

          <button 
            type="submit" 
            className="edit-post-submit-btn"
            disabled={!content.trim() || uploading}
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
