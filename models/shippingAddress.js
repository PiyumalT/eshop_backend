const mongoose = require('mongoose');

const shippingAddressSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    zipCode:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    isDefault:{
        type: Boolean,
        default: false,
    },
    isVisiableToUser:{
        type: Boolean,
        default: true,
    },
})

exports.ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);