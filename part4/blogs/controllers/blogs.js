const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user
  if(!user)
  {
    return response.status(401).json({ error: 'unauthorized: token missing or invalid' })
  }

  if(!body.title || !body.url)
  {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const user = request.user
  if(!user)
  {
    return response.status(401).json({ error: 'authentication required' })
  }

  const blog = await Blog.findById(request.params.id)
  if(!blog)
  {
    return response.status(404).json({ error: 'blog not found' })
  }

  if(blog.user.toString() !== user._id.toString())
  {
    return response.status(403).json({ error: 'unauthorized action' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter