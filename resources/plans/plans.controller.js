const PlansSchema = require('./Plans.schema')
module.exports = class plansController {
    async getAll(req, res) {
        console.log("planscontroller@getAll")
        const plan = await PlansSchema.find()
        res.status(200).send({ plan })
    }
    async createPlan(req, res) {
        console.log("planscontroller@createPlan")
        let plan = await PlansSchema.create(req.body)
        res.status(200).send({ plan })
    }
}