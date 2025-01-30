//Importamos Lodash:
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
  const moreLikesBlog = blogs.reduce((max, currentItem) => currentItem.likes > max.likes ? currentItem : max, blogs[0])
  return {
    title: moreLikesBlog.title,
    author: moreLikesBlog.author,
    likes: moreLikesBlog.likes
  }
}

const mostBlogs = blogs => {
  const grouped = _.countBy(blogs, 'author') //Cuenta blogs por autor.
  const maxAuthor = _.maxBy(Object.keys(grouped), (author) => grouped[author]) //Autor con más blogs.

  return { author: maxAuthor, blogs: grouped[maxAuthor] }
}

const mostLikes = blogs => {
  const grouped = _.groupBy(blogs, 'author') //Blogs de cada autor.
  const authorLikes = _.mapValues(grouped, (blogs) => _.sumBy(blogs, 'likes')) //Likes de cada autor.
  const maxAuthor = _.maxBy(Object.keys(authorLikes), (author) => authorLikes[author]) //Autor con más likes.

  return { author: maxAuthor, likes: authorLikes[maxAuthor] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}