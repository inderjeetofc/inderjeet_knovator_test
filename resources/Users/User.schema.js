const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        minLength: 3,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        min: 1,
        max: 100
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
UserSchema.methods.encPass = async function (password) {
    let hashPass
    try {
        let salt = await bcrypt.genSalt(6)
        hashPass = await bcrypt.hash(password, salt)
    } catch (error) {
        throw new Error("error saving user !")
    }
    return hashPass
}
UserSchema.methods.verifyLogin = async function (password) {
    try {
        let user = await bcrypt.compare(password, this.password)
        if (!user)
            return false
    } catch (error) {
        return false
    }
    return true
}
UserSchema.pre('save', async function (next) {
    this.password = await this.encPass(this.password)
    next()
})
module.exports = mongoose.model('user', UserSchema)