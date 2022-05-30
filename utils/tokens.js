require('dotenv').config()
const jwt = require('jsonwebtoken')
module.exports = class tokens {
    async jwtToken(user) {
        let jwtToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY)
        return jwtToken
    }
    s
}