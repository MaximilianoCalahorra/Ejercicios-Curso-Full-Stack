import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    const updatedBlog = await blogService.addLike(blog)
    setLikes(updatedBlog.likes)
  }

  const remove = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    {
      await removeBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blog-preview'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {likes} <button onClick={addLike}>like</button></div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username && <button onClick={remove}>remove</button>}
      </div>
    </div>
  )
}

export default Blog