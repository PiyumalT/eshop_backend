const {User} = require('../models/user');
const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');
const {ShippingAddress} = require('../models/shippingAddress');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

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

//User login
router.post('/login', async (req, res) =>{
    try{
        const user = await User.findOne({email:req.body.email});
        if (!user){
            return res.status(400).send('The user not found');
        }
        if (user && bycrypt.compareSync(req.body.password, user.passwordHash)){
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin,    
                },
                process.env.SECRET,
                {expiresIn: '1d'}
            )
            res.status(200).send({user: user.email, token: token});
        }
        else{
            res.status(400).send('Password is wrong');
        }
        // res.status(200).send(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
})

//users count
router.get('/get/count', async (req, res) =>{
    try{
        const userCount = await User.countDocuments((count)=> count);
        if(!userCount){
            res.status(500).json({
                message: 'The user count was not found',
                success: false
            })
        }
        res.send({
            userCount: userCount,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
})

//delete a user
router.delete('/:id', async (req, res) =>{
    User.findByIdAndRemove(req.params.id).then(async user =>{
        if(user){
            return res.status(200).json({
                success: true,
                message: 'The user is deleted',
            })
        }
        else{
            return res.status(404).json({
                success: false,
                message: 'The user not found',
            })
        }
    }).catch(err =>{
        return res.status(400).json({
            success: false,
            error: err,
        })
    }
    )
})



module.exports = router;
