import React from 'react'

const Persons = ({content, onPush}) => {
  return (
      <div>
        <ul>
            {content.map(person => <Person name={person.name} number={person.number} key={person.name} onPush={()=>onPush(person.id)}/>)}
        </ul>
    </div>
  )
}


const Person = ({name, number, onPush}) => {
    return(
        <li>{name} {number} <button onClick={onPush}>delete</button></li>
    )
}



export default Persons