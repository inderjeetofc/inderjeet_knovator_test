const joi = require('joi')
let first_name = joi.string().required()
let email = joi.string().email().required()
let phone = joi.number().required()
let password = joi.string().required()
let status = joi.string().valid('registered', 'guest').required()

module.exports = class UserValidation {
    async signup(req, res, next) {
        console.log("UserValidation@signup")
        let schema = {
            first_name,
            email,
            phone,
            password,
            status
        }
        let obj = joi.object(schema)
        let validated
        try {
            validated = await obj.validateAsync(req.body)
        } catch (error) {
            console.log("error in validation :", error)
            res.status(500).send(error)
        }
        if (validated)
            next()
    }
}
