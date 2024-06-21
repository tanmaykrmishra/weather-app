import React, { useRef, useState } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import humidity_icon from '../assets/humidity.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import './weather.css'

function Weather() {
    const inputRef= useRef()
    const [weatherData,setweatherData]=useState(false);
    const allIcons={
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    }
        const search=(city)=>{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5bc07bc07aede28c16f9642b146258e2`
            fetch(url)
            .then((res)=>res.json())
            .then((result=>{
                    const icon=allIcons[result.weather[0].icon] || clear_icon;
                    setweatherData({
                    humidity: result.main.humidity,
                    windSpeed: result.wind.speed,
                    temperature: Math.floor(result.main.temp),
                    location: result.name,
                    icon: icon,
                 })
                inputRef.current.value='';
            }))
        .catch(error=>{
                setweatherData(false);
                console.log(error);
            })
        }
  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' onKeyPress={event => {
                if (event.key === 'Enter') {
                  search(inputRef.current.value)
                }
              }}/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData? <><img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity}</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} km.hr</p>
                    <span>Wind speed</span>
                </div>
            </div>
        </div></>:<></>}
        
    </div>
  )}

export default Weather