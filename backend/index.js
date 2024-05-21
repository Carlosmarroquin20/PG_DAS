// Importación de módulos necesarios
const port = 4000; // Puerto en el que se ejecutará el servidor
const express = require("express"); // Importar Express para crear el servidor
const app = express(); // Crear una instancia de Express
const mongoose = require("mongoose"); // Importar Mongoose para interactuar con la base de datos MongoDB
const jwt = require("jsonwebtoken"); // Importar JSON Web Token para la autenticación
const multer = require("multer"); // Importar Multer para manejar la carga de archivos
const path = require("path"); // Importar Path para manipulación de rutas de archivos
const cors = require("cors"); // Importar Cors para habilitar el intercambio de recursos entre diferentes dominios
const bcrypt = require('bcrypt'); // Importar bcrypt para el cifrado de contraseñas

// Middlewares
app.use(express.json()); // Middleware para parsear el body de las peticiones a JSON
app.use(cors()); // Middleware para habilitar CORS (Cross-Origin Resource Sharing)

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://Ema322:Master322GG@cluster0.j2f0i2y.mongodb.net/DasCommerce", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("Conectado a MongoDB")).catch(err => console.error("Error conectando a MongoDB", err));

// Ruta principal de la API
app.get("/", (req, res) => {
    res.send("La App Express está corriendo al 100 :)");
});

// Configuración de almacenamiento para imágenes usando Multer
const storage = multer.diskStorage({
    destination: './upload/images', // Directorio donde se guardarán las imágenes
    filename: (req, file, cb) => { // Función para generar el nombre de archivo único
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage }); // Middleware de Multer para la carga de archivos

// Ruta para cargar imágenes
app.use('/images', express.static('upload/images'));

// Manejador de la petición de carga de imágenes
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Definición del esquema para la creación de productos en la base de datos
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

// Ruta para agregar un nuevo producto
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;

    if (products.length > 0) {
        let last_product = products[products.length - 1];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    await product.save();
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Ruta para eliminar un producto
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
});

// Ruta para obtener todos los productos
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});

// Ruta para actualizar un producto
// Ruta para actualizar un producto
app.post('/updateproduct', async (req, res) => {
    const { id, name, old_price, new_price, category } = req.body;
    await Product.findOneAndUpdate({ id }, { name, old_price, new_price, category });
    console.log("Updated");
    res.json({
        success: true,
        name
    });
});


// Definición del esquema para la creación de usuarios en la base de datos
const Users = mongoose.model('Users', {
    name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// EndPoint for User Signup
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Usuario encontrado con el mismo Email" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword, // Save the hashed password
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, errors: "Error en el servidor" });
    }
});

// EndPoint for User Login
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ success: false, errors: "Email incorrecto" });
        }

        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passCompare) {
            return res.json({ success: false, errors: "Contraseña incorrecta" });
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, errors: "Error en el servidor" });
    }
});

//Nuevos Productos
app.get('/newcollections',async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewColletions Fetched");
    res.send(newcollection);
})


app.get('/popularinfoliares',async (req,res)=>{
    let products = await Product.find({category:"foliares"});
    let populares_in_foliares = products.slice(0,4);
    console.log("Popular in foliares fetched");
    res.send(populares_in_foliares);
})

// Iniciar el servidor
app.listen(port, (error) => {
    if (!error) {
        console.log("Server corriendo en puerto: " + port);
    } else {
        console.log("Error : " + error);
    }
});
