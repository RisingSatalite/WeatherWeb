export default function GrandView({ content }) {
  
    return (
      <div>
        <div>
            <p>City is {content.city}</p>
            <p>Time is {content.timeNow}</p>
            <p>Temperature is {content.data.main.temp}</p>
            <p>Condition is {content.data.weather[0].description}</p>
        </div>
      </div>
    );
  }