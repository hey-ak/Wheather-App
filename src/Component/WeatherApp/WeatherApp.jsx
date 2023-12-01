import React, { useState } from 'react';
import './WeatherApp.css';

import clearIcon from '../assets/clear.png';
import cloudIcon from '../assets/cloud.png';
import drizzleIcon from '../assets/drizzle.png';
import humidityIcon from '../assets/humidity.png';
import rainIcon from '../assets/rain.png';
import windIcon from '../assets/wind.png';
import snowIcon from '../assets/snow.png';
import searchIcon from '../assets/search2.png';

const WeatherApp = () => {

    let api_key = "5483036779920e10d05cb4b1e5c28fe4";
    const [wicon,setWicon] = useState(cloudIcon);

    const search = async () => {
        const element = document.getElementsByClassName("city-search");
        if(element[0].value === ""){
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const windSpeed = document.getElementsByClassName("wind-speed");
        const tempreature = document.getElementsByClassName("tempreature");
        const location = document.getElementsByClassName("city-name");

        humidity[0].innerHTML = data.main.humidity+" %";
        tempreature[0].innerHTML = Math.floor(data.main.temp)+" °c";
        windSpeed[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
            setWicon(clearIcon);
        }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
            setWicon(cloudIcon);
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            setWicon(drizzleIcon);
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
            setWicon(drizzleIcon);
        }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            setWicon(rainIcon);
        }
        else if(data.weather[0].icon === "010d" || data.weather[0].icon === "010n"){
            setWicon(rainIcon);
        }
        else if(data.weather[0].icon === "013d" || data.weather[0].icon === "013n"){
            setWicon(snowIcon);
        }
        else{
            setWicon(clearIcon);
        }

    }

    return (
        <div className="Container">
            <div className="top-bar">

                <div className="search-bar">
                    <input type="text" className="city-search" placeholder="Search" />
                </div>
                <div className="search-icon" onClick={()=>{search()}}>
                    <img src={searchIcon} alt="ClearIcon" />
                </div>

            </div>

            <div className="weather-img">
                <img src={wicon} alt="" />
            </div>

            <div className="tempreature">24 °C</div>
            <div className="city-name">London</div>

            <div className="weather-details">
                <div className="element">
                    <img src={humidityIcon} alt="" />
                    <div className="data">
                        <div className="humidity-percent">
                            64%
                        </div>
                        <div className="text">
                            Humidity
                        </div>
                    </div>
                </div>

                <div className="element">
                    <img src={windIcon} alt="" />
                    <div className="data">
                        <div className="wind-speed">
                            18 km/h
                        </div>
                        <div className="text">
                            Wind Speed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp
