import React from "react";
import { WiStrongWind, WiBarometer, WiHumidity } from 'react-icons/wi';

const CurrentWeather = ({weatherData}) => {
    if (!weatherData) {
        return <p> Loading weather data...</p>
    }
    
    const { timezone } = weatherData;
    const now = new Date(Date.now() + timezone * 1000);
    const localTime = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    
    const icon  = weatherData.weather[0]?.icon || "default-icon";
    const description = weatherData.weather[0]?.description || "Unknown";
    const { temp } = weatherData.main;
    const tempCelsius = (temp - 273.15).toFixed(1);
    const { speed } = weatherData.wind
    const { humidity } = weatherData.main
    const { pressure } = weatherData.main

    const currentDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });

    return (
        <div className="rounded-lg shadow-xl bg-white/30 w-80 backdrop-blur-md p-5 ">
            <p className="text-gray-700 font-bold">Current Weather</p>
            <div className="mb-4 text-gray-800">
                {localTime} {currentDate}
            </div>

            <div className="flex flex-row gap-x-6">
                <div>
                    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
                    
                </div>
                <div className="flex flex-col mt-5"> 
                    <div className="text-4xl font-bold text-gray-800"> {tempCelsius} 
                        <sup className="text-xl">°C</sup></div>
                    <p className="text-lg text-gray-700">{description}</p>
                </div>

            </div>

            <div className="flex flex-row items-center gap-x-10 mt-8 text-gray-600 font-bold ml-5 text-xs">
                <div className="relative group">
                    <WiStrongWind size={24} className="text-blue-500 ml-3" />
                    <span>{speed} m/s </span>
                    <span className="absolute left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition duration-300 mt-4">
                        Wind Speed
                    </span>
                </div>
            
                <div className="relative group"> 
                    <WiHumidity size={24} className="text-blue-500" />
                    <span>{humidity} % </span>
                    <span className="absolute left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition duration-300 mt-4">
                        Humidity
                    </span>
                </div>
                <div className="relative group">
                    <WiBarometer size={24} className="text-blue-500 ml-3" />
                    <span>{pressure} hPa </span>
                    <span className="absolute left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition duration-300 mt-4">
                        Pressure
                    </span>
                </div>
            </div>

        </div>

    );

};

export default CurrentWeather;