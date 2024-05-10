// Importación de módulos necesarios
const port = 4000; // Puerto en el que se ejecutará el servidor
const express = require("express"); // Importar Express para crear el servidor
const app = express(); // Crear una instancia de Express
const mongoose = require("mongoose"); // Importar Mongoose para interactuar con la base de datos MongoDB
const jwt = require("jsonwebtoken"); // CORREGIDO: Importar JSON Web Token para la autenticación
const multer = require("multer"); // Importar Multer para manejar la carga de archivos
const path = require("path"); // Importar Path para manipulación de rutas de archivos
const cors = require("cors"); // Importar Cors para habilitar el intercambio de recursos entre diferentes dominios

// Middlewares
app.use(express.json()); // Middleware para parsear el body de las peticiones a JSON
app.use(cors()); // Middleware para habilitar CORS (Cross-Origin Resource Sharing)

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://Ema322:Master322GG@cluster0.j2f0i2y.mongodb.net/DasCommerce");

// Ruta principal de la API
app.get("/",(req,res)=>{
    res.send("La App Express está corriendo al 100 :)");
});

// Configuración de almacenamiento para imágenes usando Multer
const storage = multer.diskStorage({
    destination: './upload/images', // Directorio donde se guardarán las imágenes
    filename: (req, file, cb) => { // Función para generar el nombre de archivo único
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage:storage}); // Middleware de Multer para la carga de archivos

// Ruta para cargar imágenes
app.use('/images', express.static('upload/images'));

// Manejador de la petición de carga de imágenes
app.post("/upload", upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Definición del esquema para la creación de productos en la base de datos
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    },
});

// Ruta para agregar un nuevo producto
app.post('/addproduct', async (req,res)=>{
    // Obtener todos los productos existentes
    let products = await Product.find({});
    let id;
    // Generar un ID único para el nuevo producto
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    // Crear un nuevo producto con los datos proporcionados en la solicitud
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    await product.save(); // Guardar el producto en la base de datos
    res.json({
        success:true,
        name:req.body.name,
    });
});

// Ruta para eliminar un producto
app.post('/removeproduct', async (req,res)=>{
    // Buscar y eliminar el producto con el ID proporcionado en la solicitud
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    });
});

// Ruta para obtener todos los productos
app.get('/allproducts', async (req,res)=>{
    // Obtener todos los productos de la base de datos
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});

//Shema para creacion de user
const Users = mongoose.model('Users',{
    name:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

app.post('/signup', async (req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:"Usuario encontrado con el mismo Email"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;   
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})


// Iniciar el servidor
app.listen(port,(error)=>{
    if (!error) {
        console.log("Server corriendo en puerto: "+port);   
    }
    else{
        console.log("Error : "+error);
    }
});
