import React, { useState } from 'react';
import './YouTubeStyle.css';

const videos = [
  {
    id: 1,
    title: 'Saving Endangered Animals From Extinction',
    channel: 'Beast Philanthropy',
    views: '3.6M views',
    videoId: 'rvrBec5nT0g', // Reemplaza con el ID real del video de YouTube
  },
  {
    id: 2,
    title: 'La caída BRUTAL de MongoDB',
    channel: 'midulive',
    views: '101K views',
    videoId: 'krdjfNkPRZc', // Reemplaza con el ID real del video de YouTube
  },
  {
    id: 3,
    title: 'La caída BRUTAL de MongoDB',
    channel: 'midulive',
    views: '101K views',
    videoId: 'hejGIjxGt2s', // Reemplaza con el ID real del video de YouTube
  },
  {
    id: 4,
    title: 'La caída BRUTAL de MongoDB',
    channel: 'midulive',
    views: '101K views',
    videoId: 'C850U295CX4', // Reemplaza con el ID real del video de YouTube
  },
  {
    id: 5,
    title: 'La caída BRUTAL de MongoDB',
    channel: 'midulive',
    views: '101K views',
    videoId: 'QRtkBvdOo_A', // Reemplaza con el ID real del video de YouTube
  },
];

const YouTubeComponent = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="youtube-container">
      {selectedVideo ? (
        <div className="video-display">
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button className="back-button" onClick={() => setSelectedVideo(null)}>
            Atrás
          </button>
        </div>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-item" onClick={() => setSelectedVideo(video)}>
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
                alt={video.title}
                className="thumbnail"
              />
              <div className="video-info">
                <h4>{video.title}</h4>
                <p>{video.channel}</p>
                <p>{video.views}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTubeComponent;
