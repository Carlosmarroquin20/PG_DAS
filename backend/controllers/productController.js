const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Función para agregar productos
const addProduct = async (req, res) => {
    try {
        // Verifica si todos los datos necesarios están presentes
        if (!req.body.name || !req.body.image || !req.body.category || !req.body.new_price || !req.body.old_price) {
            return res.status(400).json({ message: "Faltan datos del producto" });
        }

        let products = await Product.find({});
        let id;

        if (products.length > 0) {
            let last_product = products[products.length - 1];
            id = last_product.id + 1;
        } else {
            id = 1;
        }

        // Crear el nuevo producto en MongoDB con la URL de Cloudinary
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,  // URL de la imagen subida en Cloudinary
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        res.json({
            success: true,
            product
        });

    } catch (error) {
        console.error("Error al crear el producto:", error);  // Mostrar detalles del error en la consola
        res.status(500).json({ message: "Error al crear el producto", error });
    }
};


// Otras funciones
const getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
};

const updateProduct = async (req, res) => {
    const { id, name, old_price, new_price, category } = req.body;
    await Product.findOneAndUpdate({ id }, { name, old_price, new_price, category });
    console.log("Updated");
    res.json({
        success: true,
        name
    });
};

const getNewCollections = async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collections Fetched");
    res.send(newcollection);
};

const getPopularFoliares = async (req, res) => {
    let products = await Product.find({ category: "foliares" });
    let populares_in_foliares = products.slice(0, 4);
    console.log("Popular in foliares fetched");
    res.send(populares_in_foliares);
};

const removeProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: req.body.id });
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        console.log("Producto eliminado");
        res.json({
            success: true,
            message: "Producto eliminado"
        });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error });
    }
};

// Exportar las funciones
module.exports = {
    addProduct,
    getAllProducts,
    updateProduct,
    getNewCollections,
    getPopularFoliares,
    removeProduct
};
