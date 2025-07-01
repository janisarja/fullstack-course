import CountryInfo from "./components/CountryInfo";
import CountrySearch from "./components/CountrySearch";
import SearchResults from "./components/SearchResults";
import { useEffect, useState } from 'react';

const App = () => {
  const [matchingCountries, setMatchingCountries] = useState([]);

  return (
    <div>
      <CountrySearch 
        setMatchingCountries={setMatchingCountries} 
      />
      {matchingCountries.length > 10 ? (
        <p>Too many matches, specify another filter.</p>
      ) : matchingCountries.length > 1 ? (
        <SearchResults 
          matchingCountries={matchingCountries} 
          setMatchingCountries={setMatchingCountries}
        />
      ) : matchingCountries.length === 1 ? (
        <CountryInfo 
          country={matchingCountries[0]} 
        />
      ) : (
        <p>No matching countries.</p>
      )}
    </div>
  )
}

export default App;
