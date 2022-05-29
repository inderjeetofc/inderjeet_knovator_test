const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['registered', 'guest']
    }
});

module.exports = mongoose.model('user', UserSchema)