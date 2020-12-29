import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';

function App() {
  const [ countryFilter, setCountryFilter ] = useState('');
  const [ countries, setCountries ] = useState([]);
  const [ detailsOf, setDetailsOf ] = useState('');

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value);
    setDetailsOf(''); // hide details about one country if there were some
  }

  const baseurl = 'https://restcountries.eu/rest/v2';
  useEffect(() => {
    axios.get(`${baseurl}/all`)
      .then(res => setCountries(res.data));
  }, []);

  return (
    <div className="App">
      <div>
        find countries <input value={countryFilter} onChange={handleCountryFilterChange} />
      </div>
      <CountryList
        countries={countries.filter(c =>
          c.name.toLowerCase().includes(countryFilter.toLowerCase())
        )}
        detailsOf={detailsOf} setDetailsOf={setDetailsOf}
      />
    </div>
  );
}

export default App;
