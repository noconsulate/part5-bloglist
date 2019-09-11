import React, {useState, useEffect} from 'react';
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import Blog from './components/Blog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(
      blogs => setBlogs(blogs)
    )
  }, [])

  const rows = () => blogs.map(blog => 
    <Blog
      key={blog.id}
      blog={blog}
    />
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('bad credentials')
    }
  }


  return (
    <div>
      <h1>Blogs</h1>
      {user === null ? 
      <LoginForm 
        handleLogin={handleLogin} 
        username={username}
        password={password}
        setUser={({target}) => setUsername(target.value)}
        setPass={({target}) => setPassword(target.value)}
      /> :
      <ul>
        {rows()}
      </ul>
      }

    </div>
  )
}

export default App;
