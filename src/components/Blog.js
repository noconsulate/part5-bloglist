import React from 'react'
const Blog = ({ blog, handleClick }) => (
  <div onClick={handleClick}>
    {blog.title} {blog.author}
  </div>
)

export default Blog