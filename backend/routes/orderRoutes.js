const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderStatistics, getTopBuyers } = require('../controllers/orderController'); 
const authMiddleware = require('../middlewares/authMiddleware'); // Asegúrate de que la ruta sea correcta

// Ruta para crear una nueva orden (requiere autenticación)
router.post('/create', authMiddleware, createOrder);

// Ruta para obtener todas las órdenes (sin autenticación)
router.get('/allorders', getAllOrders);

// Ruta para obtener las estadísticas (sin autenticación)
router.get('/statistics', getOrderStatistics);

// Ruta para obtener los principales compradores (sin autenticación)
router.get('/topbuyers', getTopBuyers);

module.exports = router;
