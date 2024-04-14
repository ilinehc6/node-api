
const express = require("express");
const router = express.Router();

const Product = require('../models/productModel')
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require("../controllers/productController")

// get all products
router.get('/', getProducts);

// get a product by Id 
router.get('/:id', getProduct);

// create a new product
router.post('/', createProduct);

// update a product
router.put('/:id', updateProduct);

// delete a product 
router.delete('/:id', deleteProduct);

module.exports = router