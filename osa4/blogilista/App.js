const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false


})


app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

module.exports = app