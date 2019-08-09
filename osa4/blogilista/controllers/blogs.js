const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwToken = require('jsonwebtoken')


blogRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map(b => b.toJSON()))

})
blogRouter.put(`/:id`, async (request, response, next) => {
    try {
        const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
            new: true
        })
        response.status(201).json(result)
    } catch (e) {
        response.status(400).json(e.message)
    }

})

blogRouter.delete('/:id', async (request, response, next) => {
    const token = request.token

    try {
        const decodedToken = jwToken.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(400).json({
                error: 'invalid or missing token'
            })
        }

        const blog = await Blog.findById(request.params.id)
        if (blog.user.toString() === decodedToken.id.toString()) {

            await Blog.findByIdAndDelete(blog.id)

            response.status(204).end()
        }
        response.status(400).json({
            error: 'unauthorized'
        })



    } catch (e) {
        response.status(400).json(e.message)
    }
})
blogRouter.post('/', async (request, response, next) => {
    // const user = await User.findOne({})

    const token = request.token
    try {
        const decodedToken = jwToken.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({
                error: 'invalid or missing token'
            })
        }
        const user = await User.findById(decodedToken.id)
        const blogWuser = {
            likes: request.body.likes,
            title: request.body.title,
            author: request.body.author,
            user: user._id,
            url: request.body.url
        }

        const blog = new Blog(blogWuser)




        const result = await blog.save()
        user.blogs.push(result.id)
        await User.findByIdAndUpdate(user.id, user)
        response.status(201).json(result)
    } catch (e) {
        response.status(400).json(e.message)
    }

})



module.exports = blogRouter