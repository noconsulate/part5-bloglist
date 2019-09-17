import React from 'react'

const SubmitNew = ({
  addBlog, title, setTitle, author, setAuthor, url, setUrl, reset
}) => {
  return (
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
            onChange={setTitle}
          />
          <div>
            author
          </div>
          <input 
            type="text"
            value={author}
            name="Author"
            onChange={setAuthor}
          />
          <div>
            url
          </div>
          <input 
            type="text"
            value={url}
            name="Url"
            onChange={setUrl}
          />
          <button type="submit">submit</button>
          <br/>
          <button onClick={reset}>reset</button>
        </form>
      </div>
  
  )
}

export default SubmitNew