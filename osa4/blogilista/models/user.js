const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    passwordHash: String,
    name: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Blog'
    }]
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.passwordHash
        delete returnedObject.__v
    }
})
const User = mongoose.model('User', userSchema)
module.exports = User