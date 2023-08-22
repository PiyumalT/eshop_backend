const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    passwordHash:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    defaultShippingAddress:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        default: '',
    }
})

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;

    
    
