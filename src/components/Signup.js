import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './Signup.css';
import config from './config';

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    password: '',
    email: '',
    age: '',
    role: 'STUDENT',
  });
  const [otp, setOtp] = useState(''); // Stored OTP for verification
  const [enteredOtp, setEnteredOtp] = useState(''); // OTP entered by the user
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const sendOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    setOtp(generatedOtp.toString()); // Store OTP to verify later

    // Send OTP via email using EmailJS
    const emailParams = {
      to_email: userData.email,
      otp: generatedOtp.toString(),
    };

    emailjs.send(
      'default_service',
      'template_5e30u0j',
      emailParams,
      'yXwnA8Bhd2JORQ9W9'
    )
      .then((response) => {
        console.log('OTP sent successfully!', response);
        setIsOtpSent(true); // Mark OTP as sent
      })
      .catch((error) => {
        console.error('Error sending OTP', error);
        alert('Failed to send OTP. Please try again.');
      });
  };

  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setIsOtpVerified(true); // OTP verified
      alert('OTP verified successfully! Please complete your registration.');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleSignup = async () => {
    if (!isOtpVerified) {
      alert('Please verify your OTP first!');
      return;
    }

    try {
      const res = await axios.post(`${config.url}/auth/signup`, userData);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert(error.response ? error.response.data : 'Signup failed!');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={userData.username}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={userData.name}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={userData.age}
        onChange={handleInputChange}
      />
      <select
        name="role"
        value={userData.role}
        onChange={handleInputChange}
      >
        <option value="STUDENT">Student</option>
        <option value="ADMIN">Admin</option>
      </select>

      {!isOtpSent ? (
        <button onClick={sendOtp} disabled={!userData.email}>
          Send OTP
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)} // Capture entered OTP
          />
          <button onClick={verifyOtp} disabled={!enteredOtp}>
            Verify OTP
          </button>
        </>
      )}
      <br/>

      {isOtpVerified && (
        <button onClick={handleSignup} disabled={!userData.username || !userData.name || !userData.password || !userData.email}>
          Sign Up
        </button>
      )}

      <div className="switch-link">
        <p>Already have an account? <button onClick={handleLoginRedirect}>Login</button></p>
      </div>
    </div>
  );
};

export default SignUp;
