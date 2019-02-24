import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
  return (
    <div>
      <h2>Kirjaudu</h2>
      <form onSubmit={handleLogin} className='login'>
        <div>
          Käyttäjätunnus:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Salasana:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm