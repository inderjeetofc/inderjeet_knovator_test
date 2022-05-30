const mongoose = require('mongoose')


const ReviewSchema = new mongoose.Schema({
    review: {
        type: String,

    },
    rating: {
        type: Number
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    plan: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'plan',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true//cannot be changed
    }

});
ReviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'first_name profile_img'
    }).populate('plan')
    next()
})
module.exports = mongoose.model('review', ReviewSchema)