const {User} = require('../models/user');
const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');
const {ShippingAddress} = require('../models/shippingAddress');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

// Get all users
exports.allUsers = async (req, res) =>{
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
};

// Get a single user
exports.getUserById = async (req, res) =>{
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
};

// Create a user
exports.addNewUser = async (req, res) =>{
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
        res.send(newUser._id);
    }
    catch(err){
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
};

//User login
exports.loginUser = async (req, res) =>{
    try{
        const user = await User.findOne({email:req.body.email});
        if (!user){
            return res.status(400).json({
                message: 'The user not found',
                success: false
            })
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
            res.status(400).json({
                message: 'Password is wrong',
                success: false
            });
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
};

//users count
exports.numberOfUsers = async (req, res) =>{
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
};

//delete a user
exports.deleteUser = async (req, res) =>{
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
};

//update user password
exports.updateUserPassword = async (req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send('The user not found');
        }
        const passwordIsValid = bycrypt.compareSync(req.body.password, user.passwordHash);
        if(!passwordIsValid){
            return res.status(400).send('Password is wrong');
        }
        const newPassword = bycrypt.hashSync(req.body.newPassword, 8);
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                passwordHash: newPassword,
            },
            {new: true}
        )
        if(!updatedUser){
            return res.status(404).send('The user cannot be updated');
        }
        res.send(updatedUser);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
};

//update user info
exports.updateUserInfo = async (req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send('The user not found');
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                isAdmin: req.body.isAdmin,
                defaultShippingAddress: req.body.defaultShippingAddress,
            },
            {new: true}
        )
        if(!updatedUser){
            return res.status(404).send('The user cannot be updated');
        }
        res.send(updatedUser);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
};

exports.getUserByEmail = async (req, res) =>{
    try{
        const user = await User.findOne({email:req.params.email});
        if(!user){
            return res.status(404).send('The user not found');
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
};

