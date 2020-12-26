import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [ persons, setPersons ] = useState([
    { id:1, name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  // triggered on form submit
  const addPersonToPhonebook = (event) => {
    event.preventDefault();
    // newId = maxID + 1
    const newId = persons.reduce((acc, cur) => ((cur > acc)? cur : acc), 0) + 1;

    setPersons(persons.concat({
      id : newId,
      name: newName
    }));
  }
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersonToPhonebook}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
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
