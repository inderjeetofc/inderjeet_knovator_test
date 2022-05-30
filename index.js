const express = require('express')
const app = express()
const port = 3000
const mongoConnect = require("./config/mongodb")
const cookieParser = require('cookie-parser')
require("./resources/plans/Plans.schema")
mongoConnect()
app.use(express.json())
app.use(cookieParser())

app.use('/users', require('./resources/Users/Users.routes'))
app.use('/plans', require('./resources/plans/plans.routes'))
app.use('/review', require('./resources/review/review.routes'))
app.use('/notes', require('./resources/notes/Notes.routes'))
// app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})