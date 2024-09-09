const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Función para crear una orden
const createOrder = async (req, res) => {
    try {
        const { userId, products, total, deliveryOption, address, phone, extraPhone, comment } = req.body;

        console.log('Received User ID:', userId);
        console.log('Received Products:', products);

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

// Función para obtener estadísticas
const getOrderStatistics = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const deliveredOrders = await Order.countDocuments({ deliveryOption: 'delivery' });
        const totalIncome = await Order.aggregate([
            { $group: { _id: null, totalIncome: { $sum: "$total" } } }
        ]);
        const mostUsedDeliveryOption = await Order.aggregate([
            { $group: { _id: "$deliveryOption", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        const bestSellingProducts = await Order.aggregate([
            { $unwind: "$products" },
            { $group: { _id: "$products.product", totalSold: { $sum: "$products.quantity" } } },
            { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "productInfo" } },
            { $unwind: "$productInfo" },
            { $sort: { totalSold: -1 } },
            { $limit: 5 }
        ]);

        const statistics = {
            totalOrders,
            deliveredOrders,
            totalIncome: totalIncome[0]?.totalIncome || 0,
            mostUsedDeliveryOption: mostUsedDeliveryOption[0]?._id || 'N/A',
            bestSellingProducts
        };

        res.status(200).json({ success: true, statistics });
    } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
        res.status(500).json({ success: false, message: 'Error al obtener las estadísticas', error: error.message });
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

// Exportar todas las funciones
module.exports = { createOrder, getAllOrders, getOrderStatistics, getTopBuyers };
