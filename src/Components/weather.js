import React, { useState, useEffect } from 'react';
import searchIcon from './images/search.png';
import windSpeedIcon from './images/wind.png';
import humidityIcon from './images/humidity.png';
import './style.css';

const Weather = () => {
  const [city, setCity] = useState("Karachi");
  const [weatherData, setWeatherData] = useState(null);
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  
  const API_KEY = "89a083aed42cd9b39c304c0019def62c";
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
    };
  
  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="container">
      <div className='user-input'>
        <input
          type="text"
          placeholder="Enter any city name"
          value={city}
          onChange={handleInputChange}
          required
        />
        <button onClick={handleSearch}>
          <img src={searchIcon} alt='Search Icon' style={{width: 35, height: 35}}/>
        </button>
      </div>
      {weatherData && (
        <>            
          <h1 className="container-date">{formattedDate}</h1>
          <div className="weather-data">
            <h2 className="weather-city">{weatherData.name},{weatherData.sys.country}</h2>
            <div className='image-div'>
              <img
                className="weather-img"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                width="180px"
                alt="Weather Icon"
              />
            </div>
            <h2 className="weather-degree">{weatherData.main.temp}</h2>
            <h2 className="weather-desc"> {weatherData.weather[0].description} </h2>
            <div className='weather-stats'>
              <div className='wind'>
                <div className='wind-icon'>
                  <img src={windSpeedIcon} alt='Wind Speed Icon' style={{width: 35, height: 35}}/>
                </div>
                <h3 className='wind-speed'>{weatherData.wind.speed}<span>Km/h</span></h3>
                <h3 className='wind-heading'>Wind Speed</h3>
              </div>    
              <div className='humidity'>
                <div className='humidity-icon'>
                  <img src={humidityIcon} alt='Humidity Icon' style={{width: 35, height: 35}}/>  
                </div>
                <h3 className='humidity-percent'>{weatherData.main.humidity}<span>%</span></h3>
                <h3 className='humidity-heading'>Humidity</h3>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
