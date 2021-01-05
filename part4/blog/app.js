// defines the app Express object. routes can be packed into express
// 'Router' objects and placed into ./controllers.
// then, you import them and use them as middleware.
// A Router can have a common prefix for all its routes
const express = require('express');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;
