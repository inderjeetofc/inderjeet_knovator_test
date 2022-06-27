const joi = require('joi')
let user_name = joi.string().required()
let email = joi.string().email().required()
let phone = joi.number().required()
let password = joi.string().required()
let age = joi.number()
module.exports = class UserValidation {
    async signup(req, res, next) {
        console.log("UserValidation@signup")
        let schema = {
            user_name,
            email,
            phone,
            password,
            age
        }
        let obj = joi.object(schema)
        let { error } = obj.validate(req.body)
        let errors = []
        if (error) {
            error.details.forEach(err => {
                errors.push(err.message.replace(/["']/g, ""))
            });
            return res.status(400).send({ msg: "invalid req data", error: errors })
        }
        next()
    }
    async login(req, res, next) {
        console.log("UserValidation@login")
        const schema = {
            email,
            password
        }
        const obj = joi.object(schema)
        let errors = []
        let { error } = obj.validate(req.body)
        if (error) {
            error.details.forEach(err => {
                errors.push(err.message.replace(/["']/g, ""))
            })
            return res.status(400).send({ msg: "invalid req data", error: errors })
        }
        next()
    }
}
