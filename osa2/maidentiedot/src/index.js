import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';
import Countries from './components/Countries';
import Country from './components/Country';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryList, setCountryList] = useState([])
  const [curCountry, setCurCountry] = useState({empty:true})
  const [filter, setFilter] = useState('')
  const [capital, setCapital] = useState('')
  const [forecast, setForecast] = useState({empty:true})


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    console.log('weather')
    if(capital==='') return
    axios
      .get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+capital)
      .then(response => {
        console.log(response)
        setForecast(response.data)
      })
  }, [capital])

  
  const updateFilter = (event) => {
    setFilter(event.target.value)
    const newListing = countries.filter(country =>country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setCountryList(newListing)
    if(newListing.length===1) {
      setCapital(newListing[0].capital)
      setCurCountry(newListing[0])
    }
    else setCurCountry({empty:true})
  }

  const updateCountry = (country) => {
    console.log('New country '+country)
    const newCount = countries.filter(count=>count.name===country)[0]
    console.log(newCount);
    setCurCountry(newCount)
    setCapital(newCount.capital)
  }
  

  return (
    <div>
      <Filter filt={filter} chg={updateFilter}/>
      <Countries countries={countryList} curCount={curCountry} onShow={updateCountry}/>
      <Country country={curCountry} forecast={forecast}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))