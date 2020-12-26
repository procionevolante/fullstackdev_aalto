import React from 'react';

const Person = ({person}) => (
  <div>
    {person.name} {person.number}
  </div>
)

const PersonList = ({ nameFilter, persons }) => (<>
  {
    persons.filter(p => 
      p.name.toLowerCase().includes(nameFilter.toLowerCase())
    ).map(p =>
      <Person key={p.id} person={p} />
    )
  }
</>)

export default PersonList;
