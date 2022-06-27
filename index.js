require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const mongoConnect = require("./config/mongodb")
mongoConnect()
var cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/users', require('./resources/Users/Users.routes'))
app.use('/notes', require('./resources/notes/Notes.routes'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})