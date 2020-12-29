import React, { useState, useEffect } from 'react';
import PersonList from './components/PersonList';
import NewPersonForm from './components/NewPersonForm';
import phonebookService from './services/phonebook';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newPerson, setNewPerson ] = useState({
    name : '',
    number: '',
  });
  const [ nameFilter, setNameFilter ] = useState('');

  useEffect(() => {
    phonebookService.getAllPersons()
      .then(data => setPersons(data));
  }, []);

  // triggered on form submit
  const addPersonToPhonebook = (event) => {
    event.preventDefault();
    // check if person already in phonebook. If so exit
    if (persons.map(p => p.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
      return;
    }

    phonebookService.addPerson(newPerson)
      .then(p => setPersons(persons.concat(p)));
  }

  const deletePersonFromPhonebook = (id) => {
    phonebookService.deletePerson(id)
      .then(data => setPersons(persons.filter(p => p.id !== id)))
      .catch(err => alert('error. Person already deleted?'));
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  }

  const handlePersonChange = (event) => {
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
      <PersonList deletePerson={deletePersonFromPhonebook} nameFilter={nameFilter} persons={persons} />
    </div>
  )
}

export default App;
