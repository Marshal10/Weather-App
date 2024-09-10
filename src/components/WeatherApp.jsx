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
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
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
    setIsLoading(false);
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
        {isLoading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            height="128px"
            width="128px"
            className="pl"
          >
            <circle
              strokeDashoffset="-376.4"
              strokeDasharray="377 377"
              strokeLinecap="round"
              transform="rotate(-90,64,64)"
              strokeWidth="8"
              stroke="hsl(3,90%,55%)"
              fill="none"
              r="60"
              cy="64"
              cx="64"
              className="pl__ring1"
            ></circle>
            <circle
              strokeDashoffset="-329.3"
              strokeDasharray="329.9 329.9"
              strokeLinecap="round"
              transform="rotate(-90,64,64)"
              strokeWidth="7"
              stroke="hsl(13,90%,55%)"
              fill="none"
              r="52.5"
              cy="64"
              cx="64"
              className="pl__ring2"
            ></circle>
            <circle
              strokeDashoffset="-288.6"
              strokeDasharray="289 289"
              strokeLinecap="round"
              transform="rotate(-90,64,64)"
              strokeWidth="6"
              stroke="hsl(23,90%,55%)"
              fill="none"
              r="46"
              cy="64"
              cx="64"
              className="pl__ring3"
            ></circle>
            <circle
              strokeDashoffset="-254"
              strokeDasharray="254.5 254.5"
              strokeLinecap="round"
              transform="rotate(-90,64,64)"
              strokeWidth="5"
              stroke="hsl(33,90%,55%)"
              fill="none"
              r="40.5"
              cy="64"
              cx="64"
              className="pl__ring4"
            ></circle>
            <circle
              strokeDashoffset="-225.8"
              strokeDasharray="226.2 226.2"
              strokeLinecap="round"
              transform="rotate(-90,64,64)"
              strokeWidth="4"
              stroke="hsl(43,90%,55%)"
              fill="none"
              r="36"
              cy="64"
              cx="64"
              className="pl__ring5"
            ></circle>
            <circle
              strokeDashoffset="-203.9"
              strokeDasharray="204.2 204.2"
              strokeLinecap="round"
              transform="rotate(-90,64,64)"
              strokeWidth="3"
              stroke="hsl(53,90%,55%)"
              fill="none"
              r="32.5"
              cy="64"
              cx="64"
              className="pl__ring6"
            ></circle>
          </svg>
        ) : error ? (
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
