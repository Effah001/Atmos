import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'react-toggle/style.css';
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from 'react-icons/wi';


const Hourlyforecast = ({ weatherData }) => {
    const [hourlyForecast, sethourlyForecast] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!weatherData?.coord) return;

            const { lon, lat } = weatherData.coord;
            const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode,precipitation_probability&timezone=auto`;

            try {
                const response = await axios.get(endpoint);
                sethourlyForecast(response.data.hourly);
                setError(null);
            } catch (error) {
                setError("Unable to fetch forecast data. Please try again.");
                sethourlyForecast([]);
            }
        };
        fetchData();
    }, [weatherData?.coord]);

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

    
    const filteredHourlyData = hourlyForecast.weathercode?.filter((_, index) => index % 3 === 0).slice(0, 9);
    const filteredTemperatures = hourlyForecast.temperature_2m?.filter((_, index) => index % 3 === 0).slice(0, 9);
    const filteredTimes = hourlyForecast.time?.filter((_, index) => index % 3 === 0).slice(0, 9); 
    const filteredrain = hourlyForecast.precipitation_probability?.filter((_, index) => index % 3 === 0).slice(0, 9);  

    return (
        <div className="rounded-lg shadow-xl bg-white/30 backdrop-blur-md p-5">
            {error && <p className="text-red-500">{error}</p>}

            {hourlyForecast ? (
                <div>
                    <h4 className="font-bold text-gray-700">Hourly Data</h4>
                    <div className="flex flex-row gap-1">  
                        {filteredHourlyData?.map((code, index) => (
                            <div key={index} className="flex flex-col items-center space-x-11 space-y-10 mt-24">
                                <p className="ml-10">{Math.round(filteredTemperatures[index])}°C</p>
                                <p>{getWeatherIcon(code)}</p>
                                <p>{Math.round(filteredrain[index])}%</p>
                                <div className="text-xs">{new Date(filteredTimes[index]).toLocaleTimeString('en-US', {
                                    hour: 'numeric', hour12: true
                                })}</div>

                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No hourly data available</p>
            )}
        </div>
    );
};

export default Hourlyforecast;
