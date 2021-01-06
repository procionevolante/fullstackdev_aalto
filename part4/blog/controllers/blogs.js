const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
require('express-async-errors');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
});

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await blog.findByIdAndRemove(id);
  res.status(204).end();
})

module.exports = blogsRouter;
