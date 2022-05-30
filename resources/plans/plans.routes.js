const express = require('express')
const routes = express.Router()
const plansController = require('./plans.controller')
const plan = new plansController()
const authorise = require('../../middleWare/authorise')
const auth = new authorise()


routes.get("/getAll", auth.userAuthCookies, plan.getAll)
routes.post("/create", auth.userAuthCookies, plan.createPlan)
module.exports = routes