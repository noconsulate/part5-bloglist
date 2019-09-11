import React from 'react'

const LoginForm = ( {handleLogin, username, password, setUser, setPass}) => {
  return (
   
    <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={setUser}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={setPass}
      />
    </div>
    <button type="submit">login</button>
  </form>
  
  )
}

export default LoginForm