import React from 'react'
const Blog = ({ blog, showDetails, toggleDetails }) => (
  <div>
    {blog.title} {blog.author} <input type='button' value={showDetails?'hide':'view'} onClick={toggleDetails} />
    {showDetails?<>
      <div>{blog.url}</div>
      <div>likes {blog.likes || '0'} <input type='button' value='like' /></div>
    </>:null}
  </div>
)

export default Blog
