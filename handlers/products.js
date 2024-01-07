const express = require('express');
const { Category } = require('../models/category');
const router = express.Router(); 
const {Product} = require('../models/product');
const mongoose = require('mongoose');


//Get all products
exports.allProducts = async (req, res) => {
    const productlist =await Product.find().populate('category'); {
        res.send(productlist);
    }
    if(!productlist) {
        res.status(500).json({
            success: false
        })
    }
};

//Get all products with selected fields
exports.getProductBasicDetails = async (req, res) => {
    const productlist =await Product.find().select('name image').populate('category');{
        res.send(productlist);
    }
    if(!productlist) {
        res.status(500).json({
            success: false
        })
    }
};

//get a product by id
exports.getProductById = async (req, res) => {
    try {
        const product =await Product.findById(req.params.id);
        if(!product) {
            res.status(500).json({
                success: false,
                message: 'The product with the given ID was not found'
            })
        }
        res.status(200).send(product);
    }
    catch(err) {
        res.status(500).json({
            success: false,
            error: err,
            message: 'The product with the given ID was not found'
        })
    }
};

//Save a product
exports.addNewProduct = async (req, res) => {
    const category =await Category.findById(req.body.category);
    if(!category) {
        return res.status(400).send('Invalid Category');
    }

    //Check if the file is valid
    const file = req.file;
    if(!file) {
        return res.status(400).send('No image in the request');
    }
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if (!req.body.name){
        return res.status(400).send('The name is required');
    }
    if (!req.body.description){
        return res.status(400).send('The description is required');
    }
    if (!req.body.price){
        return res.status(400).send('The price is required');
    }
    if (!req.body.countInStock){
        return res.status(400).send('The countInStock is required');
    }
    if (!req.body.category){
        return res.status(400).send('The category is required');
    }
    

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })
    const savedproduct = await product.save();
    if(!savedproduct) {
        return res.status(500).send('The product cannot be created');
    }
    res.send(savedproduct);
};

//Update a product
exports.updateProduct = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }
    const category = await Category.findById(req.body.category);
    if(!category) {
        return res.status(400).send('Invalid Category');
    }

    const product= await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        {new: true}
    )
    if(!product) {
        return res.status(400).send('The product cannot be updated');
    }
    res.send(product);
};

//Delete a product
exports.deleteProduct = async(req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if(product) {
            return res.status(200).json({
                success: true,
                message: 'The product is deleted'
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'The product is not found'
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            error: err
        })
    })
};

//Get the number of products
exports.numberOfProducts = async (req, res) => {
    const productCount = await Product.countDocuments();
    if(!productCount) {
        res.status(500).json({
            success: false,
            message: 'The products count is not found'
        })
    }
    res.send({
        Product_Count: productCount
    });
};

//Get the featured products
exports.featuredProducts = async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({isFeatured: true}).limit(+count);
    if(!products) {
        res.status(500).json({
            success: false
        })
    }
    res.send(products);
};

//Get the latest products (sort by dateCreated)
exports.latestProducts = async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find().sort({dateCreated: -1}).limit(+count);
    if(!products) {
        res.status(500).json({
            success: false
        })
    }
    res.send(products);
};

//Get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
        // Get category by name
        const category = await Category.findOne({ name: { $regex: new RegExp(req.params.name, 'i') } });

        // Check if the category exists
        if (!category) {
            return res.status(400).json({ error: 'Invalid Category' });
        }

        // Get products by category ID
        const products = await Product.find({ category: category._id });

        // Check if products are found
        if (!products || products.length === 0) {
            return res.status(404).json({ error: 'No products found for this category' });
        }

        // Send the products as a response
        res.json({ success: true, products });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Update the gallery images of a product
exports.updateGalleryImages =  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }

    let imagePaths = [];
    const files = req.files;
    if (files) {
        files.map(file => {
            imagePaths.push(`${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`);
        })
    }

    const product = await Product.findByIdAndUpdate(req.params.id, {
        optionalImages: imagePaths
    }, {new: true});

    if (!product) {
        return res.status(500).send('the gallery cannot be updated!');
    }
    res.send(product);
};

exports.searchProducts = async (req, res) => {
    const searchKeyword = req.params.name ? {
        name: {
            $regex: req.params.name,
            $options: 'i'
        }
    } : {}

    const products = await Product.find({...searchKeyword});
    if(!products) {
        res.status(500).json({
            success: false
        })
    }
    res.send(products);
}