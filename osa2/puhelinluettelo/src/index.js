import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import Persons from './components/Persons';
import entryService from './services/entries'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [error, setError] = useState({message:null,status:"note"})

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
        console.log(person)
        entryService.update(person.id,{...person, number:newNumber})
        .then(response=>{
          setPersons(persons.map(pers => pers.id !==person.id?pers:response))
          setNewName('')
          setNewNumber('')
          setMessage({message:"Updated "+newName,status:'note'})
        })
        .catch(error=>setMessage({message:"Could not edit "+newName+": "+error.response.data.error,status:'error'}))
      }
    }
    else {
      entryService.create({name: newName, number: newNumber})
      .then(response => {
        setMessage({message:"Added "+newName,status:'note'})
        // To get the ID for the new person. Not optimal
        entryService.getAll()
        .then(initEntries => {
        setPersons(initEntries)
        })
        setNewName('')
        setNewNumber('')
      })
      .catch(error=>setMessage({message:"Could not add "+newName+": "+error.response.data.error,status:'error'}))
    }
  }

  const setMessage=(msg) =>{
    setError(msg)
    setTimeout(()=> {
      setError({message:null,status:"note"})
    }, 5000)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const updateFilter = (event) => setFilter(event.target.value)

  const removeEntry = (id) => {
    entryService.remove(id)
    .then(response=>{
      setMessage({message:"Entry removed successfully",status:'note'})
      setPersons(persons.filter(person=>person.id!==id))
    })
    .catch(error=>setMessage({message:error,status:'error'}))
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={error.message} status={error.status} />

      <Filter filt={filter} chg={updateFilter}/>

      <h3>Add a new</h3>

      <PersonForm 
        name={newName} number={newNumber} namChg={handleNameChange} numChg={handleNumberChange} subm={addEntry}/>

      <h3>Numbers</h3>

      <Persons content={persons} onPush={removeEntry} filter={filter} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))