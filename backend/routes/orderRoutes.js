const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders } = require('../controllers/orderController'); // Añade getAllOrders
const authMiddleware = require('../middlewares/authMiddleware'); // Importa authMiddleware

// Ruta para crear una nueva orden
router.post('/create', authMiddleware, createOrder);

// Ruta para obtener todas las órdenes (sin autenticación)
router.get('/allorders', getAllOrders);

module.exports = router;
