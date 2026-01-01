import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Stories.css';

const Stories = () => {
  const { user } = useContext(AuthContext);

  const stories = [
    {
      id: 1,
      userName: 'Nguyễn Quang Khanh',
      userAvatar: 'https://ui-avatars.com/api/?name=Nguyen+Quang+Khanh&background=random',
      storyImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop'
    },
    {
      id: 2,
      userName: 'Phạm Hương',
      userAvatar: 'https://ui-avatars.com/api/?name=Pham+Huong&background=random',
      storyImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop'
    },
    {
      id: 3,
      userName: 'Bách In',
      userAvatar: 'https://ui-avatars.com/api/?name=Bach+In&background=random',
      storyImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop'
    }
  ];

  return (
    <div className="stories-container">
      {/* Create Story */}
      <div className="story-card create-story">
        <div className="story-background">
          <img 
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`} 
            alt="Your story"
          />
        </div>
        <div className="create-story-button">
          <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
            <g fillRule="evenodd" transform="translate(-446 -350)">
              <path d="M456 360a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-4.5 2a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0"></path>
              <path d="M456 355.5c.552 0 1 .448 1 1v3h3c.552 0 1 .448 1 1s-.448 1-1 1h-3v3c0 .552-.448 1-1 1s-1-.448-1-1v-3h-3c-.552 0-1-.448-1-1s.448-1 1-1h3v-3c0-.552.448-1 1-1"></path>
            </g>
          </svg>
        </div>
        <p className="story-label">Tạo tin</p>
      </div>

      {/* User Stories */}
      {stories.map(story => (
        <div key={story.id} className="story-card">
          <div className="story-background">
            <img src={story.storyImage} alt={story.userName} />
          </div>
          <div className="story-avatar">
            <img src={story.userAvatar} alt={story.userName} />
          </div>
          <p className="story-username">{story.userName}</p>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button className="story-nav-btn next">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M9.209 5.207L16 12l-6.791 6.793a1 1 0 101.415 1.414l7.5-7.5a1 1 0 000-1.414l-7.5-7.5a1 1 0 10-1.415 1.414z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Stories;
