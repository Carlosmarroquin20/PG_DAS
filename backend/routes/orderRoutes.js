const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importación corregida

console.log('createOrder:', createOrder); // Verifica si createOrder es undefined
console.log('authMiddleware:', authMiddleware); // Verifica si authMiddleware es undefined

// Ruta para crear una nueva orden
router.post('/create', authMiddleware, createOrder);

module.exports = router;
