const jwtoken = require('jsonwebtoken')
const brcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')


loginRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = await User.findOne({
        userName: body.userName
    })
    const passwordCorrect = user === null ?
        false : await brcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid user or password'
        })

    }
    const userForToken = {
        userName: body.userName,
        id: user._id

    }
    const token = jwtoken.sign(userForToken, process.env.SECRET)
    response
        .status(201)
        .send({
            token,
            userName: user.userName,
            name: user.name
        })

})

module.exports = loginRouter