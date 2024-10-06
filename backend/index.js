require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes');  // Asegúrate de tener esta ruta

const app = express();
const port = process.env.PORT || 4000;
app.use(
    cors({
      origin: '*',
    })
  );

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error conectando a MongoDB", err));

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuración de Multer para almacenar en Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'productos',
        format: async (req, file) => 'png',
        public_id: (req, file) => `${file.fieldname}_${Date.now()}`
    }
});

const upload = multer({ storage: storage });

// Ruta para subir imágenes
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: req.file.path // URL de la imagen en Cloudinary
    });
});

// Uso de rutas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);  // Asegúrate de que la ruta exista

// Iniciar el servidor
app.listen(port, (error) => {
    if (!error) {
        console.log("Server corriendo en puerto: " + port);
    } else {
        console.log("Error : " + error);
    }
});
