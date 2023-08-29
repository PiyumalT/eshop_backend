const express = require('express');
const router = express.Router();
const handle = require('../handlers/shippingAddress')

// router.get('/', handle.allShippingAddress)
router.get('/byuser/:id', handle.getShippingAddressByUserId)
router.get('/:id', handle.getShippingAddressById)
router.post('/', handle.addNewShippingAddress)
router.put('/:id', handle.updateShippingAddress)
router.delete('/:id', handle.deleteShippingAddress)
router.get('/get/default/:id', handle.getDefaultShippingAddress)

module.exports =router;