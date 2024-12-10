import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Import the necessary CSS file
import config from './../config';

const AdminDashboard = () => {
  const [lessons, setLessons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [title, setTitle] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);

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

  const handleAddLesson = async () => {
    try {
      const newLesson = { title, description: 'Sample description', imageUrl: 'default-image-url' }; // Adjust the lesson data
      await axios.post(`${config.url}/admin/lessons`, newLesson);
      setTitle('');
      setLessons([...lessons, newLesson]); // Add the new lesson to the state
      alert('Lesson added!');
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      await axios.delete(`${config.url}/admin/lessons/${lessonId}`);
      setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const getYoutubeEmbedUrl = (youtubeLink) => {
    const url = new URL(youtubeLink);
    const videoId = url.searchParams.get('v') || url.pathname.split('/')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const filteredLessons = lessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <h2>Admin Dashboard</h2>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="add-lesson-container">
        {/* <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddLesson}>Add Lesson</button> */}
      </div>

      <div className="lessons-grid">
        {filteredLessons.map((lesson) => (
          <div
            className="lesson-card"
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
          >
            <img src={lesson.imageUrl} alt={lesson.title} className="card-image" />
            <h3 className="card-title">{lesson.title}</h3>
            <p className="card-description">{lesson.description}</p>
            <button onClick={() => handleDeleteLesson(lesson.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
