const express = require('express');
const router = express.Router();
const handle = require('../handlers/products')

router.get('/', handle.allProducts)
router.get('/names', handle.getProductBasicDetails)
router.get('/:id', handle.getProductById)
router.post('/', handle.addNewProduct)
router.put('/:id', handle.updateProduct)
router.delete('/:id', handle.deleteProduct)
router.get('/get/count', handle.numberOfProducts)
router.get('/get/featured/:count', handle.featuredProducts)
router.get(`/get/bycategory`,handle.getProductsByCategory)
router.get(`/get/bycategory/:id`,handle.getProductsByCategory)
router.put('/gallery-images/:id', handle.updateGalleryImages)

module.exports = router
