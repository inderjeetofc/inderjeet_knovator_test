const NotesSchema = require("./Notes.schema")
const _ = require('lodash');

module.exports = class NotesController {
    async create(req, res) {
        console.log("NotesController@create")
        try {
            let data = _.pick(req.body, [
                'title',
                'body',
                'loc',
            ])
            data.status = "active"
            data.userId = req.body.userId
            data.created_by = req.user.user_name
            let note = await NotesSchema.create(data)
            return res.status(200).send({ msg: "note created successfully", note })
        } catch (error) {
            console.log(error)
        }
        return res.status(500).send({ msg: "something went wrong !" })

    }
    async getByLocation(req, res) {
        console.log("NotesController@getByLocation")
        let location = req.body.loc
        let coordinates = location.coordinates
        try {
            let note = await NotesSchema.find({
                loc: {
                    coordinates: coordinates
                }
            })
            return res.status(200).send({ msg: "notes fetched successfully", note })
        } catch (error) {
            console.log(error)
        }
        return res.status(500).send({ msg: "something went wrong !" })

    }
    async countStatus(req, res) {
        console.log("NotesController@countStatus")
        try {
            let count = await NotesSchema.countDocuments({
               status:"active"
            })
            return res.status(200).send({ msg: "count fetched successfully", count })
        } catch (error) {
            console.log(error)
        }
        return res.status(500).send({ msg: "something went wrong !" })

    }
    async getAllNotes(req, res) {
        console.log("NotesController@getAllNotes")
        try {
            let note = await NotesSchema.find({ userId: req.body.userId })
            return res.status(200).send({ msg: "notes fetched successfully", note })
        } catch (error) {
            console.log(error)
        }
        return res.status(500).send({ msg: "something went wrong !" })

    }
    async updateNote(req, res) {
        console.log("NotesController@updateNote")
        try {
            let note = await NotesSchema.findById({ _id: req.params.notes_id })
            if (!note)
                return res.status(404).send({ msg: "notes not found" })
            if (note.userId._id.toString() !== req.body.userId)
                return res.status(401).send({ msg: "unauthorised user" })
            let userNote = await NotesSchema.findByIdAndUpdate(req.params.notes_id, req.body)
            return res.status(200).send({ msg: "notes updated successfully", userNote })
        } catch (error) {
            console.log(error)
        }
        return res.status(500).send({ msg: "something went wrong !" })

    }
    async deleteNote(req, res) {
        console.log("NotesController@deleteNote")
        try {
            let note = await NotesSchema.findById({ _id: req.params.notes_id })
            if (!note)
                return res.status(404).send({ msg: "notes not found" })
            if (note.userId._id.toString() !== req.body.userId)
                return res.status(401).send({ msg: "unauthorised user" })
            let deleteNote = await NotesSchema.findByIdAndDelete({ _id: req.params.notes_id })
            console.log(deleteNote)
            return res.status(200).send({ msg: "note deleted successfully", deleteNote })
        } catch (error) {
            console.log(error)
        }
        return res.status(500).send({ msg: "something went wrong !" })

    }
}