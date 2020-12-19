import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import entryService from './services/entries'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    entryService.getAll()
      .then(initEntries => {
        setPersons(initEntries)
      })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()
    const person = persons.find(({name}) => name===newName)
    if(!(person===undefined)) {
      if(window.confirm(newName+' is already in the phonebook! \n Update with a new number?')) {
        entryService.update(person.id,{...person, number:newNumber})
        .then(response=>{
          setPersons(persons.map(pers => pers.id !==person.id?pers:response))})
        .catch(response=>console.log(response))
      }
    }
    else {
      entryService.create({name: newName, number: newNumber})
      .then(response => console.log("Success"))
      .catch(error=>console.log(error))
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const updateFilter = (event) => setFilter(event.target.value)

  const removeEntry = (id) => {
    entryService.remove(id)
    .then(response=>{
      console.log(response)
      setPersons(persons.filter(person=>person.id!==id))
    })
    .catch(error => console.log(error))
  }
  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filt={filter} chg={updateFilter}/>

      <h3>Add a new</h3>

      <PersonForm 
        name={newName} number={newNumber} namChg={handleNameChange} numChg={handleNumberChange} subm={addEntry}/>

      <h3>Numbers</h3>

      <Persons content={persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase()))} onPush={removeEntry} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))