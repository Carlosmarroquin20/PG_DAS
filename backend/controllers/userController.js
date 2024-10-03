const Users = require('../models/User');
const bcrypt = require('bcryptjs');  // Cambiado a bcryptjs
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Usuario encontrado con el mismo Email" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user._id // Uso de _id para mayor consistencia con MongoDB
            }
        };

        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' }); // Añadir expiración
        res.json({ success: true, token, userId: user._id }); // Devolver token y userId
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, errors: "Error en el servidor" });
    }
};

exports.login = async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, errors: "Email incorrecto" });
        }

        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passCompare) {
            return res.status(400).json({ success: false, errors: "Contraseña incorrecta" });
        }

        const data = {
            user: {
                id: user._id
            }
        };

        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' }); // Añadir expiración
        res.json({ success: true, token, userId: user._id }); // Devolver token y userId
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, errors: "Error en el servidor" });
    }
};

exports.addToCart = async (req, res) => {
    console.log("Added", req.body.itemId);
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        res.status(500).send("Error al agregar al carrito");
    }
};

exports.removeFromCart = async (req, res) => {
    console.log("Removed", req.body.itemId);
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
            await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
            res.send("Removed");
        } else {
            res.status(400).send("Cantidad en el carrito ya es 0");
        }
    } catch (error) {
        console.error("Error al remover del carrito:", error);
        res.status(500).send("Error al remover del carrito");
    }
};

exports.getCart = async (req, res) => {
    console.log("GetCart");
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).send("Error al obtener el carrito");
    }
};
