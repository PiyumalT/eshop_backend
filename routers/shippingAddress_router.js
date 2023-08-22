const {ShippingAddress} = require('../models/shippingAddress');   
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/user');

// Get shipping address by user id
router.get('/:id', async (req, res) =>{
    try{
        const shippingAddress = await ShippingAddress.find({user: req.params.id});
        if(!shippingAddress){
            res.status(500).json({
                message: 'The shipping address was not found',
                success: false
            })
        }
        res.send(shippingAddress);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
})

// Get a single shipping address by address id
router.get('/getaddress/:id', async (req, res) =>{
    try{
        const shippingAddress = await ShippingAddress.findById(req.params.id);
        if(!shippingAddress){
            res.status(500).json({
                message: 'The shipping address was not found',
                success: false
            })
        }
        res.send(shippingAddress);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
})

// Create a shipping address
router.post('/', async (req, res) =>{
    try{
        const shippingAddress = new ShippingAddress({
            user: req.body.user,
            fullName: req.body.fullName,
            address: req.body.address,
            city: req.body.city,
            zipCode: req.body.zipCode,
            country: req.body.country,
            phoneNumber: req.body.phoneNumber,
            isDefault: req.body.isDefault,
        })
        const newShippingAddress = await shippingAddress.save();
        if(!newShippingAddress){
            return res.status(404).send('The shipping address cannot be created');
        }
        res.send(newShippingAddress);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
})

module.exports =router;