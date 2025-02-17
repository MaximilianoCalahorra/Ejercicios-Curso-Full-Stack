import { useState } from 'react'

const CreateBlogForm = ({createBlog, setMessage, setTypeMessage}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const addedBlog = await createBlog({
      title,
      author,
      url
    })

    if(addedBlog)
    {
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
      setTypeMessage('success')

      setTimeout(() => {
        setMessage(null)
        setTypeMessage('')
      }, 5000)
    }
  }

  return(
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
          <div>
              title
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              />
          </div>    
          <div>
              author
              <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              />
          </div>    
          <div>
              url
              <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
              />
          </div>
          <button type="submit">create</button>    
      </form>
    </>
  )
}

export default CreateBlogForm