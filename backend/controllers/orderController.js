const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
    try {
        const { userId, cartItems, total, deliveryOption, address, phone, extraPhone, comment } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Validar si hay productos en el carrito
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'El carrito de compras está vacío' });
        }

        // Validar si cada producto existe
        for (let item of cartItems) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Producto no encontrado: ${item.productId}` });
            }
        }

        // Construir la orden con los productos del carrito
        const orderProducts = cartItems.map(item => ({
            product: item.productId,
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

module.exports = { createOrder };
