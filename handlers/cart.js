const express = require('express');
const router = express.Router();
const {Cart} = require('../models/cart');
const {getUserFromToken} = require('../helpers/getUserFromToken');
const jwt = require('jsonwebtoken');


exports.allCartItems = async (req, res) => {
    //get user id from token
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret);
    const userId = decoded.userId;
    const cartItems =await Cart.find({user_id: userId});{
        if (!cartItems) {
            return res.status(400).send('Cart is empty');
        }
        res.send(cartItems);
    }
};

exports.addCartItem = async (req, res) => {
    //get user id from token
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret);
    const user_id = decoded.userId;

    let cart = new Cart({
        user_id: user_id,
        item_id: req.body.item_id,
        quantity: req.body.quantity,
    });
    cart = await cart.save();
    if (!cart) {
        return res.status(400).send('The cart cannot be created');
    }
    res.send(cart);

}
