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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(
      blogs => setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('bad credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const logout = () => {
    if (user) {
      return (
        <form onSubmit={handleLogout}>
          <button type="submit">logout</button>
        </form>
      )
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    console.log(blogObject)

    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
    setAuthor('')
    setTitle('')
    setUrl('')
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
      {user ?
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title
          </div>
          <input 
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}
          />
          <div>
            author
          </div>
          <input 
            type="text"
            value={author}
            name="Author"
            onChange={({target}) => setAuthor(target.value)}
          />
          <div>
            url
          </div>
          <input 
            type="text"
            value={url}
            name="Url"
            onChange={({target}) => setUrl(target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div> :
      <div></div>
      }

      {logout()}
    </div>
  )
}

export default App;
