const mongoose = require('mongoose')
const mongoConnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/i-notebook')
        console.log("connected to mongoDB")
    } catch (error) {
        console.log("Eroor : Failed connection to mongoDB", error)
    }
}
module.exports = mongoConnect