import React, { useState, useEffect } from 'react';
import PersonList from './components/PersonList';
import NewPersonForm from './components/NewPersonForm';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newPerson, setNewPerson ] = useState({
    name : '',
    number: '',
  });
  const [ nameFilter, setNameFilter ] = useState('');
  const baseurl = 'http://localhost:3001';

  useEffect(() => {
    axios.get(`${baseurl}/persons`)
      .then(res => setPersons(res.data));
  }, []);

  // triggered on form submit
  const addPersonToPhonebook = (event) => {
    event.preventDefault();
    // check if person already in phonebook. If so exit
    if (persons.map(p => p.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
      return;
    }
    // newId = maxID + 1
    const newId = persons.reduce((acc, cur) => ((cur.id > acc)? cur.id : acc), 0) + 1;

    setPersons(persons.concat({
      ...newPerson,
      id : newId,
    }));
  }
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  }
  const handlePersonChange = (event) => {
    console.log(event.target.name, event.target.value);
    setNewPerson({
      ...newPerson,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter by name: <input value={nameFilter} onChange={handleNameFilterChange} />
      </div>
      <h2>Add a new</h2>
      <NewPersonForm
        newPerson = {newPerson}
        handlePersonChange = {handlePersonChange}
        addPerson = {addPersonToPhonebook}
      />
      <h2>Numbers</h2>
      <PersonList nameFilter={nameFilter} persons={persons} />
    </div>
  )
}

export default App;
