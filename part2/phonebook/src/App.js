import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  // triggered on form submit
  const addPersonToPhonebook = (event) => {
    event.preventDefault();
    // check if person already in phonebook. If so exit
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    // newId = maxID + 1
    const newId = persons.reduce((acc, cur) => ((cur.id > acc)? cur.id : acc), 0) + 1;

    setPersons(persons.concat({
      id : newId,
      name: newName,
      number: newNumber,
    }));
  }
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersonToPhonebook}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(p => <Person key={p.id} person={p} />)
      }
    </div>
  )
}

export default App;
