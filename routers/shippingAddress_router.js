const express = require('express');
const router = express.Router();
const handle = require('../handlers/shippingAddress')

// router.get('/', handle.allShippingAddress)
router.get('/byuser/:id', handle.getShippingAddressByUserId) //Get shipping address by user id
router.get('/:id', handle.getShippingAddressById)           //Get shipping address by id
router.post('/', handle.addNewShippingAddress)              //Add new shipping address
router.put('/:id', handle.updateShippingAddress)            //Update shipping address
router.delete('/:id', handle.deleteShippingAddress)         //Delete shipping address
router.get('/get/default/:id', handle.getDefaultShippingAddress)     //Get default shipping address of a user

module.exports =router;