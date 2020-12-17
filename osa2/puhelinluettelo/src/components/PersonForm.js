import React from 'react'

const PersonForm = ({ name, number, namChg, numChg, subm }) => {
  return (
      <div>
          <form onSubmit={subm}>
            <Inpt text="Name:" val={name} chg={namChg} key='name'/>
            <Inpt text="Number:" val={number} chg={numChg} key='num'/>
            <button type="submit">Add</button>
        </form>
    </div>
  )
}

const Inpt = ({text, val, chg}) => {
    return (
      <div>{text} <input value={val} onChange={chg}/></div>
    )
}


export default PersonForm