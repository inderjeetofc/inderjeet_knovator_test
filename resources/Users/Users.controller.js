const _ = require('lodash')

const UserResources = require("./User.resources")
const _User = new UserResources()
const tokens = require('../../utils/tokens')
const eventEmitter = require('../../events/eventEmitter')
const Tokens = new tokens()

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
        let userExist = await _User.findOneEmail(data.email)
        if (userExist)
            return res.status(500).send({
                msg: "Email is already taken !"
            })
        let user = await _User.createOne(data)
        if (!user) {
            return res.status(500).send("Something went wrong !")
        }
        user.profile_img = req.file
        await user.save()
        eventEmitter.emit('user_registered', user)
        return res.status(200).send({
            msg: "User created successfully",
            payload: user
        })
    }
    async login(req, res) {
        let data = _.pick(req.body, ['email', 'password'])
        let user = await _User.findOneEmail(data.email)
        if (!user)
            return res.status(400).send({ msg: "Invalid email or password" })
        let verify = await user.verifyLogin(data.password)
        if (!verify)
            return res.status(400).send({ msg: "Invalid email or password" })
        let token = await Tokens.jwtToken(user)
        res.cookie("isLoggedIn", token, { httpOnly: true })
        return res.status(200).send({ msg: "User logged in successfully", user: user, auth_token: token })

    }
    async getAllUsers(req, res) {
        let users = await _User.findAll()
        res.status(200).send({ users })

    }
}