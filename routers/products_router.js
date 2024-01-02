const express = require('express');
const router = express.Router();
const handle = require('../handlers/products')
const imgeUpload = require('../helpers/imageUploder')

router.get('/', handle.allProducts)                                              //Get all products
router.get('/names', handle.getProductBasicDetails)                              //Get all products basic details
router.get('/:id', handle.getProductById)                                        //Get product by id
router.post('/', imgeUpload.uploadOptions.single('image'), handle.addNewProduct) //Add new product
router.put('/:id', handle.updateProduct)                                         //Update product
router.delete('/:id', handle.deleteProduct)                                     //Delete product
router.get('/get/count', handle.numberOfProducts)                               //Get number of products
router.get('/get/featured/:count', handle.featuredProducts)                     //Get featured products
router.get('/get/latest/:count', handle.latestProducts)                         //Get latest products
router.get(`/get/bycategory`,handle.getProductsByCategory)                      //Get products by category
router.get(`/get/bycategory/:name`,handle.getProductsByCategory)                  //Get products by category
router.put('/gallery-images/:id', imgeUpload.uploadOptions.array('images', 10), handle.updateGalleryImages);    //Update the optional images of a product

module.exports = router
