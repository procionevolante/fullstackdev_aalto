import React from 'react';

const BlogForm = ({blog, setBlog, onSubmit}) => {
  const handleChange = ({target}) => {
    setBlog({...blog, [target.name]:target.value});
  }

  return <form
      onSubmit={(event)=>{
        event.preventDefault();
        onSubmit();
      }}
  >
    <div>title <input value={blog.title} name='title' onChange={handleChange} /></div>
    <div>author <input value={blog.author} name='author' onChange={handleChange} /></div>
    <div>url <input value={blog.url} name='url' onChange={handleChange} /></div>
    <input type='submit' />
  </form>
}

export default BlogForm;
