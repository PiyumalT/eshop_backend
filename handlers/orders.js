const {Order} = require('../models/order');
const express = require('express');
const router = express.Router();
const {OrderItem} = require('../models/order-item');
const {ShippingAddress} = require('../models/shippingAddress');
const { Product } = require('../models/product');
const validateUserToken = require('../helpers/jwtValidateUser');

//Admin routes

//get all orders
exports.listOfAllOrders = async (req, res) => {
    //check user level
    const userInfo = validateUserToken(req.headers.authorization);
    if (!(userInfo && userInfo.userRole === 'admin')) {
        return res.status(401).send('Unauthorized request');
    }   
    const orderList =await Order.find().populate('user', 'name').sort({'dateOrdered': -1});
    if(!orderList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(orderList);
};

//update an order status
exports.updateOrderStatus = async (req, res) =>{
    
    const order =await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status,
        },
        {new: true}
    )
    if(!order){
        res.status(500).json({
            message: 'The order was not found',
            success: false
        })
    }
    res.send(order);
};

//get a single order by id
exports.getOrderbyId = async (req, res) =>{

    const userInfo = validateUserToken(req.headers.authorization);
    if (!(userInfo)){
        return res.status(401).send('Unauthorized request');
    }

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
};

//add an new order
exports.addNewOrder = async (req, res) => {
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
        const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
            const orderItem =await OrderItem.findById(orderItemId).populate('product', 'price');
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice;
        }))
        const totalPrice = totalPrices.reduce((a,b) => a + b, 0);

        
        const shippingAddress =await ShippingAddress.findById(req.body.shippingAddress);
        if(!shippingAddress) {
            res.status(400).send('Invalid Shipping Address');
        }

        
        else {
            let order= new Order({
                orderItems: orderItemsIdsResolved,
                shippingAddress: req.body.shippingAddress,
                status: req.body.status,
                totalPrice: totalPrice,
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
};



//delete an order
exports.deleteOrder = async (req, res) =>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(!order){
            return res.status(500).json({
                message: 'The order was not found',
                success: false
            })
        }
        else{
            await order.orderItems.map(async orderItem =>{
                await OrderItem.findByIdAndRemove(orderItem);
            })
            return res.status(200).json({
                success: true,
                message: 'The order is deleted',
            })
        }
    }).catch(err =>{
        return res.status(400).json({
            success: false,
            error: err,
        })
    })
};
  

//get total sales
exports.getTotalSales = async (req, res) =>{
    const totalSales =await Order.aggregate([
        {$group: {_id: null, totalsales: {$sum: '$totalPrice'}}}
    ])
    if(!totalSales){
        return res.status(400).send('The order sales cannot be generated');
    }
    res.send({totalsales: totalSales.pop().totalsales});
};

//get the number of orders
exports.numberOfOrders = async (req, res) => {
    const orderCount = await Order.countDocuments();
    if(!orderCount) {
        res.status(500).json({
            success: false,
            message: 'The orders count is not found'
        })
    }
    res.send({
        Order_Count: orderCount
    });
};

//get the orders of a user
exports.showOrdersByUserId = async (req, res) => {
    const userOrderList =await Order.find({user: req.params.userid}).populate({
        path: 'orderItems', populate: {
            path: 'product', populate: {
                path: 'category', select: 'name -_id'
            }, select: 'name image price '}, select: '-__v'
        }).sort({'dateOrdered': -1});
    if(!userOrderList) {
        res.status(500).json({
            success: false,
            message: 'The user orders is not found'
        })
    }
    res.send(userOrderList);
};

//get the number of orders of a user
exports.countOrdersOfOneUser = async (req, res) => {
    const userOrderCount = await Order.countDocuments({user: req.params.userid});
    if(!userOrderCount) {
        res.status(500).json({
            success: false,
            message: 'The user orders count is not found'
        })
    }
    res.send({
        User_Order_Count: userOrderCount
    });
};

//get orders by status
exports.showOrdersByStatus = async (req, res) => {
    const orderList =await Order.find({status: req.params.status}).populate({
        path: 'orderItems', populate: {
            path: 'product', populate: {
                path: 'category', select: 'name -_id'
            }, select: 'name image price '}, select: '-__v'
        }).sort({'dateOrdered': -1});
    if(!orderList) {
        res.status(500).json({
            success: false,
            message: 'The orders is not found'
        })
    }
    res.send(orderList);
};

//get orders by status and user id
exports.showOrdersByStatusAndUserId = async (req, res) => {
    const orderList =await Order.find({status: req.params.status, user: req.params.userid}).populate({
        path: 'orderItems', populate: {
            path: 'product', populate: {
                path: 'category', select: 'name -_id'
            }, select: 'name image price '}, select: '-__v'
        }).sort({'dateOrdered': -1});
    if(!orderList) {
        res.status(500).json({
            success: false,
            message: 'The orders is not found'
        })
    }
    res.send(orderList);
};

//get oders by given date range
exports.showOrdersInDateRange = async (req, res) => {
    const orderList =await Order.find({
        dateOrdered: {
            $gte: req.params.startdate,
            $lte: req.params.enddate
        }
    }).populate({
        path: 'orderItems', populate: {
            path: 'product', populate: {
                path: 'category', select: 'name -_id'
            }, select: 'name image price '}, select: '-__v'
        }).sort({'dateOrdered': -1});
    if(!orderList) {
        res.status(500).json({
            success: false,
            message: 'The orders is not found'
        })
    }
    res.send(orderList);
};