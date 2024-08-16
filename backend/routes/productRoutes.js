const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/addproduct', productController.addProduct);
router.post('/removeproduct', productController.removeProduct);
router.get('/allproducts', productController.getAllProducts);
router.post('/updateproduct', productController.updateProduct);
router.get('/newcollections', productController.getNewCollections);
router.get('/popularinfoliares', productController.getPopularFoliares);

module.exports = router;
