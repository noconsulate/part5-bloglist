import React, { useState, useEffect } from 'react';
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import Blog from './components/Blog'
import AddNew from './components/AddNew'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import {useField} from './hooks'


const App = () => {
  const username = useField('text')
  const password = useField('text')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notice, setNotice] = useState(null)
  const [error, setError] = useState(null)

  useEffect( () =>  {
    const fetch = async () => {
      const blogs = await blogService.getAll()
      setBlogs(sortBlogs(blogs))
    }
    fetch()
  }, [])

  const sortBlogs = blogs => {
    return blogs.sort((a,b) => b.likes - a.likes)
  }

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
      setBlogs={setBlogs}
      blogs={blogs}
      error={error}
      setError={setError}
      user={user}
    />
  )
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.setField('')
      password.setField('')
    } catch (exception) {
      setError('bad login credentials, pal')
      setTimeout(() => {
        setError(null)
      }, 5000)
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

    const response = await blogService.create(blogObject)
    setBlogs(sortBlogs(blogs.concat(response)))
    setAuthor('')
    setTitle('')
    setUrl('')
    setNotice(
      `${response.title} by ${response.author} added`
    )
    setTimeout(() => {
      setNotice(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notice} />
      <Error message={error} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username.value}
          password={password.value}
          setUser={username.onChange}
          setPass={password.onChange}
        /> :
        <ul>
          {rows()}
        </ul>
      }
      {user ?
        <Togglable buttonLabel="Add Note">
          <AddNew
            addBlog={addBlog}
            title={title}
            setTitle={({ target }) => setTitle(target.value)}
            author={author}
            setAuthor={({ target }) => setAuthor(target.value)}
            url={url}
            setUrl={({ target }) => setUrl(target.value)}
          />
        </Togglable>
        :
        <p></p>
      }
      {logout()}
    </div>
  )
}

export default App;
