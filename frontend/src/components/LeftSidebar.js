import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './LeftSidebar.css';

const LeftSidebar = () => {
  const { user, logout } = useContext(AuthContext);

  const menuItems = [
    {
      icon: (
        <svg viewBox="0 0 36 36" width="36" height="36">
          <path d="M18 0C8.059 0 0 8.059 0 18s8.059 18 18 18 18-8.059 18-18S27.941 0 18 0zm0 33C9.729 33 3 26.271 3 18S9.729 3 18 3s15 6.729 15 15-6.729 15-15 15z" fill="#65676B"></path>
        </svg>
      ),
      label: 'Meta AI',
      link: '/meta-ai'
    },
    {
      icon: (
        <svg viewBox="0 0 36 36" fill="#1876F2" width="36" height="36">
          <path d="M9 9a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm6 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm8 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM9 19a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm6 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm8 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM9 29a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm6 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm8 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"></path>
        </svg>
      ),
      label: 'Bạn bè',
      link: '/friends'
    },
    {
      icon: (
        <svg viewBox="0 0 36 36" fill="#1876F2" width="36" height="36">
          <path d="M18 1.5C9.029 1.5 1.5 9.029 1.5 18S9.029 34.5 18 34.5 34.5 26.971 34.5 18 26.971 1.5 18 1.5zM8.25 18a9.77 9.77 0 0 1 9.75-9.75c1.949 0 3.75.571 5.272 1.558l-1.72 1.72A7.452 7.452 0 0 0 18 10.5a7.5 7.5 0 1 0 7.5 7.5c0-1.261-.313-2.448-.863-3.493l1.72-1.72A9.72 9.72 0 0 1 27.75 18 9.77 9.77 0 0 1 18 27.75 9.77 9.77 0 0 1 8.25 18zm15.22-4.28l-6.72 6.72-2.97-2.97-1.28 1.28 4.25 4.25 8-8z"></path>
        </svg>
      ),
      label: 'Nhóm',
      link: '/groups'
    },
    {
      icon: (
        <svg viewBox="0 0 36 36" fill="#F7B928" width="36" height="36">
          <path d="M13.5 16.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6.5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm3.5 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
          <path d="M18 2.5c8.547 0 15.5 6.953 15.5 15.5S26.547 33.5 18 33.5A15.421 15.421 0 0 1 5.5 28.023v3.727a1.25 1.25 0 0 1-2.5 0V27c0-.69.56-1.25 1.25-1.25h4.75a1.25 1.25 0 0 1 0 2.5H5.1C7.034 31.528 12.25 31 18 31c7.456 0 13.5-6.044 13.5-13.5S25.456 4 18 4 4.5 10.044 4.5 17.5c0 1.76.338 3.434.953 4.971a1.25 1.25 0 1 1-2.326.954A15.421 15.421 0 0 1 2.5 18C2.5 9.453 9.453 2.5 18 2.5z"></path>
        </svg>
      ),
      label: 'Kỷ niệm',
      link: '/memories'
    },
    {
      icon: (
        <svg viewBox="0 0 36 36" fill="#8A3AB9" width="36" height="36">
          <path d="M32.25 9.75v15a6.75 6.75 0 01-6.75 6.75h-15a6.75 6.75 0 01-6.75-6.75v-15a6.75 6.75 0 016.75-6.75h15a6.75 6.75 0 016.75 6.75zm-2.5 0a4.25 4.25 0 00-4.25-4.25h-15a4.25 4.25 0 00-4.25 4.25v15a4.25 4.25 0 004.25 4.25h15a4.25 4.25 0 004.25-4.25v-15zm-7.5 11l-7.09 4.09a.5.5 0 01-.75-.43V11.59a.5.5 0 01.75-.43l7.09 4.09a.5.5 0 010 .87z"></path>
        </svg>
      ),
      label: 'Đã lưu',
      link: '/saved'
    },
    {
      icon: (
        <svg viewBox="0 0 36 36" fill="#F02849" width="36" height="36">
          <path d="M18 4.5a13.5 13.5 0 100 27 13.5 13.5 0 000-27zM2 18C2 9.163 9.163 2 18 2s16 7.163 16 16-7.163 16-16 16S2 26.837 2 18z"></path>
          <path d="M12.465 12.993a1.25 1.25 0 011.768-.183l4.512 3.592a.25.25 0 00.31 0l4.512-3.592a1.25 1.25 0 111.562 1.951l-4.512 3.592a2.75 2.75 0 01-3.422 0l-4.512-3.592a1.25 1.25 0 01-.218-1.768z"></path>
        </svg>
      ),
      label: 'Thước phim',
      link: '/reels'
    }
  ];

  return (
    <div className="left-sidebar">
      <div className="left-sidebar-content">
        {user && (
          <Link to={`/profile/${user._id || user.id}`} className="sidebar-item">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`} 
              alt={`${user.firstName} ${user.lastName}`}
              className="sidebar-avatar"
            />
            <span>{user.firstName} {user.lastName}</span>
          </Link>
        )}

        {menuItems.map((item, index) => (
          <Link key={index} to={item.link} className="sidebar-item">
            <div className="sidebar-icon">{item.icon}</div>
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="sidebar-divider"></div>

        <div className="sidebar-shortcuts">
          <div className="sidebar-shortcuts-header">
            <span>Lối tắt của bạn</span>
          </div>
          <Link to="/groups/1" className="sidebar-item">
            <img 
              src="https://via.placeholder.com/36/FF5733/FFFFFF?text=G1" 
              alt="Group 1"
              className="sidebar-avatar"
            />
            <span>Nhóm thông tin sinh viên NEU</span>
          </Link>
          <Link to="/groups/2" className="sidebar-item">
            <img 
              src="https://via.placeholder.com/36/33A1FF/FFFFFF?text=G2" 
              alt="Group 2"
              className="sidebar-avatar"
            />
            <span>TUYỂN DỤNG SINH VIÊN MỚI RA TRƯỜNG</span>
          </Link>
        </div>

        {user && (
          <button onClick={logout} className="sidebar-item sidebar-logout">
            <div className="sidebar-icon">
              <svg viewBox="0 0 36 36" fill="#050505" width="36" height="36">
                <path d="M18 2a16 16 0 1016 16A16 16 0 0018 2zm0 30a14 14 0 1114-14 14 14 0 01-14 14zm8-15h-7V9a1 1 0 00-2 0v8H10a1 1 0 000 2h7v8a1 1 0 002 0v-8h7a1 1 0 000-2z"></path>
              </svg>
            </div>
            <span>Đăng xuất</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
