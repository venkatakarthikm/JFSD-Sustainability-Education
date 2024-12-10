import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from './config';

const Login = ({ setCurrentUser }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${config.url}/auth/login`, loginData);
      const user = res.data;

      // Save the user details to localStorage and update state
      localStorage.setItem('userDetails', JSON.stringify(user));
      setCurrentUser(user);

      // Redirect based on role
      if (user.role === 'ADMIN') {
        navigate('/admin-dashboard');
        window.location.reload();
      } else if (user.role === 'STUDENT') {
        navigate('/user-dashboard');
        window.location.reload();
      }
    } catch (error) {
      console.error(error.response ? error.response.data : 'Login failed!');
      
      // Show custom toast notification on failure
      toast.error('Login failed! Please check your credentials and try again.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div>
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={loginData.email}
        onChange={handleLoginInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loginData.password}
        onChange={handleLoginInputChange}
      />
      <button onClick={handleLogin} disabled={!loginData.email || !loginData.password}>
        Login
      </button>
      <div className="switch-link">
        <p>Don't have an account? <button onClick={handleSignupRedirect}>Sign Up</button></p>
      </div>

      {/* Toast notification container */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
