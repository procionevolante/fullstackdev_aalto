import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({username, password, setUsername, setPassword, handleSubmit}) => <form
  onSubmit={(event) =>{event.preventDefault(); handleSubmit();} }>
    <div>
      username
      <input value={username} id='username' name='Username' onChange={({target}) => setUsername(target.value)} />
    </div>
    <div>
      password
      <input value={password} id='password' name='Password' type='password' onChange={({target}) => setPassword(target.value)} />
    </div>
    <input id='login-button' type='submit' value='login' />
  </form>

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm;
