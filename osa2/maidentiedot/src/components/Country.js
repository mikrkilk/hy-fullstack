import React from 'react'

const Country = ({country, forecast}) => {
  if(country.empty===true) {
    return(<div></div>)
  }
  else {
    return(
      <div><h2>{country.name}</h2>
        capital {country.capital} <br />
        population {country.population}
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lang=><li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="300px" height="200px"/>
      <Weather forecast={forecast} />
      </div>
    )
  }
}

const Weather = ({forecast}) => {
  if(forecast.empty===true) return <div></div>
    return(
      <div><h3>Weather in {forecast.location.name}</h3>
        Temperature: {forecast.current.temperature} Celsius<br />
        <img src={forecast.current.weather_icons[0]} alt="icon" width="200px" height="200px"/><br />
        Wind speed {forecast.current.wind_speed} mph direction {forecast.current.wind_dir}
      </div>
    )
}


export default Country