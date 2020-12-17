import React from 'react'

const Countries = ({countries, curCount, onShow}) => {
  if(Object.keys(curCount).length>1) {
    return(
      <div></div>
    )
  }
  else if(countries.length <= 10 && countries.length>1) {
    return (
        <div>
          <ul>
              {countries.map(country => <li key={country.name}>{country.name}
              <button onClick={()=>onShow(country.name)}>show</button></li>)}
          </ul>
      </div>
    )
  }
  else return <div>Too many countries!</div>
}

export default Countries