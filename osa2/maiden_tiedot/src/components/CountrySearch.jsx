import { useEffect, useState } from 'react';
import axios from 'axios';

const CountrySearch = ({ setMatchingCountries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data);
      })
  }, [])

  useEffect(() => {
    setMatchingCountries(
      allCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="country-search">Find countries</label>
        <input 
          id="country-search"
          type="text" 
          placeholder="Search for a country..." 
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default CountrySearch;
