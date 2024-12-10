// src/components/Notification.js

import React from 'react';
import './Notification .css';  // Make sure you have the corresponding CSS file

const Notification = ({ message, type }) => {
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
