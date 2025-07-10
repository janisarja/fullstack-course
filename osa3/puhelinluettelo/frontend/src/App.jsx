import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personsWithSameName = persons.filter((person) => (
      person.name === newName)
    )
    if ( personsWithSameName.length === 0 ) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setSuccess(true)
          setNotification(
            `Added ${newName}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setSuccess(false)
          setNotification(error.response.data.error)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
    else {
      if ( window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ) {
        const id = personsWithSameName[0].id
        personService
          .update(personsWithSameName[0].id, personObject)
          .then(returnedPerson => {
            setSuccess(true)
            setNotification(
              `Changed ${newName}'s number to ${newNumber}`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
          .catch(error => {
            setSuccess(false)
            setNotification(error.response.data.error)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    }
  }

  const removePerson = id => {
    const name = persons.find(n => n.id === id).name
    if ( window.confirm(`Delete ${name}`) )
    {
      console.log('removing person with id', id)
      personService
        .remove(id)
        .then(() => {
          setSuccess(true)
          setNotification(
            `Deleted ${name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} success={success} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addNumber={addNumber}
                  newName={newName}
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filter={newFilter}
        removePerson={removePerson} />
    </div>
  )
}

export default App
