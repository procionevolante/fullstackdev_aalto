import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
}

const like = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const newLikes = (blog.likes || 0) + 1;
  const res = await axios.put(`${baseUrl}/${blog.id}`, {...blog, likes: newLikes, user:blog.user.id}, config);
  return res.data;
}

const save = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
}

export default {
  getAll,
  setToken,
  like,
  save,
}
