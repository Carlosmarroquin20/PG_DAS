const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const fetchUser = require('../middlewares/authMiddleware'); // Middleware para validar token

// Rutas para signup y login
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Rutas protegidas
router.post('/addtocart', fetchUser, userController.addToCart);
router.post('/removefromcart', fetchUser, userController.removeFromCart);
router.post('/getcart', fetchUser, userController.getCart);

module.exports = router;
