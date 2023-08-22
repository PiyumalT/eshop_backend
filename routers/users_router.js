const {User} = require('../models/user');
const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');
const {ShippingAddress} = require('../models/shippingAddress');
const bycrypt = require('bcryptjs');


// Get all users
router.get(`/`, async (req, res) =>{
    try{
        const userList = await User.find().select('-passwordHash');
        if(!userList){
            res.status(500).json({
                message: 'The user list was not found',
                success: false
            })
        }
        res.send(userList);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
})

// Get a single user
router.get('/:id', async (req, res) =>{
    try{
        const user = await User.findById(req.params.id).select('-passwordHash');
        if(!user){
            res.status(500).json({
                message: 'The user was not found',
                success: false
            })
        }
        res.send(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
})

// Create a user
router.post('/', async (req, res) =>{
    try{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash:bycrypt.hashSync(req.body.passwordHash,8),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            defaultShippingAddress: req.body.defaultShippingAddress,
        })
        const newUser = await user.save();
        if(!newUser){
            return res.status(400).send('The user cannot be created');
        }
        res.send(newUser);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
})



module.exports = router;
