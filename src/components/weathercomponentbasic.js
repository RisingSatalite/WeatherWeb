'use client';

import { useState } from 'react';
import fetchWeather from './util/fetchweather';
import moment from 'moment-timezone';
import Modal from './util/model';
import GrandView from './util/grandview';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London'); // Default city
  const [error, setError] = useState(null);
  const [oldCity, setOldCity] = useState('');
  const [searches, setSearches] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);//For popup with extra information
  const [grandViewData, setGrandViewData] = useState('')

  async function getWeatherInfo() {
    try {
      const data = await fetchWeather(city);
      setWeather(data);//Set current data
      setOldCity(city);//Set current city

      //Save time
      const now = moment();
      const timeString = now.format('h:mm:ss A'); // Format time as hh:mm:ss AM/PM
      const abbr = now.tz(moment.tz.guess()).format('z');
      const timeNow = timeString + " " + abbr

      setSearches((prevSearches) => [{ city, data, timeNow }, ...prevSearches]);//Add new searches first
    } catch (err) {
      setError(err.message);
    }
  }

  function displayAll(data){
    console.log(data)//Print all data to console
    alert(data)
  }

  //Open popup
  const openModal = (data) => {
    setGrandViewData(data)
    setIsModalVisible(true);
  };
  //Close popup
  const closeModal = () => {
    setIsModalVisible(false);
  };

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
          <p>Time: {item.timeNow}</p>
          <p>Temperature: {item.data.main.temp}°C</p>
          <p>Condition: {item.data.weather[0].description}</p>
          <button onClick={()=>openModal(item)}>All data</button>
        </div>
      ))}
      <Modal visible={isModalVisible} onClose={closeModal}>
        <p>Hi</p>
        <GrandView content={grandViewData}/>
      </Modal>
    </div>
  );
}
