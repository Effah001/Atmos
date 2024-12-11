import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = ({ weatherData }) => {
    const mapInstanceRef = useRef(null);
    const mapContainerRef = useRef(null);
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        if (!mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapContainerRef.current).setView([0, 0], 2);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(mapInstanceRef.current);
        }

        if (weatherData?.coord) {
            const { lat, lon } = weatherData.coord;
            mapInstanceRef.current.setView([lat, lon], 11);
        }

        if (apiKey) {
            const precipitationLayer = L.tileLayer(
              `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
              {
                attribution: '© OpenWeatherMap contributors',
              }
            );
      
            precipitationLayer.addTo(mapInstanceRef.current);
        }
      

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [weatherData]);

    return <div ref={mapContainerRef} id="map" className='rounded-lg shadow-lg h-[80%] w-70 mb-1'/>;
};

export default WeatherMap;
