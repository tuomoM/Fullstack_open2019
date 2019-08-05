const listHelper = require('../utils/list_helper')

test('dummy test', () => {
    const blogs = []

    result = listHelper.dummy(blogs)

    expect(result).toBe(1)
})