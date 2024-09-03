const mongoose = require('mongoose'); // Asegúrate de requerir mongoose al principio del archivo
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
    try {
        const { userId, products, total, deliveryOption, address, phone, extraPhone, comment } = req.body;

        console.log('Received User ID:', userId); // Log para depuración
        console.log('Received Products:', products); // Log para depuración

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Validar si hay productos en el carrito
        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'El carrito de compras está vacío' });
        }

        // Validar si cada producto existe y convertir ID a ObjectId
        for (let item of products) {
            const productId = new mongoose.Types.ObjectId(item.productId);
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Producto no encontrado: ${item.productId}` });
            }
        }

        // Construir la orden con los productos del carrito
        const orderProducts = products.map(item => ({
            product: new mongoose.Types.ObjectId(item.productId), // Convierte a ObjectId
            quantity: item.quantity
        }));

        // Validar total
        if (total <= 0) {
            return res.status(400).json({ message: 'El total de la orden debe ser mayor a 0' });
        }

        // Validar opción de entrega
        if (!deliveryOption || !['delivery', 'distributor'].includes(deliveryOption)) {
            return res.status(400).json({ message: 'Opción de entrega inválida' });
        }

        // Validar teléfono
        if (!phone) {
            return res.status(400).json({ message: 'El número de teléfono es obligatorio' });
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

        // Guardar la orden en la base de datos
        await newOrder.save();

        res.status(201).json({ message: 'Orden creada exitosamente', order: newOrder });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ message: 'Error al crear la orden', error: error.message });
    }
};

// Nueva función para obtener todas las órdenes
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

module.exports = { createOrder, getAllOrders };
