const express = require('express');
const router = express.Router();
const handle = require('../handlers/cart')

router.get('/', handle.allCartItems)                        //Get all cart items
router.post('/', handle.addCartItem)                     //Add new cart item
// router.delete('/:id', handle.deleteCartItem)                //Delete cart item
// router.put('/:id', handle.updateCartItem)                   //Update cart item
// router.get('/get/count', handle.numberOfCartItems)          //Get number of cart items
// router.delete('/clear/', handle.clearCart)           //Clear cart

module.exports = router;