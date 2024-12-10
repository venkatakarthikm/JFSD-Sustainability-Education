import React from 'react';
import { useParams } from 'react-router-dom';

const Chapter = () => {
  const { id } = useParams(); 

  const chapterData = {
    1: {
      title: "Reduce, Reuse, Recycle",
      video: "https://www.youtube.com/embed/OasbYWF4_S8"
    },
    2: {
      title: "Energy Conservation",
      video: "https://www.youtube.com/embed/UVf2Yw7uFoE"
    },
    3: {
      title: "Sustainable Living",
      video: "https://www.youtube.com/embed/5bVDpmzMICE"
    }
  };

  const chapter = chapterData[id];

  if (!chapter) {
    return <p>Chapter not found or video is unavailable.</p>;
  }

  return (
    <div>
      <h1>{chapter.title}</h1>
      <div style={{ textAlign: "center" }}>
        <iframe
          width="800"
          height="450"
          src={chapter.video}
          title={chapter.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Chapter;
