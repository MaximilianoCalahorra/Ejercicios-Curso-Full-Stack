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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try 
    {
      const user = await loginService.login({username, password})
      
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

  if(user === null)
  {
    return <LoginForm username={username} password={password} handleLogin={handleLogin} 
                      setUsername={setUsername} setPassword={setPassword}/>
  }

  return <Blogs blogs={blogs}/>
}

export default App