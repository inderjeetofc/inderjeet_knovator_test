require('dotenv').config()
const jwt = require("jsonwebtoken")

module.exports = class authorise {
    async userAuthCookies(req, res, next) {
        console.log("authorise@userAuth")
        if (req.cookies.isLoggedIn) {
            let token = req.cookies.isLoggedIn
            jwt.verify(token, process.env.JWT_SECRET_KEY)
            if (token) {
                next()
                return
            }
        }
        return res.status(401).send({ msg: "you are not authorised to perform this action" })
    }
}
