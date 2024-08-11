'use client'

import { useEffect, useState } from 'react';
import fetchWeather from './util/fetchweather';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London'); // Default city
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getWeather() {
      try {
        const data = await fetchWeather(city);
        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    }

    getWeather();
  }, [city]);

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
    </div>
  );
}
