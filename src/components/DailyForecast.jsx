// src/components/DailyForecast.jsx
import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons.jsx';

const DailyForecast = ({ data, unit }) => {
  if (!data || !data.daily || !data.daily.time) return null;

  const daily = data.daily;
  
  // --- هذا هو الإصلاح: استخدم .slice(0, 7) ---
  const sevenDayForecast = daily.time.slice(0, 7).map((day, index) => {
    const maxTemp = unit === 'celsius' ? daily.temperature_2m_max[index] : daily.temperature_2m_max_fahrenheit[index];
    const minTemp = unit === 'celsius' ? daily.temperature_2m_min[index] : daily.temperature_2m_min_fahrenheit[index];
    const dayName = new Date(day).toLocaleDateString('en-US', { weekday: 'long' });

    return { dayName, minTemp, maxTemp, code: daily.weathercode[index] };
  });
  // --- نهاية الإصلاح ---

  return (
    <div className="solid-card daily-forecast">
      <h3>7-Day Forecast</h3>
      {sevenDayForecast.map((day, index) => (
        <div key={index} className="day-item">
          <span>{day.dayName}</span>
          {getWeatherIcon(day.code, true, 24)}
          <span>{Math.round(day.minTemp)}° / {Math.round(day.maxTemp)}°</span>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;
