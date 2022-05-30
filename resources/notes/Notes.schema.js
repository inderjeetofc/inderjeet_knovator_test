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
    description: {
        type: String,
        required: true,
        lowercase: true,
    },
    tag: {
        type: String,
        default: 'general'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true//cannot be changed
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});
NotesSchema.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
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