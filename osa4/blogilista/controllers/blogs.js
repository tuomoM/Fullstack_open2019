const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})
    response.json(blogs)

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
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (e) {
        response.status(400).json(e.message)
    }
})
blogRouter.post('/', async (request, response, next) => {

    const blog = new Blog(request.body)

    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch (e) {
        response.status(400).json(e.message)
    }

})



module.exports = blogRouter