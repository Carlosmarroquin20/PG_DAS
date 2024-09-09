
const express = require('express');
const router = express.Router();
const { addReview } = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para verificar autenticación

// Ruta para agregar una nueva opinión (requiere autenticación)
router.post('/add', authMiddleware, addReview);

module.exports = router;
