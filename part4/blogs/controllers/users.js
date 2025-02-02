const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  if(!username)
  {
    return response.status(400).json({ error: 'missing username' })
  }

  if(!password)
  {
    return response.status(400).json({ error: 'missing password' })
  }

  if(username.length < 3)
  {
    return response.status(400).json({ error: 'username must be 3 or more characters' })
  }

  if(password.length < 3)
  {
    return response.status(400).json({ error: 'password must be 3 or more characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter