const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Función para crear una orden
const createOrder = async (req, res) => {
    try {
        const { userId, products, total, deliveryOption, address, phone, extraPhone, comment } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'El carrito de compras está vacío' });
        }

        const orderProducts = [];
        for (let item of products) {
            const product = await Product.findOne({ id: Number(item.productId) });
            if (!product) {
                return res.status(404).json({ message: `Producto no encontrado: ${item.productId}` });
            }
            orderProducts.push({
                product: product._id,
                quantity: item.quantity
            });
        }

        if (total <= 0) {
            return res.status(400).json({ message: 'El total de la orden debe ser mayor a 0' });
        }

        const newOrder = new Order({
            user: userId,
            products: orderProducts,
            total,
            deliveryOption,
            address,
            phone,
            extraPhone,
            comment
        });

        await newOrder.save();

        res.status(201).json({ message: 'Orden creada exitosamente', order: newOrder });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ message: 'Error al crear la orden', error: error.message });
    }
};

// Función para obtener todas las órdenes
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('products.product', 'name new_price')
            .populate('user', 'name email');
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
        res.status(500).json({ success: false, message: 'Error al obtener las órdenes', error: error.message });
    }
};

// Función para obtener estadísticas por opciones de entrega
const getOrderStatisticsByDeliveryOption = async (req, res) => {
    try {
        const deliveryOptions = await Order.aggregate([
            {
                $group: {
                    _id: "$deliveryOption",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            deliveryOptions
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error obteniendo estadísticas por opciones de entrega', error: error.message });
    }
};


// Función para actualizar el estado de la orden
const updateOrderState = async (req, res) => {
    try {
        const { orderId, newState } = req.body;

        if (!["Pendiente", "En Proceso", "Entregada"].includes(newState)) {
            return res.status(400).json({ message: 'Estado de la orden no válido' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { state: newState }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.status(200).json({ message: 'Estado de la orden actualizado exitosamente', order: updatedOrder });
    } catch (error) {
        console.error('Error al actualizar el estado de la orden:', error);
        res.status(500).json({ message: 'Error al actualizar el estado de la orden', error: error.message });
    }
};

// NUEVA FUNCION: Pedidos por día, mes y año
const getOrderStatisticsByDate = async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfYear = new Date(today.getFullYear(), 0, 1);

        // Pedidos del día
        const ordersToday = await Order.countDocuments({
            date: { $gte: startOfDay }
        });

        // Pedidos del mes
        const ordersThisMonth = await Order.countDocuments({
            date: { $gte: startOfMonth }
        });

        // Pedidos del año
        const ordersThisYear = await Order.countDocuments({
            date: { $gte: startOfYear }
        });

        res.status(200).json({
            success: true,
            ordersToday,
            ordersThisMonth,
            ordersThisYear
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error obteniendo estadísticas por fecha', error: error.message });
    }
};

// NUEVA FUNCION: Pedidos por estado (Pendiente, En Proceso, Entregada)
const getOrderStatisticsByState = async (req, res) => {
    try {
        const orderStates = await Order.aggregate([
            {
                $group: {
                    _id: "$state",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            orderStates
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error obteniendo estadísticas por estado', error: error.message });
    }
};

// Función para eliminar una orden
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.status(200).json({ message: 'Orden eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la orden:', error);
        res.status(500).json({ message: 'Error al eliminar la orden', error: error.message });
    }
};

// Función para obtener los compradores principales
const getTopBuyers = async (req, res) => {
    try {
        const topBuyers = await Order.aggregate([
            {
                $group: {
                    _id: '$user',
                    totalOrders: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            { $unwind: '$userInfo' },
            {
                $project: {
                    _id: 1,
                    totalOrders: 1,
                    'userInfo.name': 1,
                    'userInfo.email': 1
                }
            },
            { $sort: { totalOrders: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({ success: true, topBuyers });
    } catch (error) {
        console.error('Error al obtener los compradores principales:', error);
        res.status(500).json({ success: false, message: 'Error al obtener los compradores principales', error: error.message });
    }
};

// Función básica de estadísticas generales
const getOrderStatistics = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        // Contar solo los pedidos con estado "Entregada"
        const deliveredOrders = await Order.countDocuments({ state: 'Entregada' });
        const totalIncome = await Order.aggregate([
            { $group: { _id: null, totalIncome: { $sum: "$total" } } }
        ]);

        res.status(200).json({
            success: true,
            totalOrders,
            deliveredOrders, // Aquí ya son los pedidos con estado "Entregada"
            totalIncome: totalIncome[0]?.totalIncome || 0,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error obteniendo estadísticas generales', error: error.message });
    }
};

module.exports = { 
    createOrder, 
    getAllOrders, 
    getOrderStatistics, // Añadir esta función si es requerida
    getOrderStatisticsByDate,  
    getOrderStatisticsByState, 
    getTopBuyers, 
    updateOrderState, 
    deleteOrder,
    getOrderStatisticsByDeliveryOption 
};
