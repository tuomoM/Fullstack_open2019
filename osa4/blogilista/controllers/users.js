const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response, next) => {
    console.log('request body', request.body)
    if (request.body.userName.length < 3 || request.body.password.length < 3) {
        console.log('too short')
        response.status(400).json({
            error: 'username and password have to be 3 or more characters long'

        })
        return
    }
    try {
        const body = request.body
        const saltGrounds = 10
        const passWHash = await bcrypt.hash(body.password, saltGrounds)
        const user = new User({
            userName: body.userName,
            name: body.name,
            passwordHash: passWHash
        })
        const result = await user.save()
        response.status(201).json(result)
    } catch (e) {
        console.log('error ', e.message)
        response.status(400).json(e.message)
    }
})



userRouter.get('/', async (request, response, next) => {
    try {
        const result = await User.find({}).populate('blogs')
        response.status(200).json(result.map(u => u.toJSON()))
    } catch (e) {
        response.status(400).json(e.message)
    }
})
module.exports = userRouter