import axios from 'axios';

const baseUrl = '/api';
//const baseUrl = 'http://localhost:3001/api';

const getAllPersons = () =>
  axios.get(`${baseUrl}/persons`)
    .then(res => res.data);

const addPerson = (pers) =>
  axios.post(`${baseUrl}/persons`, pers)
    .then(res => res.data);

const updatePerson = (pers) =>
  axios.put(`${baseUrl}/persons/${pers.id}`, pers)
    .then(res => res.data);

const deletePerson = (id) =>
  axios.delete(`${baseUrl}/persons/${id}`)
    .then(res => res.data);

const exported = {
  getAllPersons,
  addPerson,
  updatePerson,
  deletePerson,
};

export default exported;
