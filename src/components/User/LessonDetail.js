import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './LessonDetail.css'; // Optional CSS file
import config from './../config';

const LessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`${config.url}/admin/lessons/${id}`); // Adjust endpoint
        setLesson(response.data);
      } catch (error) {
        console.error('Error fetching lesson details:', error);
      }
    };
    fetchLesson();
  }, [id]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${lesson.youtubeLink.split('v=')[1]}`;

  return (
    <div className="lesson-detail">
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <div className="video-container">
        <iframe
          src={youtubeEmbedUrl}
          title={lesson.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default LessonDetail;
