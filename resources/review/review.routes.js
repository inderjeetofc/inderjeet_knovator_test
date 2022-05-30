const express = require('express')
const routes = express.Router()
const reviewController = require('./review.controller')
const review = new reviewController()
const authorise = require('../../middleWare/authorise')
const auth = new authorise()


routes.get("/all", review.getAll)
routes.post("/create", auth.userAuthCookies, review.createReview)
module.exports = routes