import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div><h1>{props.course}</h1></div>
  )
}

const Part = (props) => {
  return(
    <p>{props.course} {props.ex}</p>
  )
}

const Content = (props) =>{
  return (
    <div>
      <Part {...props.first}/>
      <Part {...props.second}/>
      <Part {...props.third}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.sum.reduce((a, b) => a + b, 0)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content first={{course:part1,ex:exercises1}} second={{course:part2,ex:exercises2}} third={{course:part3,ex:exercises3}} />
      <Total sum={[exercises1,exercises2,exercises3]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))