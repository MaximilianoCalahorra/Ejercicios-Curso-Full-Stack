import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import LoggedUser from './components/LoggedUser'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState('')

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

  const blogFormRef = useRef()

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
      setMessage('Wrong username or password')
      setTypeMessage('error')
      setTimeout(() => {
        setMessage(null)
        setTypeMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
  }

  if(user === null)
  {
    return(
      <>
        <Notification message={message} type={typeMessage}/>
        <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} 
                  setPassword={setPassword}/>
      </>
    ) 
  }

  return(
    <>
      <h2>blogs</h2>
      <Notification message={message} type={typeMessage}/>
      <LoggedUser user={user} handleLogout={handleLogout}/>
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <CreateBlogForm createBlog={addBlog} setMessage={setMessage} setTypeMessage={setTypeMessage}/>
      </Togglable>
      <Blogs blogs={blogs} user={user} handleLogout={handleLogout}/>
    </>
  ) 
}

export default App