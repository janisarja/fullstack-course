const Person = ({ person, ...props }) => {
  return (
      <p>
        {person.name} {person.number}
        <button 
          onClick={props.removePerson} 
          value={person.id}>
          delete
        </button>
      </p>
  )
}

const Persons = (props) => {
  const filteredPersons = props.persons.filter((person) => (
    person.name.toLowerCase().includes(props.filter.toLowerCase())
  ))
  return (
    <div>
      {filteredPersons.map((person) => (
        <Person 
          key={person.id} 
          person={person} 
          removePerson={() => props.removePerson(person.id)} />
      ))}
    </div>
  )
}

export default Persons
