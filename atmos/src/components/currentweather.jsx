import React from "react";

const CurrentWeather = ({weatherData}) => {
    
    const { timezone } = weatherData;
    const now = new Date(Date.now() + timezone * 1000);
    const localTime = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    
    const icon  = weatherData.weather[3]?.icon || "default-icon";
    const { temp } = weatherData.main;

    return (
        <div className="border border-gray-500 p-5">
            <p className="text-gray-400">Current Weather</p>
            <div className="mb-4 text-gray-400">
                {localTime}
            </div>

            <div className="flex flex-row gap-x-4">
                <div>
                    <img src={https://openweathermap.org/img/wn/${icon}@2x.png} alt="weather icon" />
                    <p>{weatherData.weather[0]?.description || "Unknown"}</p>
                </div>
                <div>{temp} °C</div>
            </div>

        </div>
    );

}