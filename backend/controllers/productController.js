const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
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
};

exports.removeProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
};

exports.getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
};

exports.updateProduct = async (req, res) => {
    const { id, name, old_price, new_price, category } = req.body;
    await Product.findOneAndUpdate({ id }, { name, old_price, new_price, category });
    console.log("Updated");
    res.json({
        success: true,
        name
    });
};

exports.getNewCollections = async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewColletions Fetched");
    res.send(newcollection);
};

exports.getPopularFoliares = async (req, res) => {
    let products = await Product.find({ category: "foliares" });
    let populares_in_foliares = products.slice(0, 4);
    console.log("Popular in foliares fetched");
    res.send(populares_in_foliares);
};
