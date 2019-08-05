const listHelper = require('../utils/list_helper')
describe('total likes', () => {
    const listWithOneBlog = [{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    const listWithTwoBlogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0

        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'very hard to find blog',
            author: 'obscure',
            url: 'undefined',
            likes: 45,
            __v: 0
        }
    ]
    test('two blogs with likes total of 50 ', () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        expect(result).toBe(50)
    })

})
describe('Finding the right blogs', () => {
    const listWithThreeBlogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0

        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'very hard to find blog',
            author: 'obscure',
            url: 'undefined',
            likes: 45,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
            __v: 0
        }
    ]
    test('best of 3 blogs is very hard to find blog', () => {
        blog = listHelper.favouriteBlog(listWithThreeBlogs)
        expect(blog).toEqual(listWithThreeBlogs[1])

    })
})