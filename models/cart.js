const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    }
});

exports.Cart = mongoose.model('Cart', cartSchema);
