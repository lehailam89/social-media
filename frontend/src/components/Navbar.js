import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Section */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <svg viewBox="0 0 36 36" fill="currentColor" height="40" width="40">
              <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z"></path>
              <path fill="#fff" d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z"></path>
            </svg>
          </Link>
          <div className="navbar-search">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <g fillRule="evenodd" transform="translate(-448 -544)">
                <path d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z" transform="translate(448 544)"></path>
                <path d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z" transform="translate(448 544)"></path>
                <path d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z" transform="translate(448 544)"></path>
                <path d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z" transform="translate(448 544)"></path>
              </g>
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm trên Facebook"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Center Section */}
        {user && (
          <div className="navbar-center">
            <Link to="/" className={`navbar-center-item ${isActive('/') ? 'active' : ''}`}>
              <svg viewBox="0 0 28 28" height="28" width="28">
                <path d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 13.989 2.521 13.608 2.527 13.248 2.675 13.001 2.912L2.175 12.29C1.756 12.658 1.629 13.245 1.868 13.759 2.079 14.215 2.567 14.479 3.069 14.479L5 14.479 5 23.729C5 24.695 5.784 25.479 6.75 25.479L11 25.479C11.552 25.479 12 25.031 12 24.479L12 18.309C12 18.126 12.148 17.979 12.33 17.979L15.67 17.979C15.852 17.979 16 18.126 16 18.309L16 24.479C16 25.031 16.448 25.479 17 25.479L21.25 25.479C22.217 25.479 23 24.695 23 23.729L23 14.479 24.931 14.479C25.433 14.479 25.921 14.215 26.132 13.759 26.371 13.245 26.244 12.658 25.825 12.29"></path>
              </svg>
            </Link>
            <Link to="/watch" className={`navbar-center-item ${isActive('/watch') ? 'active' : ''}`}>
              <svg viewBox="0 0 28 28" height="28" width="28">
                <path d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5 8 24.086 8.336 23.75 8.75 23.75L19.25 23.75C19.664 23.75 20 24.086 20 24.5 20 24.914 19.664 25.25 19.25 25.25L8.75 25.25ZM17.163 12.846 12.055 15.923C11.591 16.202 11 15.869 11 15.327L11 9.172C11 8.631 11.591 8.297 12.055 8.576L17.163 11.654C17.612 11.924 17.612 12.575 17.163 12.846ZM21.75 20.25C22.992 20.25 24 19.242 24 18L24 6.5C24 5.258 22.992 4.25 21.75 4.25L6.25 4.25C5.008 4.25 4 5.258 4 6.5L4 18C4 19.242 5.008 20.25 6.25 20.25L21.75 20.25ZM21.75 21.75 6.25 21.75C4.179 21.75 2.5 20.071 2.5 18L2.5 6.5C2.5 4.429 4.179 2.75 6.25 2.75L21.75 2.75C23.821 2.75 25.5 4.429 25.5 6.5L25.5 18C25.5 20.071 23.821 21.75 21.75 21.75Z"></path>
              </svg>
            </Link>
            <Link to="/marketplace" className={`navbar-center-item ${isActive('/marketplace') ? 'active' : ''}`}>
              <svg viewBox="0 0 28 28" height="28" width="28">
                <path d="M17.5 23.75 21.75 23.75C22.164 23.75 22.5 23.414 22.5 23L22.5 14 22.531 14C22.364 13.917 22.206 13.815 22.061 13.694L21.66 13.359C21.567 13.283 21.433 13.283 21.34 13.36L21.176 13.497C20.591 13.983 19.855 14.25 19.095 14.25L18.869 14.25C18.114 14.25 17.379 13.987 16.794 13.506L16.058 12.917C15.974 12.849 15.856 12.849 15.772 12.917L15.036 13.506C14.451 13.987 13.716 14.25 12.961 14.25L12.735 14.25C11.975 14.25 11.239 13.983 10.654 13.497L10.490 13.360C10.397 13.283 10.263 13.283 10.170 13.359L9.769 13.694C9.624 13.815 9.466 13.917 9.299 14L9.33 14 9.33 23C9.33 23.414 9.666 23.75 10.08 23.75L14.33 23.75C14.744 23.75 15.08 23.414 15.08 23L15.08 17.5C15.08 17.086 15.416 16.75 15.83 16.75L16.58 16.75C16.994 16.75 17.33 17.086 17.33 17.5L17.33 23C17.33 23.414 17.666 23.75 18.08 23.75L17.5 23.75ZM25.061 8.694C25.645 9.197 25.924 9.945 25.792 10.692L24.699 16.692C24.495 17.877 23.494 18.75 22.295 18.75L21.75 18.75 21.75 14 21.781 14C22.151 13.839 22.5 13.619 22.811 13.344L23.213 13.009C23.593 12.694 24.078 12.562 24.555 12.644 24.613 12.654 24.671 12.667 24.728 12.683L25.061 8.694ZM3.769 13.344C4.080 13.619 4.429 13.839 4.799 14L4.83 14 4.83 18.75 4.285 18.75C3.086 18.75 2.085 17.877 1.881 16.692L0.788 10.692C0.656 9.945 0.935 9.197 1.519 8.694L3.769 13.344ZM21.75 25.25 10.08 25.25C8.838 25.25 7.83 24.242 7.83 23L7.83 14.537C7.248 14.192 6.748 13.729 6.362 13.178L4.112 8.528C3.984 8.320 3.926 8.077 3.943 7.833 3.982 7.307 4.339 6.861 4.838 6.699L11.153 4.699C11.309 4.648 11.469 4.616 11.63 4.604 11.954 4.581 12.279 4.668 12.546 4.856L14.008 5.931C14.263 6.109 14.604 6.109 14.859 5.931L16.321 4.856C16.588 4.668 16.913 4.581 17.237 4.604 17.398 4.616 17.558 4.648 17.714 4.699L24.029 6.699C24.528 6.861 24.885 7.307 24.924 7.833 24.941 8.077 24.883 8.320 24.755 8.528L22.505 13.178C22.119 13.729 21.619 14.192 21.037 14.537L21.037 23C21.037 24.242 20.029 25.25 18.787 25.25L21.75 25.25Z"></path>
              </svg>
            </Link>
            <Link to="/groups" className={`navbar-center-item ${isActive('/groups') ? 'active' : ''}`}>
              <svg viewBox="0 0 28 28" height="28" width="28">
                <path d="M25.5 14C25.5 7.649 20.351 2.5 14 2.5 7.649 2.5 2.5 7.649 2.5 14 2.5 20.351 7.649 25.5 14 25.5 20.351 25.5 25.5 20.351 25.5 14ZM27 14C27 21.18 21.18 27 14 27 6.82 27 1 21.18 1 14 1 6.82 6.82 1 14 1 21.18 1 27 6.82 27 14ZM7.479 14 7.631 14C7.933 14 8.102 14.338 7.934 14.591 7.334 15.491 6.983 16.568 6.983 17.724L6.983 18.221C6.983 18.342 6.99 18.461 7.004 18.578 7.03 18.802 6.862 19 6.637 19L6.123 19C5.228 19 4.5 18.25 4.5 17.327 4.5 15.492 5.727 14 7.479 14ZM20.521 14C22.273 14 23.5 15.492 23.5 17.327 23.5 18.25 22.772 19 21.877 19L21.363 19C21.138 19 20.97 18.802 20.996 18.578 21.01 18.461 21.017 18.342 21.017 18.221L21.017 17.724C21.017 16.568 20.666 15.491 20.066 14.591 19.898 14.338 20.067 14 20.369 14L20.521 14ZM8.25 13C7.147 13 6.25 11.991 6.25 10.75 6.25 9.384 7.035 8.5 8.25 8.5 9.465 8.5 10.25 9.384 10.25 10.75 10.25 11.991 9.353 13 8.25 13ZM19.75 13C18.647 13 17.75 11.991 17.75 10.75 17.75 9.384 18.535 8.5 19.75 8.5 20.965 8.5 21.75 9.384 21.75 10.75 21.75 11.991 20.853 13 19.75 13ZM15.172 13.5C17.558 13.5 19.5 15.395 19.5 17.724L19.5 18.221C19.5 19.202 18.683 20 17.677 20L10.323 20C9.317 20 8.5 19.202 8.5 18.221L8.5 17.724C8.5 15.395 10.442 13.5 12.828 13.5L15.172 13.5ZM16.75 9.75C16.75 11.483 15.517 13 14 13 12.483 13 11.25 11.483 11.25 9.75 11.25 7.917 12.483 6.5 14 6.5 15.517 6.5 16.75 7.917 16.75 9.75Z"></path>
              </svg>
            </Link>
            <Link to="/gaming" className={`navbar-center-item ${isActive('/gaming') ? 'active' : ''}`}>
              <svg viewBox="0 0 28 28" height="28" width="28">
                <path d="M23.5 9.5H10.25a.75.75 0 00-.75.75v7c0 .414.336.75.75.75H17v5.5H4.5v-19h19v5zm0 14h-5v-6.25a.75.75 0 00-.75-.75H11V11h12.5v12.5zm1.5.25V4.25C25 3.561 24.439 3 23.75 3H4.25C3.561 3 3 3.561 3 4.25v19.5c0 .689.561 1.25 1.25 1.25h19.5c.689 0 1.25-.561 1.25-1.25z"></path>
              </svg>
            </Link>
          </div>
        )}

        {/* Right Section */}
        {user && (
          <div className="navbar-right">
            <button className="navbar-icon-btn">
              <svg viewBox="0 0 20 20" width="20" height="20">
                <g fillRule="evenodd" transform="translate(-446 -350)">
                  <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                </g>
              </svg>
            </button>
            <button className="navbar-icon-btn">
              <svg viewBox="0 0 28 28" height="20" width="20">
                <path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z"></path>
              </svg>
            </button>
            <button className="navbar-icon-btn">
              <svg viewBox="0 0 28 28" height="20" width="20">
                <path d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path>
              </svg>
            </button>
            <div className="navbar-account-menu" ref={menuRef}>
              <button 
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="navbar-profile"
              >
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`} 
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </button>
              
              {showAccountMenu && (
                <div className="account-menu-dropdown">
                  <Link 
                    to={`/profile/${user._id || user.id}`}
                    onClick={() => setShowAccountMenu(false)}
                    className="account-menu-profile"
                  >
                    <img 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`} 
                      alt={`${user.firstName} ${user.lastName}`}
                      className="account-menu-avatar"
                    />
                    <span className="account-menu-name">
                      {user.firstName} {user.lastName}
                    </span>
                  </Link>
                  
                  <div className="account-menu-divider"></div>
                  
                  <button className="account-menu-item">
                    <div className="account-menu-icon">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                        <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9.5 5a1.5 1.5 0 11.001 3.001A1.5 1.5 0 019.5 5zm.5 9.5c-2.209 0-4-1.791-4-4a.5.5 0 011 0c0 1.657 1.343 3 3 3s3-1.343 3-3a.5.5 0 011 0c0 2.209-1.791 4-4 4z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="account-menu-title">Cài đặt và quyền riêng tư</div>
                    </div>
                  </button>
                  
                  <button className="account-menu-item">
                    <div className="account-menu-icon">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                        <path d="M10 1a1 1 0 011 1v1.323a8.5 8.5 0 015.657 2.02l.937-.938a1 1 0 011.414 1.415l-.938.937A8.5 8.5 0 0118.677 11H20a1 1 0 110 2h-1.323a8.5 8.5 0 01-2.02 5.657l.938.937a1 1 0 01-1.415 1.414l-.937-.938A8.5 8.5 0 0111 20.677V22a1 1 0 11-2 0v-1.323a8.5 8.5 0 01-5.657-2.02l-.937.938a1 1 0 01-1.414-1.415l.938-.937A8.5 8.5 0 011.323 13H0a1 1 0 110-2h1.323a8.5 8.5 0 012.02-5.657l-.938-.937a1 1 0 011.415-1.414l.937.938A8.5 8.5 0 019 3.323V2a1 1 0 011-1zm4 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM10 13a3 3 0 100-6 3 3 0 000 6z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="account-menu-title">Trợ giúp và hỗ trợ</div>
                    </div>
                  </button>
                  
                  <button className="account-menu-item">
                    <div className="account-menu-icon">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                        <path d="M10 1a2 2 0 00-2 2v1.697a.5.5 0 01-.5.5H6a.5.5 0 00-.5.5v1.607a.5.5 0 00.5.5h1.5a.5.5 0 01.5.5v1.394a.5.5 0 01-.5.5H6a.5.5 0 00-.5.5v1.607a.5.5 0 00.5.5h1.5a.5.5 0 01.5.5V19a1 1 0 102 0v-5.697a.5.5 0 01.5-.5H14a.5.5 0 00.5-.5v-1.607a.5.5 0 00-.5-.5h-1.5a.5.5 0 01-.5-.5V8.303a.5.5 0 01.5-.5H14a.5.5 0 00.5-.5V5.697a.5.5 0 00-.5-.5h-1.5a.5.5 0 01-.5-.5V3a2 2 0 00-2-2z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="account-menu-title">Màn hình và trợ năng</div>
                    </div>
                  </button>
                  
                  <button className="account-menu-item">
                    <div className="account-menu-icon">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                        <path d="M18 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-4.5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18 15a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="account-menu-title">Đóng góp ý kiến</div>
                      <div className="account-menu-subtitle">CTRL B</div>
                    </div>
                  </button>
                  
                  <div className="account-menu-divider"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="account-menu-item"
                  >
                    <div className="account-menu-icon">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                        <path d="M8 10a.5.5 0 01.5-.5h7.793l-2.147-2.146a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L16.293 10.5H8.5A.5.5 0 018 10zM5 3a2 2 0 00-2 2v10a2 2 0 002 2h3a.5.5 0 000-1H5a1 1 0 01-1-1V5a1 1 0 011-1h3a.5.5 0 000-1H5z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="account-menu-title">Đăng xuất</div>
                    </div>
                  </button>
                  
                  <div className="account-menu-footer">
                    Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo 
                    <svg viewBox="0 0 12 12" width="11" height="11" fill="currentColor" style={{margin: '0 4px'}}>
                      <path d="M5 1h2v4h2l-3 3-3-3h2V1z"></path>
                    </svg>
                    · Cookie · Xem thêm
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
