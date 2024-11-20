import React, {useEffect, useState} from "react";
import axios from 'axios';

const SearchBar = () => {
    const [search, setSearch] = useState("")
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
        <div>
            {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
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
    );
};

export default SearchBar;