import React from 'react';

const Country = ({country, basic}) => {
  if (basic)
    return <div>{ country.name }</div>;

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
    <img alt={`Flag of ${country.name}`} src={country.flag} />
  </>
}

const CountryList = ({ countries }) => {
  const len = countries.length;

  if (len === 0)
    return null;
  if (len > 10)
    return <div>Too many matches, specify another filter</div>;
  if (len === 1)
    return <Country basic={false} country={countries[0]} />

  return (
    <>{
      countries.map(c => <Country basic={true} key={c.alpha3Code} country={c} />)
    }</>
  );
};

export default CountryList;
