import React from 'react';
import './VideoPage.css'; // Importa el archivo CSS de VideoPage

const VideoPage = () => {
  return (
    <div className="video-page">
      <h1>Videos de YouTube</h1>
      <div className="video-container">
        {/* Primer video */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/85kTHwJ1Ju8"
          title="YouTube video player 1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default VideoPage;
