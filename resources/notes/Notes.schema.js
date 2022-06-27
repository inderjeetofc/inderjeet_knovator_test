const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
        lowercase: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    created_by: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true//cannot be changed
    },
    loc: {
        type: { type: String },
        coordinates: [Number],
    }
});
NotesSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'userId',
        select: "-password"
    })
    next()

})
NotesSchema.pre('save', function (next) {
    this.populate({
        path: 'userId',
        select: "-password"
    })
    next()
})
module.exports = mongoose.model('note', NotesSchema)