const PlansSchema = require('../plans/Plans.schema')
const ReviewSchema = require('./Review.schema')
module.exports = class reviewController {
    async getAll(req, res) {
        const review = await ReviewSchema.find()
        res.status(200).send({ review: review })
    }
    async createReview(req, res) {
        let planId = req.query.plan_id
        console.log(req.query.plan_id)
        let plan = await PlansSchema.findById(planId)
        const review = await ReviewSchema.create(req.body)
        res.status(200).send({ review: review })
    }
}