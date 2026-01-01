import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setShowModal(true);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('Vui lòng nhập nội dung');
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      let imageUrl = '';

      // Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadResponse = await axios.post('/api/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        });

        imageUrl = uploadResponse.data.imageUrl;
      }

      // Create post
      const response = await axios.post('/api/posts', {
        content,
        image: imageUrl
      });
      
      setContent('');
      setImageFile(null);
      setImagePreview('');
      setUploadProgress(0);
      setShowModal(false);
      onPostCreated(response.data.post);
    } catch (error) {
      console.error('Error creating post:', error);
      alert(error.response?.data?.message || 'Không thể tạo bài viết');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="create-post">
        <div className="create-post-top">
          <img 
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`} 
            alt={user?.firstName}
            className="create-post-avatar" 
          />
          <div 
            className="create-post-input-placeholder"
            onClick={() => setShowModal(true)}
          >
            Lâm ơi, bạn đang nghĩ gì thế?
          </div>
        </div>
        
        <div className="create-post-divider"></div>
        
        <div className="create-post-actions">
          <label className="post-action-btn">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#45bd62">
              <g fillRule="evenodd">
                <path d="M1.5 6a2.5 2.5 0 012.5-2.5h16a2.5 2.5 0 012.5 2.5v12a2.5 2.5 0 01-2.5 2.5H4a2.5 2.5 0 01-2.5-2.5V6zm2.5-.5A.5.5 0 004 6v11.293l3.146-3.147a.5.5 0 01.708 0l2.792 2.793 5.646-5.647a.5.5 0 01.708 0L20 14.293V6a.5.5 0 00-.5-.5H4z"></path>
                <circle cx="8.5" cy="9.5" r="1.5"></circle>
              </g>
            </svg>
            <span>Ảnh/video</span>
          </label>
          
          <button type="button" className="post-action-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#f7b928">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.5 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM7.5 14h9c.276 0 .5.224.5.5 0 2.485-2.015 4.5-4.5 4.5S8 16.985 8 14.5c0-.276.224-.5.5-.5z"></path>
            </svg>
            <span>Cảm xúc/hoạt động</span>
          </button>
        </div>
      </div>

      {/* Modal for creating post */}
      {showModal && (
        <div className="create-post-modal-overlay" onClick={() => !loading && setShowModal(false)}>
          <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tạo bài viết</h2>
              <button 
                className="modal-close-btn"
                onClick={() => !loading && setShowModal(false)}
                disabled={loading}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M18.707 5.293a1 1 0 00-1.414 0L12 10.586 6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 101.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 000-1.414z"></path>
                </svg>
              </button>
            </div>
            
            <div className="modal-divider"></div>
            
            <div className="modal-user-info">
              <img 
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`} 
                alt={user?.firstName}
              />
              <div>
                <p className="user-name">{user?.firstName} {user?.lastName}</p>
                <div className="privacy-selector">
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM4.5 8a.5.5 0 01.5-.5h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5z"></path>
                  </svg>
                  <span>Công khai</span>
                  <svg viewBox="0 0 20 20" width="12" height="12" fill="currentColor">
                    <path d="M10 13l-5-5h10z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder={`Lâm ơi, bạn đang nghĩ gì thế?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="modal-textarea"
                rows="6"
                autoFocus
                disabled={loading}
              />
              
              {imagePreview && (
                <div className="modal-image-preview">
                  <img src={imagePreview} alt="Preview" />
                  {!loading && (
                    <button 
                      type="button" 
                      onClick={handleRemoveImage}
                      className="modal-remove-image"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M18.707 5.293a1 1 0 00-1.414 0L12 10.586 6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 101.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 000-1.414z"></path>
                      </svg>
                    </button>
                  )}
                </div>
              )}
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="upload-progress-container">
                  <div className="upload-progress-bar">
                    <div 
                      className="upload-progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="upload-progress-text">{uploadProgress}%</span>
                </div>
              )}
              
              <div className="modal-add-to-post">
                <span>Thêm vào bài viết của bạn</span>
                <div className="modal-add-actions">
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      disabled={loading}
                    />
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="#45bd62">
                      <g fillRule="evenodd">
                        <path d="M1.5 6a2.5 2.5 0 012.5-2.5h16a2.5 2.5 0 012.5 2.5v12a2.5 2.5 0 01-2.5 2.5H4a2.5 2.5 0 01-2.5-2.5V6zm2.5-.5A.5.5 0 004 6v11.293l3.146-3.147a.5.5 0 01.708 0l2.792 2.793 5.646-5.647a.5.5 0 01.708 0L20 14.293V6a.5.5 0 00-.5-.5H4z"></path>
                        <circle cx="8.5" cy="9.5" r="1.5"></circle>
                      </g>
                    </svg>
                  </label>
                  <button type="button" disabled={loading}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="#1877f2">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6H9l3-4 3 4h-2v6z"></path>
                    </svg>
                  </button>
                  <button type="button" disabled={loading}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="#f7b928">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.5 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="modal-submit-btn"
                disabled={loading || !content.trim()}
              >
                {loading ? 'Đang đăng...' : 'Đăng'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
