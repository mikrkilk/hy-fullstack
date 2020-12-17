import React from 'react'

const Persons = ({content}) => {
  return (
      <div>
        <ul>
            {content.map(person => <Person name={person.name} number={person.number} key={person.name}/>)}
        </ul>
    </div>
  )
}


const Person = ({name, number}) => {
    return(
        <li>{name} {number}</li>
    )
}



export default Persons