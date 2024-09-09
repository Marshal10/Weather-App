/* eslint-disable no-unused-vars */
import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";

import "./WeatherApp.css";

function WeatherApp() {
  return (
    <div className="conatiner">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">Bangalore</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Enter Location" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
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
      </div>
    </div>
  );
}

export default WeatherApp;
