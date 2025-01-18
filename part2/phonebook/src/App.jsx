import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const addName = (event) => {
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
          name: newName
        }
      
        setPersons(persons.concat(personObject))
        setNewName('')
    }
    else
    {
        alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </>
  )
}

export default App