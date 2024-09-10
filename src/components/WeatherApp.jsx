/* eslint-disable no-unused-vars */
import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";

import "./WeatherApp.css";
import { useState } from "react";

const apiKey = import.meta.env.VITE_WEATHER_FORECAST_API;

function WeatherApp() {
  const [searchLoc, setSearchLoc] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");

  async function fetchWeather() {
    if (!searchLoc) return;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchLoc}&units=Metric&appid=${apiKey}`
    );
    const data = await res.json();
    console.log(data);
    if (data.cod !== 200) {
      setError(data.message);
    } else {
      setError("");
      setWeatherData(data);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchWeather();
    }
  }

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          {weatherData?.name && (
            <div className="search-top">
              <i className="fa-solid fa-location-dot"></i>
              <div className="location">{weatherData.name}</div>
            </div>
          )}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={searchLoc}
              onChange={(e) => setSearchLoc(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={fetchWeather}
            ></i>
          </div>
        </div>
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="weather">
            <img src={sunny} alt="sunny" />
            <div className="weather-type">Clear</div>
            <div className="temp">28°</div>
            <div className="weather-date">
              <p>Mon, 9 Sep</p>
            </div>
            <div className="weather-data">
              <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">55%</div>
              </div>
              <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">3 km/hr</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
