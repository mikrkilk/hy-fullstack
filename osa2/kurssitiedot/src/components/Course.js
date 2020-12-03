import React from 'react'

const Course = ({ name, id, parts }) => {
  return (
      <div>
        <Header course={name} />
        <Content parts={parts} cid={id} />
        <Total parts={parts} />
    </div>
  )
}

const Header = ({course}) => {
    return (
      <div><h1>{course}</h1></div>
    )
}

const Part = ({id, name, exercises}) => {
    return(
        <li>{name} {exercises}</li>
    )
}

const Content = ({parts, cid}) =>{
    return (
        <ul>
            {parts.map(part => <Part id={part.id} name={part.name} exercises={part.exercises} key={cid+'-'+part.id}/>)}
        </ul>
    )
}

const Total = ({parts}) => {
    return(
        <h3>total of {parts.reduce((a,b) => a+b.exercises,0)} exercises</h3>
    )
  }

export default Course