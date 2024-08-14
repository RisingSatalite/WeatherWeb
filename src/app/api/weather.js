//Securely fetch data, without risking the api key

export default async function handler(req, res) {
    const { city } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY; // No NEXT_PUBLIC_ prefix
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
  
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  
    const weatherData = await response.json();
    res.status(200).json(weatherData);
  }