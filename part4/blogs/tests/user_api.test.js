const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('user tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe('addition of a new user', () => {
    test('a valid user can be added', async () => {
      const newUser = {
        username: 'juana_martinez',
        password: '9281',
        name: 'Juana Martínez'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes('juana_martinez'))
    })

    test('an user with an username shorter than 3 characters cannot be added', async () => {
      const newUser = {
        username: 'lu',
        password: '9142',
        name: 'Lucía González'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })

    test('an user with a password shorter than 3 characters cannot be added', async () => {
      const newUser = {
        username: 'pato_gutierrez',
        password: '11',
        name: 'Patricio Gutiérrez'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })

    test('a duplicated username cannot be added', async () => {
      const newUser = {
        username: 'juana_martinez',
        password: '9281',
        name: 'Juana Martínez'
      }

      await api
        .post('/api/users')
        .send(newUser)

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})