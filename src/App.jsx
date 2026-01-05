import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import CurrentWeather from './components/CurrentWeather.jsx';
import DailyForecast from './components/DailyForecast.jsx';
import HourlyForecast from './components/HourlyForecast.jsx';
import WeatherChart from './components/WeatherChart.jsx';
import PrecipitationChart from './components/PrecipitationChart.jsx';
import SearchBar from './components/SearchBar.jsx';
import SurpriseMe from './components/SurpriseMe.jsx';
import UnitToggle from './components/UnitToggle.jsx';
import { getBackgroundImage } from './utils/backgrounds.js';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('celsius');

  const fetchWeather = useCallback(async (params) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('/api/weather', { params });
      setWeatherData(response.data);

    } catch (err) {
      const errorMessage =
        typeof err.response?.data?.error === 'string'
          ? err.response.data.error
          : 'Failed to fetch weather data.';

      setError(errorMessage);
      setWeatherData(null);

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          fetchWeather({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            unit,
          }),
        () => setError('Geolocation permission denied.')
      );
    }
  }, [fetchWeather, unit]);

  const handleSearch = (city) => fetchWeather({ city, unit });

  const handleUnitToggle = () => {
    const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(newUnit);
    if (weatherData) {
      fetchWeather({ city: weatherData.city, unit: newUnit });
    }
  };

  const backgroundImageUrl = weatherData?.current
    ? getBackgroundImage(weatherData.current.weathercode, weatherData.current.is_day)
    : getBackgroundImage();

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <SearchBar onSearch={handleSearch} />
      <UnitToggle unit={unit} onToggle={handleUnitToggle} />

      {loading && <div>Loading...</div>}
      {error && <div>⚠️ {error}</div>}

      {weatherData?.current && !error && (
        <>
          <CurrentWeather data={weatherData} unit={unit} />
          <HourlyForecast data={weatherData.hourly} unit={unit} />
          <DailyForecast data={weatherData.daily} unit={unit} />
          <WeatherChart dailyData={weatherData.daily} unit={unit} />
          <PrecipitationChart dailyData={weatherData.daily} />
        </>
      )}
    </div>
  );
}

export default App;
