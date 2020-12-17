import React from 'react'

const Filter = (props) => {
  return (
      <div>Filter shown with: 
        <input value={props.filt} onChange={props.chg}/>
    </div>
  )
}


export default Filter