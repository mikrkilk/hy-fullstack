import React from 'react'

const Filter = (props) => {
  return (
      <div>Find countries: 
        <input value={props.filt} onChange={props.chg}/>
    </div>
  )
}


export default Filter