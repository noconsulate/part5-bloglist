import React from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddigTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = React.useState(false)
  console.log(expanded)
  const showExpanded = { display: expanded ? '' : 'none'}
  const showUnexpanded = { display: expanded ? 'none' : ''}

  const handleClick = (event) => {
    setExpanded(!expanded)
    console.log('clicked', expanded)
  }

  return (
    <div style={blogStyle}>
      <div onClick={handleClick} style={showUnexpanded}>
        {blog.title} <br /> {blog.author}
      </div>

      <div style={showExpanded}>
        Title: {blog.title} <br />
        Author: {blog.author} <br />
        URL: {blog.url} <br />
        Likes: {blog.likes} <button onClick={
          ({target}) => handleLike(target)
        }>Like!</button>
        <br />
      </div>
    </div>
  )
}

export default Blog