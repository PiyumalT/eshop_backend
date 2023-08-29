const express = require('express');
const router = express.Router();
const handle = require('../handlers/orders')

router.get('/', handle.listOfAllOrders)
router.get('/:id', handle.getOrderbyId)
router.put('/:id', handle.updateOrderStatus)
router.post('/', handle.addNewOrder)
router.delete('/:id', handle.deleteOrder)
router.get('/get/totalsales', handle.getTotalSales)
router.get('/get/count', handle.numberOfOrders)
router.get('/get/userorders/:userid', handle.showOrdersByUserId)
router.get(`/get/userorders/count/:userid`,handle.countOrdersOfOneUser)
router.get(`/get/ordersbystatus/:status`,handle.showOrdersByStatus)
router.get(`/get/ordersbystatus/:status/:userid`,handle.showOrdersByStatusAndUserId)
router.get(`/get/ordersbydaterange/:startdate/:enddate`,handle.showOrdersInDateRange)

module.exports = router
