const {ShippingAddress} = require('../models/shippingAddress');   
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/user');

// Get shipping address by user id
exports.getShippingAddressByUserId = async (req, res) =>{
    try{
        const shippingAddress = await ShippingAddress.find({user: req.params.userid});
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
};

// Get a single shipping address by address id
exports.getShippingAddressById = async (req, res) =>{
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
};

// Create a shipping address
exports.addNewShippingAddress = async (req, res) =>{
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
};

// Update a shipping address
exports.updateShippingAddress = async (req, res) =>{
    try{
        const shippingAddress = await ShippingAddress.findByIdAndUpdate(
            req.params.id,
            {
                isDefault:false,
                isVisiableToUser: false
            },
            {new: true}
        )
        const shippingAddress2 = new ShippingAddress({
            user: req.body.user,
            fullName: req.body.fullName,
            address: req.body.address,
            city: req.body.city,
            zipCode: req.body.zipCode,
            country: req.body.country,
            phoneNumber: req.body.phoneNumber,
            isDefault: req.body.isDefault,
        })
        const newShippingAddress = await shippingAddress2.save();
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
}

// Delete a shipping address
exports.deleteShippingAddress = async (req, res) =>{
    try{
        const shippingAddress = await ShippingAddress.findByIdAndUpdate(
            req.params.id,
            {
                isDefault:false,
                isVisiableToUser: false
            },
            {new: true}
        )
        res.send(shippingAddress);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

//get default shipping address for user
exports.getDefaultShippingAddress = async (req, res) =>{
    try{
        const shippingAddress = await ShippingAddress.findOne({user: req.params.userid, isDefault: true});
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
}
