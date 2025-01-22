import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import Persons from './components/Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')
  const [resultMessage, setResultMessage] = useState(null)
  const [className, setClassName] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

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

    //Si el contacto ya existe:
    if(isPresent)
    {
        //Preguntamos si quiere reemplazar el número:
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        {
            //Obtenemos la persona a modificar:
            const person = persons[i - 1];

            //Definimos los nuevos datos de la persona:
            const personObject = {
                name: person.name,
                number: newNumber
            }

            //La actualizamos en el JSON y en el array:
            personService
              .update(person.id, personObject)
              .then(updatedPerson => {
                  let newPersons = persons
                  newPersons[i - 1] = updatedPerson
                  setPersons(newPersons)
                  setNewName('')
                  setNewNumber('')
                  setClassName('success')
                  setResultMessage(
                    `Modified ${person.name}`
                  )
                  setTimeout(() => {
                    setClassName(null)
                    setResultMessage(null)
                  }, 5000)
              })
        }
    }
    else
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
              setClassName('success')
              setResultMessage(
                `Added ${newName}`
              )
              setTimeout(() => {
                setClassName(null)
                setResultMessage(null)
              }, 5000)
          })
    }
  }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)
  
    if(window.confirm(`Delete ${person.name}?`))
    {
        personService
          .remove(id)
          .then(setPersons(persons.filter(p => p.id !== id)))
          .catch(error => {
              setClassName('error')
              setResultMessage(`Information of '${person.name}' has already been removed from server`)
              setTimeout(() => {
                setClassName(null)
                setResultMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== id))
          })
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
      <Notification message={resultMessage} className={className}/>
      <Filter value={searchedName} handleOnChange={handleSearchedNameChange}/>
      <h3>add a new</h3>
      <FormPerson handleOnSubmit={addPerson} newName={newName} handleNameOnChange={handleNameChange} newNumber={newNumber} handleNumberOnChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} remove={removePerson}/>
    </>
  )
}

export default App