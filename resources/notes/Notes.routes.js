const express = require('express')
const routes = express.Router()
const authorise = require('../../middleWare/authorise')
const auth = new authorise()
const NotesController = require('./Notes.controller')
const notes = new NotesController()

routes.post('/create', auth.userAuth, notes.create)
routes.get('/allNotes', auth.userAuth, notes.getAllNotes)
routes.put('/update/:notes_id', auth.userAuth, notes.updateNote)
routes.delete('/delete/:notes_id', auth.userAuth, notes.deleteNote)

module.exports = routes