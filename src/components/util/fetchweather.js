'use client'

export default async function fetchWeather(city) {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
  
    return response.json();
  }
  