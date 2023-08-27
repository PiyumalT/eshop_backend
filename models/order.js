const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
    }],
    shippingAddress:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingAddress',
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: 'Pending',
    },
    totalPrice:{
        type: Number,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateOrdered:{
        type: Date,
        default: Date.now,
    }
})

exports.Order = mongoose.model('Order', orderSchema);

    
