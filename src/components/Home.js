import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css'; // Importing CSS for styling

const Home = () => {
  const lessons = [
    {
      id: 1,
      title: "Lesson 1: Reduce, Reuse, Recycle",
      description: "Learn the basics of waste management and how to reduce waste effectively.",
      img: "https://images.herzindagi.info/image/2023/Aug/reduce-reuse-recycle-importance.jpg" // Replace with your image link
    },
    {
      id: 2,
      title: "Lesson 2: Energy Conservation",
      description: "Discover simple ways to save energy and reduce your carbon footprint.",
      img: "https://img.freepik.com/free-vector/save-world-design-flat-style_24877-60056.jpg" // Replace with your image link
    },
    {
      id: 3,
      title: "Lesson 3: Sustainable Living",
      description: "Explore tips and tricks for adopting a sustainable lifestyle.",
      img: "https://completewellbeing.com/wp-content/uploads/2019/10/a-3-step-beginners-guide-to-sustainable-living.jpg" // Replace with your image link
    }
  ];

  return (
    <div className="home">
      <h1>Welcome to Sustainability App</h1>
      <p>Explore lessons, projects, and videos on sustainability.</p>
      <div className="lessons">
        {lessons.map((lesson) => (
          <div className="card" key={lesson.id}>
            <Link to={`/chapter/${lesson.id}`} className="card-link">
              <img src={lesson.img} alt={lesson.title} />
              <h2>{lesson.title}</h2>
              <p>{lesson.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
