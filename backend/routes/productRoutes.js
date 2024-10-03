const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');
const path = require('path');

// Configuración de Multer para la subida de archivos
const storage = multer.diskStorage({
    destination: './upload/images',  // Carpeta temporal para guardar las imágenes antes de subirlas a Cloudinary
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Ruta para agregar un producto con una imagen
router.post('/addproduct', upload.single('product'), productController.addProduct);

// Otras rutas de productos
router.post('/removeproduct', productController.removeProduct);
router.get('/allproducts', productController.getAllProducts);
router.post('/updateproduct', productController.updateProduct);
router.get('/newcollections', productController.getNewCollections);
router.get('/popularinfoliares', productController.getPopularFoliares);

module.exports = router;
