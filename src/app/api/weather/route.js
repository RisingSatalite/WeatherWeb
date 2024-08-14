// app/api/weather/route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const apiKey = process.env.OPENWEATHER_API_KEY; // Ensure this is set correctly

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }

    const weatherData = await response.json();
    return NextResponse.json(weatherData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
