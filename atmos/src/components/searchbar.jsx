import React, {useEffect, useState} from "react";
import axios from 'axios';
import CurrentWeather from "./currentweather";
import Forecast from "./forecast";
import Hourlyforecast from "./HourlyForecast";
import WeatherMap from "./weathermap";

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    
    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            if (!search.trim()) {
                setError("Please enter a city name.");
                setWeatherData(null);
                return;
            }

            const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;

            try {
            const response = await axios.get(endpoint);
            setWeatherData(response.data);
            setError(null);

            } catch(error) {
                setError("City not found. Please try again.");
                setWeatherData(null);
        }
    };
        const delayDebounce = setTimeout(fetchData, 1000);
        return () => clearTimeout(delayDebounce);
    }, [search, apiKey]);

    return (
        <div className="p-6">
            {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
        <div className="flex flex-row gap-x-4">    
            <p className="text-2xl">Weather Forcast</p>
            <form>
                <input
                className="rounded-full py-2 px-4 w-64 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text" 
                placeholder="Search City" 
                onChange={handleChange} 
                value={search}
                autoFocus
                />
            </form>
        </div>
         <div className="grid grid-cols-3 mt-5">
            {weatherData && <CurrentWeather weatherData={weatherData} />}
            {weatherData && <WeatherMap weatherData={weatherData} />}
            {weatherData && <Forecast weatherData={weatherData} />}
            {weatherData && <Forecast weatherData={weatherData} />}
            <div className="col-span-2">
                {weatherData && <Hourlyforecast weatherData={weatherData} />}
            </div>
        </div>
        </div>  

    );
};

export default SearchBar;