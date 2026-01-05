import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons.jsx';
import { getWeatherDescription } from '../utils/weatherUtils.js';

const CurrentWeather = ({ data, unit }) => {
  if (!data || !data.current) return null;

  const current = data.current;

  const temp = current.temperature_2m;
  const apparentTemp = current.apparent_temperature;

  return (
    <div className="solid-card current-weather">
      {getWeatherIcon(current.weathercode, current.is_day, 64)}

      <p className="location">{data.city || 'Current Weather'}</p>

      <p className="description">
        {getWeatherDescription(current.weathercode)}
      </p>

      <h1>
        {Math.round(temp)}°
        <span style={{ fontSize: '0.5em' }}>
          {unit === 'celsius' ? 'C' : 'F'}
        </span>
      </h1>

      <p className="description">
        Feels like {Math.round(apparentTemp)}°
      </p>

      <div className="details">
        <p>Wind: {current.wind_speed_10m} km/h</p>
        <p>Humidity: {current.relative_humidity_2m}%</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
