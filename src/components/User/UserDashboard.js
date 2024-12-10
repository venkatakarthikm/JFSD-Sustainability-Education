import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css'; // Make sure this file includes the updated styles below
import config from './../config';

const UserDashboard = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('userDetails'));

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`${config.url}/admin/lessons`);
        setLessons(response.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };
    fetchLessons();
  }, []);

  const getYoutubeEmbedUrl = (youtubeLink) => {
    const url = new URL(youtubeLink);
    const videoId = url.searchParams.get('v') || url.pathname.split('/')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (selectedLesson) {
    return (
      <div className="lesson-view">
        <button onClick={() => setSelectedLesson(null)} className="back-button">
          ← Back
        </button>
        <div className="video-content">
          <h2 className="lesson-title">{selectedLesson.title}</h2>
          <p className="lesson-description">{selectedLesson.description}</p>
          <div className="video-frame">
            <iframe
              src={getYoutubeEmbedUrl(selectedLesson.youtubeLink)}
              title={selectedLesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Welcome, {currentUser?.name || 'User'}!</h2>
      <p className="welcome-message">Explore our lessons on sustainability and make a difference!</p>
      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <div
            className="lesson-card"
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
          >
            <img src={lesson.imageUrl} alt={lesson.title} className="card-image" />
            <h3 className="card-title">{lesson.title}</h3>
            <p className="card-description">{lesson.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;

