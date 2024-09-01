'use client';

import { useState, useEffect } from 'react';
//import fetchWeather from './util/fetchweather';
import moment from 'moment-timezone';
import Modal from './util/model';
import GrandView from './util/grandview';

//Dynamically import
import dynamic from 'next/dynamic';
const  LeafletMap = dynamic(() => import('./util/leafletmap'), { ssr: false });

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London'); // Default city
  const [error, setError] = useState(null);
  const [oldCity, setOldCity] = useState('');
  const [searches, setSearches] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);//For popup with extra information
  const [grandViewData, setGrandViewData] = useState('')

  const [coordinates, setCoordinates] = useState([])

  async function fetchWeather(city) {
    try {
      const response = await fetch(`/api/weather?city=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      console.log("Obtained data?")
      console.log(data)//Debugging
      return data
    } catch (error) {
      setError(error.message);
    }
  }

  async function getWeatherInfo() {
    try {
      const data = await fetchWeather(city);
      console.log("Data obtained")
      setWeather(data); // Set current data
      console.log(data); // For debugging
      setOldCity(city); // Set current city

      // Save time
      const now = moment();
      const timeString = now.format('h:mm:ss A'); // Format time as hh:mm:ss AM/PM
      const abbr = now.tz(moment.tz.guess()).format('z');
      const timeNow = timeString + ' ' + abbr;

      setSearches((prevSearches) => [{ city, data, timeNow }, ...prevSearches]); // Add new searches first
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

  //Set coordinates for the map
  useEffect(() => {
    const updatedCoordinates = searches.map((search) => {
      const label = search.city;
      console.log(search.timeNow);
      const lng = search.data.coord.lon;
      const lat = search.data.coord.lat;
      return { label, lng, lat };
    });

    setCoordinates(updatedCoordinates);
  }, [searches]);

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
      <div>Type , and country code for smaller cities that share name with other cities. &quot;London,CA&quot; for London in Canada</div>
      <h2>Previous Searches</h2>
      {searches.map((item, index) => (
        <div key={index} className="search-result">
          <h3>{item.city}</h3>
          <p>Time: {item.timeNow}</p>
          <p>{item.data.main.temp}°C</p>
          <p>{item.data.weather[0].description}</p>
          <button onClick={()=>openModal(item)}>All data</button>
        </div>
      ))}
      <Modal visible={isModalVisible} onClose={closeModal}>
        <GrandView content={grandViewData}/>
      </Modal>
      <LeafletMap positions={coordinates}/>
    </div>
  );
}
