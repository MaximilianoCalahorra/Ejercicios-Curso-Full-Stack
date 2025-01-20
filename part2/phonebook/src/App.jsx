import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({value, handleOnChange}) => 
<div>filter shown with<input value={value} onChange={handleOnChange}/></div>

const FormPerson = ({handleOnSubmit, newName, handleNameOnChange, newNumber, handleNumberOnChange}) => {
    return(
        <>
          <form onSubmit={handleOnSubmit}>
            <div>name: <input value={newName} onChange={handleNameOnChange}/></div>
            <div>number: <input value={newNumber} onChange={handleNumberOnChange}/></div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
        </>
    )
}

const Person = ({person}) => <p>{person.name} {person.number}</p>

const Persons = ({persons}) => <>{persons.map(person => <Person key={person.name} person={person}/>)}</>

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchedNameChange = (event) => setSearchedName(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    
    let i = 0;
    let isPresent = false;
    while(i < persons.length && !isPresent)
    {
        if(persons[i].name === newName) isPresent = true
        i++
    }

    if(!isPresent)
    {
        const personObject = {
          name: newName,
          number: newNumber
        }

        personService
          .create(personObject)
          .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
          })
    }
    else
    {
        alert(`${newName} is already added to phonebook`)
    }
  }

  const personsToShow = searchedName === '' ? 
                        persons : 
                        persons.filter(person => {
                          if(person.name.includes(searchedName)) return person
                        })

  return (
    <>
      <h2>Phonebook</h2>
      <Filter value={searchedName} handleOnChange={handleSearchedNameChange}/>
      <h3>add a new</h3>
      <FormPerson handleOnSubmit={addPerson} newName={newName} handleNameOnChange={handleNameChange} newNumber={newNumber} handleNumberOnChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </>
  )
}

export default App