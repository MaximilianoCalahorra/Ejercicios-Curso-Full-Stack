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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}