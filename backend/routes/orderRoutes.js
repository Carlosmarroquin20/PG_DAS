const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderStatistics, getTopBuyers, updateOrderState, deleteOrder, getOrderStatisticsByDate, getOrderStatisticsByState, getOrderStatisticsByDeliveryOption, getBestSellingProducts } = require('../controllers/orderController'); 
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

// Ruta para actualizar el estado de una orden 
router.put('/updatestate', updateOrderState);

// Ruta para eliminar un pedido
router.delete('/delete/:orderId', deleteOrder);

// Nueva ruta para obtener estadísticas por opciones de entrega
router.get('/statistics/delivery', getOrderStatisticsByDeliveryOption);

// Nueva ruta para obtener los productos más vendidos
router.get('/statistics/bestsellers', getBestSellingProducts);



module.exports = router;
