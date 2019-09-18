import React from 'react'

const LoginForm = ( {handleLogin, username, password, handleReset}) => {
  return (
   
    <form onSubmit={handleLogin}>
    <div>
      username
      <input
       {...username}
      />
    </div>
    <div>
      password
      <input
        {...password}
      />
    </div>
    <button type="submit">login</button>
    <button onClick={handleReset}>reset</button>
  </form>
  
  )
}

export default LoginForm