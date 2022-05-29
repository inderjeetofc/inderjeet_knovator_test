const _ = require('lodash')
const UserResources = require("./User.resources")
const _User = new UserResources()

module.exports = class UserController {
    async signup(req, res) {
        console.log("User controller@signup")
        let data = _.pick(req.body, [
            'first_name',
            'email',
            'password',
            'dob',
            'phone',
            'status'])
        let user = await _User.createOne(data)
        if (!user)
            res.status(500).send("Something went wrong !")
        res.status(200).send({
            msg: "User created successfully",
            payload: user
        })
    }
}