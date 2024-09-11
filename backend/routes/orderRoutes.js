const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderStatistics, getTopBuyers, updateOrderState, deleteOrder, getOrderStatisticsByDate, getOrderStatisticsByState, getOrderStatisticsByDeliveryOption } = require('../controllers/orderController'); 
const authMiddleware = require('../middlewares/authMiddleware'); 

// Ruta para crear una nueva orden (requiere autenticación)
router.post('/create', authMiddleware, createOrder);

// Ruta para obtener todas las órdenes (sin autenticación)
router.get('/allorders', getAllOrders);

// Ruta para obtener las estadísticas generales (sin autenticación)
router.get('/statistics', getOrderStatistics);

// Ruta para obtener las estadísticas por fecha (día, mes, año)
router.get('/statistics/date', getOrderStatisticsByDate); // Nueva ruta

// Ruta para obtener las estadísticas por estado (Pendiente, En Proceso, Entregada)
router.get('/statistics/state', getOrderStatisticsByState); 

// Ruta para obtener los principales compradores (sin autenticación)
router.get('/topbuyers', getTopBuyers);

// Ruta para actualizar el estado de una orden (requiere autenticación y permisos de admin)
router.put('/updatestate', updateOrderState);

// Ruta para eliminar un pedido
router.delete('/delete/:orderId', deleteOrder);

// Nueva ruta para obtener estadísticas por opciones de entrega
router.get('/statistics/delivery', getOrderStatisticsByDeliveryOption);


module.exports = router;
