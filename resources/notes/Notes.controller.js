const NotesSchema = require("./Notes.schema")

module.exports = class NotesController {
    async create(req, res) {
        console.log("NotesController@create")
        try {
            let note = await NotesSchema.create(req.body)
            return res.status(200).send({ msg: "note created successfully", note })
        } catch (error) {
            console.log(error)
        }
        return res.status(500).send({ msg: "something went wrong !" })

    }
}