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
  const [error, setError] = useState("Please type a city name");

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const backgroundColors = {
    Clear: "linear-gradient(to right, #f3b07c, #fcd283)",
    Clouds: "linear-gradient(to right, #57d6d4, #71eeec)",
    Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
    Snow: "linear-gradient(to right, #aff2ff, #fff)",
    Haze: "linear-gradient(to right, #57d6d4, #71eeec)",
    Mist: "linear-gradient(to right, #57d6d4, #71eeec)",
  };

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

  const getFormattedDate = () => {
    const today = new Date();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = days[today.getDay()];
    const date = today.getDate();
    const month = months[today.getMonth()];

    return `${day}, ${date} ${month}`;
  };

  const weatherImage = weatherData.weather
    ? weatherImages[weatherData.weather[0].main]
    : null;

  const backgroundGradientColor = weatherData.weather
    ? backgroundColors[weatherData.weather[0].main]
    : null;

  return (
    <div className="container" style={{ background: backgroundGradientColor }}>
      <div
        className="weather-app"
        style={{
          background: backgroundGradientColor
            ? backgroundGradientColor.replace("to right", "to top")
            : null,
        }}
      >
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
            <img src={weatherImage} alt={weatherData.weather[0].main} />
            <div className="weather-type">
              {weatherData.weather ? weatherData.weather[0].main : null}
            </div>
            <div className="temp">
              {weatherData.main ? Math.floor(weatherData.main.temp) : null}°
            </div>
            <div className="weather-date">
              <p>{getFormattedDate()}</p>
            </div>
            <div className="weather-data">
              <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">
                  {weatherData.main ? weatherData.main.humidity : null}%
                </div>
              </div>
              <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">
                  {weatherData.wind ? weatherData.wind.speed : null} km/hr
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
