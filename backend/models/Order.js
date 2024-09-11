const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],
    total: {
        type: Number,
        required: true,
    },
    deliveryOption: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    extraPhone: {
        type: String,
    },
    comment: {
        type: String,
    },
    state: {
        type: String,
        enum: ["Pendiente", "En Proceso", "Entregada"],  // Opciones posibles
        default: "Pendiente",  // Valor por defecto
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Order', orderSchema);
