import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) 
    {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try 
    {
      const user = await loginService.login({username, password})
      
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')
    } 
    catch(exception) 
    {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }

    const addedBlog = await blogService.create(blogObject)

    if(addedBlog)
    {
      setBlogs(blogs.concat(addedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  if(user === null)
  {
    return <LoginForm username={username} password={password} handleLogin={handleLogin} 
                      setUsername={setUsername} setPassword={setPassword}/>
  }

  return <Blogs blogs={blogs} user={user} handleLogout={handleLogout} handleCreateBlog={addBlog} title={title}
                setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>
}

export default App