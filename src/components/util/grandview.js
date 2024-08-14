'use client'

export default function GrandView({ content }) {
  
    return (
      <div>
        <div>
            <p>City is {content.city}</p>
            <p>Time is {content.timeNow}</p>
            <p>Temperature is {content.data.main.temp}</p>
            <p>Condition: {content.data.weather[0].description}</p>
            <p>High: {content.data.main.temp_max}</p>
            <p>Low: {content.data.main.temp_min}</p>
            <p>Feels: {content.data.main.feels_like}</p>
            <p>Pressure: {content.data.main.pressure}</p>
        </div>
      </div>
    );
  }