const SearchResults = ({ matchingCountries, setMatchingCountries }) => {

  return (
    <ul>
      {matchingCountries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}
          <button 
            onClick={() => setMatchingCountries([country])}
            style={{ marginLeft: '5px' }}
          >
            Show
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
