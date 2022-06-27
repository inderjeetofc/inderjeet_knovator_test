const express = require('express')
const routes = express.Router()
const authorise = require('../../middleWare/authorise')
const auth = new authorise()
const NotesController = require('./Notes.controller')
const notes = new NotesController()

routes.get('/status', notes.countStatus) //fetch count of all active posts

routes.post('/create', auth.userAuth, notes.create)  //to create notes/posts

routes.get('/location', auth.userAuth, notes.getByLocation)  //to fetch notes based on geo location
routes.get('/allNotes', auth.userAuth, notes.getAllNotes) // get all notes from one user

routes.put('/update/:notes_id', auth.userAuth, notes.updateNote) //update note

routes.delete('/delete/:notes_id', auth.userAuth, notes.deleteNote) //delete note

module.exports = routes