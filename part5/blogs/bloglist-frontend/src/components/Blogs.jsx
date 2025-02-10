import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'

const Blogs = ({blogs, user, handleLogout, handleCreateBlog, title, setTitle, author, setAuthor, url, setUrl}) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in<button onClick={() => handleLogout()}>logout</button></p>
      <CreateBlogForm handleCreateBlog={handleCreateBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor}
                      url={url} setUrl={setUrl}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs