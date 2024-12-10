import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  // Set the logout timeout duration (in milliseconds)
  const logoutTimeoutDuration = 30 * 60 * 1000; // 30 minutes

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    setCurrentUser(null); // Clear current user state
    navigate('/login');
  };

  useEffect(() => {
    if (currentUser) {
      const timer = setTimeout(() => {
        handleLogout();
      }, logoutTimeoutDuration);

      // Cleanup timer when the component unmounts or the user logs out
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  return (
    <nav>
      <div className="logo">
        <div className="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C10.6 2 9.3 3 9.3 3.7c0 .3.1.6.3.9.7.9 2.1 1.6 3.3 3.4.5.8 1.4 1.6 2.3 2.3 1.1 1.1 2.2 2.4 2.5 4 1.4 1.3 2.4 2.9 2.4 5 0 1.4-.3 2.9-.9 4.2-.6 1.3-1.5 2.3-2.5 3.3-.9 1-2 2.1-3.3 2.7-2.3 1.1-4.6 1.1-6.9 0-1.3-.6-2.4-1.7-3.3-2.7-.9-.9-1.9-2-2.5-3.3-.6-1.3-.9-2.8-.9-4.2 0-2.1 1-3.7 2.4-5 1.1-1.6 2.4-2.9 3.5-4.2.6-.7 1.7-1.3 2.5-2 .4-.3.9-.6 1.4-.8C14.7 3.2 14.2 2 12 2z"/>
          </svg>
        </div>
        <Link to="/user-dashboard">EcoLearn</Link>
      </div>
      <ul>
        {currentUser ? (
          ""
        ) : (
          <li><Link to="/">Home</Link></li>
        )}
        {currentUser?.role === 'STUDENT' && (
          <>
            <li><Link to="/user-dashboard">Dashboard</Link></li>
            <li><Link to="/user/profile">Profile</Link></li>
            <li><Link to="/">Free Plan content</Link></li>
            <li><Link to="/Donate">Donate us</Link></li>
          </>
        )}
        {currentUser?.role === 'ADMIN' && (
          <>
            <li><Link to="/admin-dashboard">Dashboard</Link></li>
            <li><Link to="/admin/lessons">Manage Lessons</Link></li>
            <li><Link to="/admin/student-data">Student Data</Link></li>
            <li><Link to="/Donate">Donate us</Link></li>
          </>
        )}
        {currentUser ? (
          <li><button onClick={handleLogout}>Logout</button></li>
        ) : (
          <li><Link to="/login">Login</Link>
          <Link to="/Donate">Donate us</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
