'use client';

import { useState } from 'react';
import fetchWeather from './util/fetchweather';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London'); // Default city
  const [error, setError] = useState(null);

  

  async function getWeatherInfo() {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>Weather in {city}</h1>
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
    </div>
  );
}
