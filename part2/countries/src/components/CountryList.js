import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getCurrentWeather = async (city) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const baseWeatherUrl = 'http://api.weatherstack.com';

  return axios.get(`${baseWeatherUrl}/current?access_key=${api_key}&query=${city}`);
}

const WeatherInfo = ({weather}) => {
  if (weather.request === undefined)
    return null;

  const curWeather = weather.current;

  return <>
    <h2>Weather in {weather.location.name}</h2>
    <div>Temperature: {curWeather.temperature}</div>
    <img alt={curWeather.weather_descriptions[0]} src={curWeather.weather_icons[0]} />
    <div>Wind: {curWeather.wind_speed} mph direction {curWeather.wind_dir}</div>
  </>;
}

const Country = ({country, basic, setDetailsOf}) => {
  const [ weather, setWeather ] = useState({});

  // load weather info
  useEffect(() => {
    if (!basic) { // just to be extra sure we don't do 1000 calls immediately
      getCurrentWeather(country.capital).then(res => setWeather(res.data));
    }
  }, [ basic, country ]);

  if (basic)
    return <div>
      { country.name }
      <button onClick={()=>{setDetailsOf(country.name)}}> Show </button>
    </div>;

  return <>
    <h2>{country.name}</h2>
    <div>capital: {country.capital}</div>
    <div>population: {country.population}</div>
    <h3>languages</h3>
    <ul>
    {
      country.languages.map(l => <li key={l.name}>{l.name}</li>)
    }
    </ul>
    <img alt={`Flag of ${country.name}`} style={{maxWidth:'20%'}} src={country.flag} />
    <WeatherInfo weather={weather} />
  </>
}

const CountryList = ({ countries, detailsOf, setDetailsOf }) => {
  const len = countries.length;

  if (len === 0)
    return null;
  if (detailsOf !== '')
    return <Country basic={false} country={countries.filter(c=>c.name===detailsOf)[0]} />
  if (len > 10)
    return <div>Too many matches, specify another filter</div>;
  if (len === 1)
    return <Country basic={false} country={countries[0]} />

  return <>
    {
      countries.map(c =>
        <Country basic={true}
          setDetailsOf={setDetailsOf}
          country={c}
          key={c.alpha3Code}
        />)
    }
  </>;
};

export default CountryList;
