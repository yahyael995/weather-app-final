// src/App.jsx (Final & Fortified Version)
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Import all components
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
  const [city, setCity] = useState('');

  const fetchWeather = useCallback(async (params) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/weather', { params });
      setWeatherData(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch weather data. Please try again.';
      setError(errorMessage);
      setWeatherData(null); // Clear old data on error
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGeolocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            unit: unit,
          });
        },
        () => {
          setError('Geolocation permission denied. Please enter a city manually or enable location services.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, [fetchWeather, unit]);

  // Fetch weather on initial load using geolocation
  useEffect(() => {
    handleGeolocation();
  }, [handleGeolocation]);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeather({ city: searchCity, unit: unit });
  };

  const handleUnitToggle = () => {
    const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(newUnit);
    // Refetch weather with the new unit
    if (weatherData) {
        const params = weatherData.city 
            ? { city: weatherData.city, unit: newUnit }
            : { latitude: weatherData.latitude, longitude: weatherData.longitude, unit: newUnit };
        fetchWeather(params);
    }
  };

  const backgroundImageUrl = weatherData?.current
    ? getBackgroundImage(weatherData.current.weathercode, weatherData.current.is_day)
    : getBackgroundImage(); // Default background

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="main-container">
        <header className="top-bar">
          <SearchBar onSearch={handleSearch} />
          <div className="button-group">
            <SurpriseMe onSurprise={handleSearch} />
            <button onClick={handleGeolocation} aria-label="Use My Location">📍</button>
            <ThemeToggle />
            <UnitToggle unit={unit} onToggle={handleUnitToggle} />
          </div>
        </header>

        <main className="content-area">
          {loading && <div className="loading-spinner"></div>}
          {error && !loading && <div className="solid-card error-box">⚠️ {error}</div>}
          
          {/* --- THIS IS THE CRITICAL FIX --- */}
          {/* Only render components if weatherData and weatherData.current exist */}
          {weatherData && weatherData.current && !loading && !error && (
            <>
              <CurrentWeather data={weatherData} unit={unit} />
              <HourlyForecast data={weatherData.hourly} unit={unit} />
              <DailyForecast data={weatherData.daily} unit={unit} />
              <WeatherChart dailyData={weatherData.daily} unit={unit} />
              <PrecipitationChart dailyData={weatherData.daily} />
            </>
          )}
          {/* --- END OF CRITICAL FIX --- */}

        </main>
      </div>
    </div>
  );
}

export default App;
