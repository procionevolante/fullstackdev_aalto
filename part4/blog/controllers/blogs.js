const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('./../utils/config');
require('express-async-errors');

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user')
    .then(blogs => {
      response.json(blogs)
    })
});

blogsRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!token || !decodedToken.id)
    return response.status(401).json({ error: 'token missing or invalid' })

  const user = await User.findById(decodedToken.id); // return authorized user
  const blog = new Blog({
    ...request.body,
    user : user.id
  });
  
  const newBlog = await blog.save();
  response.status(201).json(newBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await Blog.findByIdAndRemove(id);
  res.status(204).end();
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators:true, context:'query' }
  );
  res.json(updatedBlog);
})

module.exports = blogsRouter;
