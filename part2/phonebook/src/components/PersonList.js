import React from 'react';


const Person = ({person, deletePerson}) => {
  const confirmDelete = () => {
    if (window.confirm(`Really delete ${person.name}?`))
      deletePerson(person.id);
  }

  return <div>
    {person.name} {person.number}
    <button onClick={() => confirmDelete()}>delete</button>
  </div>;
}

const PersonList = ({ nameFilter, persons, deletePerson }) => (<>
  {
    persons.filter(p => 
      p.name.toLowerCase().includes(nameFilter.toLowerCase())
    ).map(p =>
      <Person key={p.id} person={p} deletePerson={deletePerson} />
    )
  }
</>)

export default PersonList;
