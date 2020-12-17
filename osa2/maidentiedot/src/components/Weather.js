import React from 'react'

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

export default Weather