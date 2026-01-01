import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Social Media
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to={`/profile/${user?.id}`} className="navbar-item">
            Profile
          </Link>
          <button onClick={handleLogout} className="navbar-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
