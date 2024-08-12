'use client';

import { useState } from 'react';
import fetchWeather from './util/fetchweather';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London'); // Default city
  const [error, setError] = useState(null);
  const [oldCity, setOldCity] = useState('');
  const [searches, setSearches] = useState([]);

  async function getWeatherInfo() {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setOldCity(city);
      setSearches((prevSearches) => [{ city, data }, ...prevSearches]);//Add new searches first
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>Weather in {oldCity}</h1>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeatherInfo}>Get weather</button>
      <h2>Previous Searches</h2>
      {searches.map((item, index) => (
        <div key={index} className="search-result">
          <h3>{item.city}</h3>
          <p>Temperature: {item.data.main.temp}°C</p>
          <p>Condition: {item.data.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}
