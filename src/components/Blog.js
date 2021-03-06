import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, setError, error, user }) => {
  const blogStyle = {
    paddigTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = React.useState(false)
  const showExpanded = { display: expanded ? '' : 'none'}
  const showUnexpanded = { display: expanded ? 'none' : ''}

  const handleClick = (event) => {
    event.preventDefault()
    setExpanded(!expanded)
  }

  const handleLike = async (object) => {
    const blogObj = {
      title: object.title,
      author: object.author,
      url: object.url,
      user: object.user._id,
      likes: object.likes +1,
    }
    try {
      const response = await blogService.update(object.id, blogObj)
      setBlogs(
        blogs.map(blog => blog.id !== object.id ? blog : response)
        .sort((a, b) => b.likes - a.likes)
        )
    } catch {
      setError('Something went wrong...')
      setTimeout(() => {setError('something went wrong')})
    }
  }

  const deleteBlog = async (object) => {
    try {
      await blogService.deleteBlog(object.id)
      setBlogs(blogs.filter(blog => blog.id !== object.id))
    } catch (exception) {
      const errorMessage = exception.response.data.error
      setError(errorMessage)
      setTimeout(() => {setError(null)}, 3000)
    }
  }

  return (
    <div style={blogStyle}>
      <div onClick={handleClick} style={showUnexpanded} className="expandable">
        {blog.title} <br /> {blog.author}
      </div>

      <div style={showExpanded} className="toggleContent">
        Title: {blog.title} <br />
        Author: {blog.author} <br />
        URL: {blog.url} <br />
        Likes: {blog.likes} <button onClick={(event) => handleLike(blog)}>
          Like!</button>
        <br />
        {blog.user.username === user.username ?
        <button onClick={() => deleteBlog(blog)}>
          Delete
        </button> :
        <p></p>
        }
      </div>
    </div>
  )
}

export default Blog