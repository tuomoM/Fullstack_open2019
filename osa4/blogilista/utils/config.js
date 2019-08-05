require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
console.log('dotenv-env', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
    MONGODB_URI,
    PORT
}