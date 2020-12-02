import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({ngood,nneutral,nbad}) => {
  const ntot = (ngood+nbad+nneutral)
  const pos = (ngood/ntot)*100
  const avg = (ngood-nbad)/ntot
  if(ntot === 0) {
    return(<div>No feedback given</div>)
  }
  else {
    return(
      <div>
        <table>
          <tbody>
          <Statistic text="good" value ={ngood} />
          <Statistic text="neutral" value ={nneutral} />
          <Statistic text="bad" value ={nbad} />
          <Statistic text="all" value ={ntot} />
          <Statistic text="average" value ={avg} />
          <Statistic text="positive" value ={pos+" %"} />
          </tbody>
        </table>
      </div>
    )
  }
}

const Statistic = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      Give feedback
      <div>
        <Button handleClick={() => setGood(good+1)} text="Good" />
        <Button handleClick={() => setNeutral(neutral+1)} text="Neutral" />
        <Button handleClick={() => setBad(bad+1)} text="Bad" />
      </div>
      Statistics
      <Statistics ngood={good} nneutral={neutral} nbad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)