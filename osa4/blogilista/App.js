const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const blogRouter = require('./controllers/blogs')

/*
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true
})

app.use(cors)
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)

*/
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useFindAndModify: false


})

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)

module.exports = app