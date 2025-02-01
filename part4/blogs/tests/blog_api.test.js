const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for(let blog of helper.initialBlogs)
  {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('all blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('property name must be "id"', async () => {
  const response = await api
    .get('/api/blogs')
  assert.strictEqual(response.body[0]._id, undefined)
  assert.strictEqual(typeof response.body[0].id, 'string')
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'Unknown',
    url: 'url',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)

  assert(titles.includes('Test blog'))
})

test('a blog without likes can be added', async () => {
  const newBlog = {
    title: 'Another test blog',
    author: 'Another unknown',
    url: 'Another url'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)

  assert(titles.includes('Another test blog'))

  const addedBlog = blogsAtEnd.filter(blog => blog.title === 'Another test blog')
  assert.strictEqual(addedBlog[0].likes, 0)
})

test.only('invalids blog cannot be added', async () => {
  const newBlogWithoutTitle = {
    author: 'Invalid unknown',
    url: 'Invalid url'
  }

  const newBlogWithoutUrl = {
    title: 'Invalid blog',
    author: 'Invalid unknown'
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})