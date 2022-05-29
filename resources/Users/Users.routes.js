const express = require('express')
const routes = express.Router()
const UserController = require('./Users.controller')
const UserValidation = require('./Users.validation')
const validate = new UserValidation()
const user = new UserController()

routes.post('/signup', validate.signup, user.signup)
module.exports = routes