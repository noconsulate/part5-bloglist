import React from 'react'

const SubmitNew = ({
  addBlog, title, author, url, reset
}) => {
  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title
          </div>
          <input 
            {...title}
          />
          <div>
            author
          </div>
          <input 
            {...author}
          />
          <div>
            url
          </div>
          <input 
            {...url}
          />
          <button type="submit">submit</button>
          <br/>
          <button onClick={reset}>reset</button>
        </form>
      </div>
  
  )
}

export default SubmitNew