import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) =>{ 
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      });

      // note: what is saved is a string (not directly an object)
      //window.localStorage.setItem(
      //  'loggedBlogappUser', JSON.stringify(user)
      //)

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');


    } catch (exception) {
      console.error('wrong user/password');
    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
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
      </div>
    )
  }

  return (
    <div>
      <div> {user.name} logged in </div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
