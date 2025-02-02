const mongoose = require('mongoose')
const { initialBlogs } = require('./tests/test_helper')
const Blog = require('./models/blog')

const url = 'mongodb+srv://maximilianocalahorra:Zapato0275@cluster0.vuyfw.mongodb.net/testBlogApp?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)

// Conectar a MongoDB una sola vez
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')

    // Guardar todos los blogs en la base de datos
    return Blog.insertMany(initialBlogs)
  })
  .then(() => {
    console.log('All blogs saved successfully')
  })
  .catch(error => {
    console.error('Error saving blogs:', error)
  })
  .finally(() => {
    // Cerrar la conexión después de completar la operación
    mongoose.connection.close()
  })
