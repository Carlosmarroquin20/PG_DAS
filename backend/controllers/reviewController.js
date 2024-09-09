const Review = require('../models/Review');

const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const userId = req.user.id; // Obtener ID del usuario autenticado

        // Crear una nueva opinión (general, sin relación con productos)
        const newReview = new Review({
            user: userId,
            rating,
            comment,
            date: new Date(), // Fecha en la que se añade la reseña
        });

        await newReview.save();

        res.status(201).json({ message: 'Opinión agregada exitosamente', review: newReview });
    } catch (error) {
        console.error('Error al agregar la opinión:', error);
        res.status(500).json({ message: 'Error al agregar la opinión', error: error.message });
    }
};

module.exports = { addReview };
