const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);
const blogs = [
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
  { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
  { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
  { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjs = blogs.map(b => new Blog(b));
  const allPromises = blogObjs.map(bo => bo.save());

  await Promise.all(allPromises);

  return;
  await Blog.deleteMany({});
  let obj = new Blog(blogs[0]);
  await obj.save();

  obj = new Blog(blogs[1]);
  await obj.save();

  obj = new Blog(blogs[2]);
  await obj.save();

  obj = new Blog(blogs[3]);
  await obj.save();

  obj = new Blog(blogs[4]);
  await obj.save();

  obj = new Blog(blogs[5]);
  await obj.save();
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(blogs.length);
})

test('creating a blog increases length of object', async () => {
  const blog = new Blog({
    _id: "5a422b3a1b54a676234d17bc",
    title: "On the importance of procrastination",
    author: "Andrea Fanti",
    url: "fuffa.it",
    likes: 12,
    __v: 0,
  });

  await blog.save();

  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(blogs.length + 1);
})

afterAll(() => {
  mongoose.connection.close();
})
