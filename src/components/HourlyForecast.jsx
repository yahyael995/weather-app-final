// src/components/HourlyForecast.jsx (The Final, Corrected Logic)
import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons.jsx';

const HourlyForecast = ({ data, unit }) => {
  if (!data || !data.hourly || !data.hourly.time || !data.hourly.temperature_2m) {
    return null;
  }

  const { time, temperature_2m, temperature_2m_fahrenheit, weathercode, is_day } = data.hourly;

  // 1. Find the index of the current hour in the time array.
  const now = new Date();
  const currentHourIndex = time.findIndex(t => new Date(t) >= now);

  // If we can't find the current hour, something is wrong, so don't render.
  if (currentHourIndex === -1) return null;

  // 2. Slice the next 24 hours starting from the current hour.
  const next24HoursData = time.slice(currentHourIndex, currentHourIndex + 24);

  const forecastItems = next24HoursData.map((t, i) => {
    const dataIndex = currentHourIndex + i; // Get the correct index from the original array
    const temp = unit === 'celsius' ? temperature_2m[dataIndex] : temperature_2m_fahrenheit[dataIndex];
    
    return {
      time: new Date(t).getHours(),
      temp: Math.round(temp),
      code: weathercode[dataIndex],
      is_day: is_day[dataIndex]
    };
  });

  return (
    <div className="solid-card hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="hourly-scroll">
        {forecastItems.map((hour, index) => (
          <div key={index} className="hour-item">
            <span>{hour.time}:00</span>
            {getWeatherIcon(hour.code, hour.is_day, 32)}
            <span>{hour.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
