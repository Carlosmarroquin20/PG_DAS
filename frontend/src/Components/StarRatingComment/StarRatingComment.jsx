import React, { useState } from 'react';
import './StarRatingComment.css';

const StarRatingComment = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el token desde localStorage usando la clave 'auth-token'
    const token = localStorage.getItem('auth-token'); 

    if (!token) {
      setError('No estás autenticado. Por favor, inicia sesión primero.');
      return;
    }

    try {
        const response = await fetch('http://localhost:4000/api/reviews/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token // Enviar token del usuario autenticado en el header
            },
            body: JSON.stringify({
                rating,
                comment,
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Opinión enviada:', data);
            setSuccess('Tu opinión ha sido enviada con éxito.');
            // Limpiar formulario después de enviar
            setRating(0);
            setComment('');
        } else {
            setError('Error al enviar la opinión: ' + data.message);
        }
    } catch (error) {
        setError('Error al enviar la opinión: ' + error.message);
    }
  };

  return (
    <div className="star-rating-comment">
      <h2>Deja tu opinión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
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
