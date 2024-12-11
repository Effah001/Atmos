import React, { useEffect, useState } from "react";
import axios from 'axios';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from 'react-icons/wi';


const Forecast = ({ weatherData }) => {
    const [dailyForecast, setdailyForecast] = useState([]);
    const [error, setError] = useState(null);
    const [forecastDays, setForecastDays] = useState(7);

    useEffect(() => {
        const fetchData = async () => {
            if (!weatherData?.coord) return;

            const { lon, lat } = weatherData.coord;
            const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&daily=temperature_2m_max,weathercode&timezone=auto&forecast_days=${forecastDays}`;
            try {
                const response = await axios.get(endpoint);
                setdailyForecast(response.data.daily);
                setError(null);
            } catch (error) {
                setError("Unable to fetch forecast data. Please try again.");
                setdailyForecast(null);
            }
        };
        fetchData();
    }, [weatherData, forecastDays]);

    if (!weatherData) {
        return <p>Loading weather data...</p>;
    }

    const weatherIconMap = {
        80: <WiRain color="blue" size={40} />,
        32: <WiCloudy color="gray" size={40} />,
        33: <WiCloudy color="gray" size={40} />,
        45: <WiRain color="blue" size={40} />,
        25: <WiSnow color="lightblue" size={40} />, 
        26: <WiSnow color="lightblue" size={40} />,
        3: <WiCloudy color="gray" size={40} />
    };

    const getWeatherIcon = (code) => {
        return weatherIconMap[code] || <WiCloudy color="gray" size={40} />;
    };
    
    const handleToggle = (checked) => {
        setForecastDays(checked ? 10 : 7);
    };

    return (
        <div className="rounded-lg shadow-xl bg-white/30 w-80 backdrop-blur-md pl-10 pt-5 mb-5 w-96 h-[100%] space-x-6">
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-row space-x-10">
                <p className="text-gray-700 font-bold">Forecast</p>
                <div className="flex items-center space-x-2 mb-4">
                    <span>7-Day</span>
                    <Toggle
                        defaultChecked={forecastDays === 10}
                        onChange={({ target: { checked } }) => handleToggle(checked)}
                    />
                    <span>10-Day</span>
                </div>
            </div>

            {dailyForecast ? (
                <div>
                    <h4>Daily Data</h4>
                    {dailyForecast.weathercode?.map((code, index) => (
                        <div key={index} className="flex items-center space-x-10 hover:scale-105 transition-transform hover:bg-blue-200 rounded-lg">
                            {getWeatherIcon(code)}
                            <p>{Math.round(dailyForecast.temperature_2m_max[index])}°C</p>
                            <p>{new Date(dailyForecast.time[index]).toLocaleDateString('en-GB', {
                                 weekday: 'short',
                                day: '2-digit',  
                                month: 'short',   
                            })}</p>

                        </div>
                    ))}
                    
                </div>
            ) : (
                <p>No daily data available</p>
            )}
        </div>
    );
};

export default Forecast;
