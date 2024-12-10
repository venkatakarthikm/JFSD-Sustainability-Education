import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/SignIn';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import UserDashboard from './components/User/UserDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import Profile from './components/User/Profile';
import Certificates from './components/User/Certificates';
import LessonManager from './components/Admin/LessonManager';
import Home from './components/Home';
import Chapter from './components/Chapter'; // New chapter component
import DonationPage from './components/DonationPage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // A ProtectedRoute component that restricts access based on login status
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    return children;
  };

  // Redirect to dashboard if a logged-in user accesses login/signup
  const RedirectIfLoggedIn = ({ children }) => {
    if (currentUser) {
      const dashboard = currentUser.role === 'STUDENT' ? '/user-dashboard' : '/admin-dashboard';
      return <Navigate to={dashboard} />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        {/* Login & Signup Routes */}
        <Route 
          path="/login" 
          element={
            <RedirectIfLoggedIn>
              <Login setCurrentUser={setCurrentUser} />
            </RedirectIfLoggedIn>
          } 
        />
        <Route 
          path="/donate" 
          element={<DonationPage/>} 
        />
        <Route 
          path="/signup" 
          element={
            <RedirectIfLoggedIn>
              <Signup />
            </RedirectIfLoggedIn>
          } 
        />

        {/* User Dashboard and other User routes */}
        <Route 
          path="/user-dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/certificates" 
          element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          } 
        />

        {/* Admin Dashboard and lesson management */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/lessons" 
          element={
            <ProtectedRoute>
              <LessonManager />
            </ProtectedRoute>
          } 
        />

        {/* Chapter route */}
        <Route 
          path="/chapter/:id" 
          element={
            <ProtectedRoute>
              <Chapter /> {/* Component for individual chapters */}
            </ProtectedRoute>
          } 
        />

        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
