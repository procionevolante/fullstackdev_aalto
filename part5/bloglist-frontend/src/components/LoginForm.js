import React from 'react';

const LoginForm = ({username, password, setUsername, setPassword, handleSubmit}) => <form
  onSubmit={(event) =>{event.preventDefault(); handleSubmit();} }>
    <div>
      username
      <input value={username} name='Username' onChange={({target}) => setUsername(target.value)} />
    </div>
    <div>
      password
      <input value={password} name='Password' type='password' onChange={({target}) => setPassword(target.value)} />
    </div>
    <input type='submit' value='login' />
  </form>

export default LoginForm;
