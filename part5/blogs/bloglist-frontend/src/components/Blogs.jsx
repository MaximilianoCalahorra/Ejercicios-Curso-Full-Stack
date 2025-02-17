import Blog from './Blog'

const Blogs = ({blogs}) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes) //De mayor a menor por cantidad de likes.
  return (
    <>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </>
  )
}

export default Blogs