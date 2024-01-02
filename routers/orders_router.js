const express = require('express');
const router = express.Router();
const handle = require('../handlers/orders')

//all users
router.get('/:id', handle.getOrderbyId)                         //Get order by id
router.post('/', handle.addNewOrder)                            //Add new order
router.delete('/:id', handle.deleteOrder)                       //Delete order


router.get('/', handle.listOfAllOrders)                         //Get all orders
router.put('/:id', handle.updateOrderStatus)                    //Update order status
router.get('/get/totalsales', handle.getTotalSales)             //Get total sales amount
router.get('/get/count', handle.numberOfOrders)                 //Get number of orders
router.get('/get/userorders/:userid', handle.showOrdersByUserId)                      //Get orders of a user
router.get(`/get/userorders/count/:userid`,handle.countOrdersOfOneUser)               //Get number of orders of a user
router.get(`/get/ordersbystatus/:status`,handle.showOrdersByStatus)                   //Get orders by status
router.get(`/get/ordersbystatus/:status/:userid`,handle.showOrdersByStatusAndUserId)  //Get orders of a user by status
router.get(`/get/ordersbydaterange/:startdate/:enddate`,handle.showOrdersInDateRange) //Get orders in a date range

module.exports = router
