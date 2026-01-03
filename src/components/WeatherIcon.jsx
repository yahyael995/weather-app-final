// D:\weather-react\src\components\WeatherIcon.jsx (NEW, corrected version)
import React from 'react';

const getWeatherIcon = (code, isDay = 1) => {
  if (code >= 0 && code <= 1) return isDay ? '☀️' : '🌙';
  if (code === 2) return isDay ? '⛅️' : '☁️';
  if (code === 3) return '☁️';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 95) return '⛈️';
  return '🌍'; // Default icon
};

const WeatherIcon = ({ code, isDay }) => {
  const icon = getWeatherIcon(code, isDay);

  // Return the icon inside a span with a CLASS, not an inline style
  return <span className="weather-icon">{icon}</span>;
};

export default WeatherIcon;
