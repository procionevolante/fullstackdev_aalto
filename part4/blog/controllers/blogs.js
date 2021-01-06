const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
require('express-async-errors');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user')
    .then(blogs => {
      response.json(blogs)
    })
});

blogsRouter.post('/', async (request, response) => {
  const user = await User.findOne(); // returns first user
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
