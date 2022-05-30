const PlansSchema = require('../plans/Plans.schema')
const ReviewSchema = require('./Review.schema')
module.exports = class reviewController {
    async getAll(req, res) {
        console.log("Review controller@getAll")

        const review = await ReviewSchema.find()
        res.status(200).send({ review: review })
    }
    async createReview(req, res) {
        console.log("Review controller@createReview")

        let planId = req.query.plan_id
        let plan = await PlansSchema.findById(planId)
        const review = await ReviewSchema.create(req.body)
        res.status(200).send({ review: review })
    }
}