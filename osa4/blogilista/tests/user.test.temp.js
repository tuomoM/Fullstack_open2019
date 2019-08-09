const app = require('../App')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    const user1 = {
        userName: 'testi',
        name: 'testikäyttäjä',
        password: 'salainenSana'
    }
    await api.post('/api/users').send(user1)
})

describe('User creation tests', () => {

    test('test simple user creation', async () => {
        const user = {
            userName: 'root',
            name: 'admin',
            password: 'salainen'

        }
        await api.post('/api/users').send(user).expect(201)

    })

})

describe('Test faulty inputs in user creation', () => {

    test('too short username should result in error', async () => {
        const faultyUser1 = {
            userName: 'ro',
            name: 'admin',
            password: 'salainen'
        }
        await api.post('/api/users').send(faultyUser1)
            .expect(400)
    })


    test('too short password should result in error', async () => {
        const faultyUser2 = {
            userName: 'roppa',
            name: 'admin',
            password: 'sa'
        }
        await api.post('/api/users').send(faultyUser2)
            .expect(400)
    })

})

describe('Testing dublicates', () => {

    test('Creation of duplicate user should result in error', async () => {

        const user2 = {
            userName: 'testi',
            name: 'testikäyttäjä myös',
            password: 'salainen'
        }
        const result2 = await api.post('/api/users').send(user2)
            .expect(400)

    })
})

afterAll(() => {
    mongoose.connection.close()
})