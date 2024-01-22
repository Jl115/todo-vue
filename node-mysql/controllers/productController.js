const db = require("../models");

// Create and Save a new Productmodel
const Product = db.products;
const Review = db.reviews;

// main

//  1. create a product
const createProduct = async (req, res) => {
    // Validate request
    let info = {
        name: req.body.name,
        done : false,
        description: req.body.description,

    };
    // Create a Product
    const product = await Product.create(info)
    res.status(200).send(product);
};

//  2. get all products
const getAllProducts = async (req, res) => {
    let products = await Product.findAll({
    });
    res.status(200).send(products);
};

//  3. get a product by id
const getProductById = async (req, res) => {
    let id = req.params.id;
    let product = await Product.findOne({ where: { id: id } });
    res.status(200).send(product);
};
//  4. update a product by id
const updateProductById = async (req, res) => {
    let id = req.params.id;
    let product = await Product.update(req.body, { where: { id: id } });
    res.status(200).send(product);
};
//  5. delete a product by id
const deleteProductById = async (req, res) => {
    let id = req.params.id;
    await Product.destroy({ where: { id: id } });
    res.status(200).send("Product deleted successfully");
};
//  6. publlished a product by id
const listPublishedStatus = async (req, res) => {
    const publishedStatus = req.query.published === 'true';
    let products = await Product.findAll({ where: { published: publishedStatus }, id :{ id : 1} });
    res.status(200).send(products);
};



// 7. export all functions

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    listPublishedStatus,
    deleteProductById,
};