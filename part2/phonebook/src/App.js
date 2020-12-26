import React, { useState } from 'react';
import PersonList from './components/PersonList';
import NewPersonForm from './components/NewPersonForm';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ].map((p, i) => ({...p, id: i})));
  const [ newPerson, setNewPerson ] = useState({
    name : '',
    number: '',
  });
  const [ nameFilter, setNameFilter ] = useState('');

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
