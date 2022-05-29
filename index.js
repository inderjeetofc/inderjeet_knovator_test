
const { urlencoded } = require('express')
const express = require('express')
const routes = express.Router()
const app = express()
const port = 3000
const mongoConnect = require("./config/mongodb")
mongoConnect()
app.use(express.json())

app.use('/users', require('./resources/Users/Users.routes'))
// app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})