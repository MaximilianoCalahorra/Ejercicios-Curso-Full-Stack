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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}