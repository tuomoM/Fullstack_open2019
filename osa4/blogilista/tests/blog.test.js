const supertest = require('supertest')
const app = require('../App')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const testBlogs = require('./blogtestdata')

beforeEach(async () => {
    await Blog.deleteMany({})

    const newBlog = new Blog(testBlogs[0])
    await newBlog.save()
    const newBlog1 = new Blog(testBlogs[1])
    await newBlog1.save()
    const newBlog2 = new Blog(testBlogs[2])
    await newBlog2.save()


    /*
    Blog.findByIdAndUpdate(reques.params.id, updatedBlog)
    */

})

describe('test retrieving blogs', () => {

    test('Blogs are returned as JSON', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)


    })
    test('Blog 1 is coming with 12 likes', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].likes).toEqual(12)

    })

    test('Blogs are returned with id field instead of _id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })




})
describe('tests for adding new blogs', () => {
    const newBlog = {
        title: "Test blog4",
        author: "tester",
        url: 'url',
        likes: 1,
    }
    test('check that new blog is added', async () => {
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(4)
    })

    test('test that blogs with no likes field get value 0', async () => {
        const newBlog2 = {
            title: "Test blog4",
            url: "urli",
            author: "tester"
        }
        const response = await api.post('/api/blogs').send(newBlog2)
            .expect(201)
        expect(response.body.likes).toEqual(0)
    })
    test('test adding blog with no URL, shoudl fail ', async () => {
        const faultyBlog1 = {
            title: "faulty blog1",
            author: "tester"

        }
        await api.post('/api/blogs').send(faultyBlog1).expect(400)
    })
    test('test adding blog with no title, shoudl fail ', async () => {
        const faultyBlog2 = {
            url: "urli",
            author: "tester"

        }
        await api.post('/api/blogs').send(faultyBlog2).expect(400)
    })


})
describe('Tests to update existing entries', () => {

    test('Test deletion of a Blog', async () => {
        const result = await api.get('/api/blogs')
        const id = result.body[0].id

        const delResult = await api.delete(`/api/blogs/${id}`)
            .expect(204)
        const newResult = await api.get('/api/blogs')
        expect(newResult.body.length).toBe(2)
    })
    test('Test increasing likes of blog 1 12 likes -> 13 likes', async () => {
        let result = await api.get('/api/blogs').expect(200)
        let blog = result.body[0]
        blog.likes = 13
        blog.url = 'uusiUrli'
        const id = blog.id
        const updateResult = await api.put(`/api/blogs/${id}`)
            .send(blog)

        expect(updateResult.body.likes).toEqual(13)
        result = await api.get('/api/blogs')
        expect(result.body[0].likes).toBe(13)


    })
})


afterAll(() => {
    mongoose.connection.close()
})