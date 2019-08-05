const config = require('./utils/config')
const http = require('http')
const app = require('./App')

const PORT = 3003
const server = http.createServer(app)
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})