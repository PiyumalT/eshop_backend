const express = require('express');
const router = express.Router();
const {Cart} = require('../models/cart');
const {getUserFromToken} = require('../helpers/getUserFromToken');
const jwt = require('jsonwebtoken');


exports.allCartItems = async (req, res) => {
    try {
        // Get user id from token
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.secret);
        const userId = decoded.userId;

        // Find cart items for the user
        const cartItems = await Cart.find({ user_id: userId }).populate('product_id');

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).send('Cart is empty');
        }
        return res.send(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
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
        product_id: req.body.item_id,
        quantity: req.body.quantity,
    });
    cart = await cart.save();
    if (!cart) {
        return res.status(400).send('The cart cannot be created');
    }
    res.send(cart);

}

//remove cart item by id
// please secure this route by only user can delete his own cart item
exports.removeCartItem = async (req, res) => {
  //get user id from token and cart item id from params only user can delete his own cart item
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret);
    const user_id = decoded.userId;
    const cartItem_id = req.params.id;

    //check if cart item exists
    const cartItem = await Cart.findById(cartItem_id);
    if (!cartItem) {
        return res.status(400).send('Cart item does not exist');
    }
    else if (cartItem.user_id != user_id) {
        return res.status(400).send('You are not authorized to delete this cart item');
    }
    else {
        const result = await Cart.findByIdAndRemove(cartItem_id);
        if (!result) {
            return res.status(500).send('The cart item cannot be deleted');
        }
        res.send(result);
    }
}

exports.numberOfCartItems = async (req, res) => {
    try {
        // Get user id from token
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.secret);
        const userId = decoded.userId;

        // Find cart items for the user
        const cartItems = await Cart.find({ user_id: userId });

        if (!cartItems || cartItems.length === 0) {
            return res.send({ count: cartItems.length });
        }
        return res.send({ count: cartItems.length });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

exports.updateCartItem = async (req, res) => {
    //get user id from token
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret);
    const user_id = decoded.userId;
    const cartItem_id = req.params.id;

    //check if cart item exists
    const cartItem = await Cart.findById(cartItem_id);
    if (!cartItem) {
        return res.status(400).send('Cart item does not exist');
    }
    else if (cartItem.user_id != user_id) {
        return res.status(400).send('You are not authorized to update this cart item');
    }
    else {
        const result = await Cart.findByIdAndUpdate(cartItem_id, {
            quantity: req.body.quantity,
        }, { new: true });
        if (!result) {
            return res.status(500).send('The cart item cannot be updated');
        }
        if (result.quantity === 0) {
            await Cart.findByIdAndRemove(cartItem_id);
        }
        res.send(result);
    }
}