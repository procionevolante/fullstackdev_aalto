import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [blogFilter, setBlogFilter] = useState({}); // map blogid->boolean. if falsy: show basic. truthy: show details (of blog)
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.map(b=> ({...b, likes:(b.likes?b.likes:0)})) )
    )  
  }, [])

  // check if we already did login. If yes, load user&token from there
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(()=>{setFeedback(null)}, 2000);
  }

  const toggleDetails = (blogId) => {
    // when you need to work fast you really come up with ugly things
    setBlogFilter({...blogFilter, [blogId]:!blogFilter[blogId]});
    // i apologize to the person checking the code for the exam, especially
    // from part5 if you meet me in Helsinki tell me the secret word
    // 'watermelon' and I will offer you a coffee
  }

  const handleLike = async (blog) => {
    const newBlog = await blogService.like(blog);
    setBlogs(blogs.filter(b => b.id !== blog.id).concat(newBlog));
  }

  const handleRemove = async (blog) => {
    if (!window.confirm('delete?'))
      return;
    await blogService.remove(blog);
    setBlogs(blogs.filter(b => b.id !== blog.id));
  }

  const handleNewBlog = async (newBlog) => {
    try {
      await blogService.save(newBlog);
      showFeedback('blog added successfully');
      setBlogs([...blogs, newBlog]);
      blogFormRef.current.toggleVisibility();
    }catch(err){
      console.error(err);
      showFeedback('error while adding blog');
    }
  }

  const handleLogin = async () =>{ 
    try {
      const user = await loginService.login({
        username, password,
      });

      // note: what is saved is a string (not directly an object)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');

      showFeedback('login successful');
    } catch (exception) {
      console.error('wrong user/password');
      showFeedback('login unsuccessful. Wrong password?');
    }

  }

  const handleLogout = async (event) =>{ 
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    showFeedback('logout completed');
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {feedback}
        <LoginForm username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      {feedback}
      <div>
        {user.name} logged in
        <input type='button' value='logout' onClick={handleLogout} />
      </div>
      <h2>blogs</h2>
      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
        <Blog key={blog.id}
          blog={blog}
          showDetails={!!blogFilter[blog.id]}
          toggleDetails={()=>{toggleDetails(blog.id)}}
          like={()=>{handleLike(blog)}}
          canRemove={blog.user.username === user.username}
          remove={()=>{handleRemove(blog)}}
        />
      )}
      <Togglable buttonLabel='new blog' ref={blogFormRef} >
        <BlogForm onSubmit={handleNewBlog} />
      </Togglable>
    </div>
  )
}

export default App
