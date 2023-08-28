const express = require('express');
const { Category } = require('../models/category');
const router = express.Router(); 
const {Product} = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}

//Storage for images
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid image type');
        if(isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    //Rename the file
    // filename: function (req, file, cb) {
    //     const fileName = file.originalname.split(' ').join('-');
    //     cb(null, Date.now() + '-' + fileName)
    // }
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
})
const uploadOptions = multer({ storage: storage })


//Get all products
router.get(`/`,async (req, res) => {
    const productlist =await Product.find().populate('category'); {
        res.send(productlist);
    }
    if(!productlist) {
        res.status(500).json({
            success: false
        })
    }
});


//Get all products with selected fields
router.get(`/names`,async (req, res) => {
    const productlist =await Product.find().select('name image').populate('category');{
        res.send(productlist);
    }
    if(!productlist) {
        res.status(500).json({
            success: false
        })
    }
});

//get a product by id
router.get(`/:id`,async (req, res) => {
    const product =await Product.findById(req.params.id);
    if(!product) {
        res.status(500).json({
            success: false,
            message: 'The product with the given ID was not found'
        })
    }
    res.status(200).send(product);
});


//Save a product
router.post(`/`, uploadOptions.single('image'), async (req, res) => {
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
});

//Update a product
router.put('/:id',async (req, res) => {
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
});

//Delete a product
router.delete('/:id',(req, res) => {
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
});

//Get the number of products
router.get(`/get/count`,async (req, res) => {
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
});

//Get the featured products
router.get(`/get/featured/:count`,async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({isFeatured: true}).limit(+count);
    if(!products) {
        res.status(500).json({
            success: false
        })
    }
    res.send(products);
});

//get products by category
router.get(`/get/bycategory`,async (req, res) => {
    let filter = {};
    if (req.query.categories) {
        const filter = {category: req.query.categories.split(',')}
    }
    const productsList =await Product.find(filter).populate('category');
    if(!productsList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(productsList);
});

//Update the gallery images of a product
router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
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
        optinalImages: imagePaths
    }, {new: true});

    if (!product) {
        return res.status(500).send('the gallery cannot be updated!');
    }
    res.send(product);
});



    

module.exports = router;

