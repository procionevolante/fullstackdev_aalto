import axios from 'axios';
const baseUrl = '/api/login';

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials);
  // response has (user)name and token
  return res.data;
}

export default { login };
