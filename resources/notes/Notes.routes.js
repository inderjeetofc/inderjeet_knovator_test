const express = require('express')
const routes = express.Router()
const authorise = require('../../middleWare/authorise')
const auth = new authorise()
const NotesController = require('./Notes.controller')
const notes = new NotesController()

routes.post('/create', auth.userAuth, notes.create)

module.exports = routes