import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, like, remove, canRemove }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  }

  return <div>
    <span className='blog-title-author' >{blog.title} {blog.author}</span>
    <input type='button' value={showDetails?'hide':'view'} onClick={toggleDetails} />
    {showDetails?<>
      <div className='blog-url' >{blog.url}</div>
      <div className='blog-likes' >
        likes {blog.likes || '0'}
        <input type='button' value='like'
          onClick={like}
        />
      </div>
    </>:null}
  {canRemove?<button onClick={remove}>{'delete'}</button>:null}
  </div>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  showDetails: PropTypes.bool,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool,
}

export default Blog;
