const {Order} = require('../models/order');
const express = require('express');
const router = express.Router();
const {OrderItem} = require('../models/order-item');
const {ShippingAddress} = require('../models/shippingAddress');
const { Product } = require('../models/product');

//get all orders
router.get(`/`,async (req, res) => {
    const orderList =await Order.find().populate('user', 'name').sort({'dateOrdered': -1});
    if(!orderList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(orderList);
});

//get a single order
router.get('/:id', async (req, res) =>{
    const order =await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate('shippingAddress', 'fullName address city zipCode country phoneNumber')
    .populate({
        path: 'orderItems', populate: {
            path: 'product', populate: {
                path: 'category', select: 'name -_id'
            }, select: 'name image price '}, select: '-__v'
        }).select('-__v');
    if(!order){
        res.status(500).json({
            message: 'The order was not found',
            success: false
        })
    }
    res.send(order);
});


router.get(`/:id`,async (req, res) => {
    const order =await Order.findById(req.params.id).populate('user', 'name').populate({path: 'orderItems', populate: {path: 'product', populate: 'category'}}); 
    if(order) {
        res.status(200).send(order);
    }
    else {
        res.status(404).json({
            success: false,
            message: 'The order is not found',
        })
    }
});

router.post(`/`,async (req, res) => {
    try{
        const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
            const product =await Product.findById(orderItem.product);
            if(!product) {
                res.status(400).send('Invalid product');
            }
            else {
                let newOrderItem = new OrderItem({
                    quantity: orderItem.quantity,
                    product: orderItem.product,
                })
                newOrderItem = await newOrderItem.save();
                return newOrderItem._id;
            }
        }))
        const orderItemsIdsResolved = await orderItemsIds;
        
        const shippingAddress =await ShippingAddress.findById(req.body.shippingAddress);
        if(!shippingAddress) {
            res.status(400).send('Invalid Shipping Address');
        }

        
        else {
            let order= new Order({
                orderItems: orderItemsIdsResolved,
                shippingAddress: req.body.shippingAddress,
                status: req.body.status,
                totalPrice: req.body.totalPrice,
                user: req.body.user,
            })
            order = await order.save();
            if(!order) {
                return res.status(404).send('The order cannot be created');
            }
            res.send(order);
        }
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;