// defines the app Express object. routes can be packed into express
// 'Router' objects and placed into ./controllers.
// then, you import them and use them as middleware.
// A Router can have a common prefix for all its routes
const express = require('express');
const cors = require('cors');
const app = express();
const Blog = require('./models/blog');

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
});

module.exports = app;
