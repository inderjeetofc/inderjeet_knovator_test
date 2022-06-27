const express = require('express')
const routes = express.Router()
const UserController = require('./Users.controller')
const UserValidation = require('./Users.validation')
const validate = new UserValidation()
const user = new UserController()
const authorise = require('../../middleWare/authorise')
const auth = new authorise()

routes.post('/signup', validate.signup, user.signup) //user signup
routes.post('/login', validate.login, user.login) //user login to get auth-token
routes.get('/allUsers', auth.userAuth, user.getAllUsers) //to get all users 
module.exports = routes