import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({onSubmit}) => {
  const [blog, setBlog] = useState({title:'', author:'', url:''});
  const handleChange = ({target}) => {
    setBlog({...blog, [target.name]:target.value});
  }

  return <>
    <h2>create new</h2>
    <form
      onSubmit={(event)=>{
        event.preventDefault();
        onSubmit({...blog});
      }}
    >
      <div>title <input value={blog.title} name='title' onChange={handleChange} /></div>
      <div>author <input value={blog.author} name='author' onChange={handleChange} /></div>
      <div>url <input value={blog.url} name='url' onChange={handleChange} /></div>
      <input value='save' type='submit' />
    </form>
  </>
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default BlogForm;
