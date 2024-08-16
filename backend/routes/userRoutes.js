const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const fetchUser = require('../middlewares/authMiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/addtocart', fetchUser, userController.addToCart);
router.post('/removefromcart', fetchUser, userController.removeFromCart);
router.post('/getcart', fetchUser, userController.getCart);

module.exports = router;
