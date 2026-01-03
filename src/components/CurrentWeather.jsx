// src/components/CurrentWeather.jsx (Final Fix)
import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons.jsx'; // Import the function
import { getWeatherDescription } from '../utils/weatherUtils.js';

const CurrentWeather = ({ data, unit }) => {
  // Check if the necessary 'current' data exists
  if (!data || !data.current) return null;

  const current = data.current; // Use a shorter variable for convenience
  const temp = unit === 'celsius' ? current.temperature_2m : current.temperature_2m_fahrenheit;
  const apparentTemp = unit === 'celsius' ? current.apparent_temperature : current.apparent_temperature_fahrenheit;

  return (
    <div className="solid-card current-weather">
      {getWeatherIcon(current.weathercode, current.is_day, 64)}
      <p className="location">{data.city || 'Current Weather'}</p>
      <p className="description">{getWeatherDescription(current.weathercode)}</p>
      <h1>{Math.round(temp)}°</h1>
      <p className="description">Feels like {Math.round(apparentTemp)}°</p>
      <div className="details">
        <p>Wind: {current.wind_speed_10m} km/h</p>
        <p>Humidity: {current.relative_humidity_2m}%</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
