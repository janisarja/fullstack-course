import { useEffect, useState } from "react";
import axios from "axios";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    console.log('Fetching weather data for:', country.capital[0]);
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}&units=metric`)
      .then(response => {
        setWeather(response.data);
      })
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital.join(', ')}</p>
      <p>Area: {country.area}</p>  
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} style={{ width: '150px' }} />
      <h2>Weather in {country.capital[0]}</h2>
      {weather === null ? <p>Loading weather data...</p> : (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default CountryInfo;
