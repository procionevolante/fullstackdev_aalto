import React, { useState, useEffect } from 'react';
import PersonList from './components/PersonList';
import Message from './components/Message';
import NewPersonForm from './components/NewPersonForm';
import phonebookService from './services/phonebook';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ message, setMessage ] = useState(null);
  const msgTimeout = 3000; // in ms
  const [ newPerson, setNewPerson ] = useState({
    name : '',
    number: '',
  });
  const [ nameFilter, setNameFilter ] = useState('');

  useEffect(() => {
    phonebookService.getAllPersons()
      .then(data => setPersons(data));
  }, []);

  const showResult = (type, msg) => {
    if (type === 'error')
      console.error(msg);
    setMessage({type, text:msg});
    setTimeout(()=>setMessage(null), msgTimeout);
  }

  // triggered on form submit
  const addPersonToPhonebook = (event) => {
    event.preventDefault();
    // check if person already in phonebook.
    if (persons.map(p => p.name).includes(newPerson.name) &&
      window.confirm(`${newPerson.name} is already added to the phonebook, replace old number with new one?`)) {
      const oldpers = persons.find(p => p.name === newPerson.name);
      phonebookService.updatePerson({...oldpers, ...newPerson})
        .then(newpers => {
          setPersons(persons.map(p => p.id === oldpers.id ? newpers : p));
          setMessage({type: 'success', text: `Updated ${newpers.name}`});
          setTimeout(()=> setMessage(null), msgTimeout);
        }).catch(err => showResult('error', err.response.data.error));
    }else {
      phonebookService.addPerson(newPerson)
        .then(p => {
          setPersons(persons.concat(p));
          setMessage({type: 'success', text: `Added ${p.name}`});
          setTimeout(()=> setMessage(null), msgTimeout);
        }).catch(err => showResult('error', err.response.data.error));
    }
  }

  const deletePersonFromPhonebook = (id) => {
    phonebookService.deletePerson(id)
      .then(data => setMessage({type: 'success', text: `Deleted ${persons.find(p=>p.id===id).name}`}))
      .catch(err =>
        setMessage({type: 'error', text: `Information of '${persons.find(p=>p.id===id).name}' might have already been removed from the server`})
      ).finally(data => {
        setPersons(persons.filter(p => p.id !== id))
        setTimeout(()=> setMessage(null), msgTimeout);
      });
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
      <Message msg={message} />
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
