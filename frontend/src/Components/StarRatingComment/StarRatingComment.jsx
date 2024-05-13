import React, { useState } from 'react';
import './StarRatingComment.css';

const StarRatingComment = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    // Aquí podrías enviar los datos a tu servidor o realizar cualquier otra acción con ellos
  };

  return (
    <div className="star-rating-comment">
      <h2>Deja tu opinión</h2>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "star filled" : "star"}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Deja un comentario..."
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default StarRatingComment;
