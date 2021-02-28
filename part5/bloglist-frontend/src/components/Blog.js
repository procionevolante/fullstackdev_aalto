import React from 'react';

const Blog = ({ blog, showDetails, toggleDetails, like, remove, canRemove }) => (
  <div>
    {blog.title} {blog.author} <input type='button' value={showDetails?'hide':'view'} onClick={toggleDetails} />
    {showDetails?<>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes || '0'}
        <input type='button' value='like'
          onClick={like}
        />
      </div>
    </>:null}
  {canRemove?<button onClick={remove}>{'delete'}</button>:null}
  </div>
)

export default Blog;
