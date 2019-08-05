const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    if (blogs.lenght === 0) {
        return 0
    }
    const likes = blogs.reduce((acc, curr) => {
        return acc + curr.likes
    }, 0)
    return likes
}

const favouriteBlog = blogs => {
    const blog = blogs.reduce((most, current) => {
        if (!most) return current
        return (most.likes > current.likes) ?
            most : current


    }, {})
    return blog
}

module.exports = {
    favouriteBlog,
    dummy,
    totalLikes
}