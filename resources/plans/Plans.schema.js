const mongoose = require('mongoose')


const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minLength: 3,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ratingAverage: {
        type: String,
        required: true
    },
    discount: {
        type: Date,
        validate: [() => { this.discount < 100 }, "discount should be less than 100%"]
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

const PlanModel = mongoose.model('plan', PlanSchema);
//immediate function
// (async function createPLan() {
//     let plan = {
//         name: "superFood",
//         duration: 30,
//         price: 1000,
//         ratingAverage: 5,
//         discount: 20
//     }
//     let planCreated = await PlanModel.create(plan)
//     console.log(planCreated)
// })();

module.exports = mongoose.model('plan', PlanSchema);