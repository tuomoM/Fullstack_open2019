const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tokenMW = require('./utils/tokenMW')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false


})


app.use(cors())
app.use(bodyParser.json())
app.use(tokenMW)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app