import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)) {
      alert(newName+' is already in the phonebook!')
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const updateFilter = (event) => setFilter(event.target.value)
  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filt={filter} chg={updateFilter}/>

      <h3>Add a new</h3>

      <PersonForm 
        name={newName} number={newNumber} namChg={handleNameChange} numChg={handleNumberChange} subm={addEntry}/>

      <h3>Numbers</h3>

      <Persons content={persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase()))} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))