const mongoose = require('mongoose')
const mongoConnect = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        console.log("connected to mongoDB")
    } catch (error) {
        console.log("Eroor : Failed connection to mongoDB", error)
    }
}
module.exports = mongoConnect