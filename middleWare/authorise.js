require('dotenv').config()
const jwt = require("jsonwebtoken")
const UserResources = require('../resources/Users/User.resources')
let _User = new UserResources()

module.exports = class authorise {
    async userAuthCookies(req, res, next) {
        console.log("authorise@userAuthCookies")
        if (req.cookies.isLoggedIn) {
            let token = req.cookies.isLoggedIn
            let data = jwt.verify(token, process.env.JWT_SECRET_KEY)
            if (data) {
                let userId = data.id
                let user = await _User.findById(userId)
                req.body.userId = userId
                req.body.user = user
                next()
                return
            }
        }
        return res.status(401).send({ msg: "you are not authorised to perform this action" })

    }
    async userAuth(req, res, next) {
        console.log("authorise@userAuth")
        let token = req.headers['auth-token']
        if (!token)
            return res.status(401).send({ msg: "Invalid token!" })
        let data = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!data)
            return res.status(401).send({ msg: "you are not authorised to perform this action" })
        let userId = data.id
        req.body.userId = userId
        let user = await _User.findById(userId)
        req.user = user
        next()
    }
}
