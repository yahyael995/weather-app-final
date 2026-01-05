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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('celsius');

  /* ================= FETCH WEATHER ================= */
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

  /* ================= GEOLOCATION ================= */
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          unit,
        });
      },
      () => {
        setError('Location permission denied. You can search by city.');
        setLoading(false);
      }
    );
  }, [fetchWeather, unit]);

  /* ================= HANDLERS ================= */
  const handleSearch = (city) => {
    fetchWeather({ city, unit });
  };

  const handleUnitToggle = () => {
    const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(newUnit);

    if (weatherData?.city) {
      fetchWeather({ city: weatherData.city, unit: newUnit });
    }
  };

  /* ================= BACKGROUND ================= */
  const backgroundImageUrl = weatherData?.current
    ? getBackgroundImage(
        weatherData.current.weathercode,
        weatherData.current.is_day
      )
    : getBackgroundImage();

  /* ================= RENDER ================= */
  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* ---------- HEADER ---------- */}
      <header className="top-bar">
        <SearchBar onSearch={handleSearch} />
        <div className="button-group">
          <SurpriseMe onSurprise={handleSearch} />
          <UnitToggle unit={unit} onToggle={handleUnitToggle} />
        </div>
      </header>

      {/* ---------- CONTENT ---------- */}
      <main className="content-area">
        {loading && <div className="loading">Loading weather...</div>}

        {error && !loading && (
          <div className="solid-card error-box">⚠️ {error}</div>
        )}

        {!loading && !error && weatherData && (
          <>
            {/* 🌤️ CURRENT WEATHER */}
            {weatherData.current && (
              <div className="current-weather-wrapper">
                <CurrentWeather data={weatherData} unit={unit} />
              </div>
            )}

            {/* ⏰ HOURLY FORECAST */}
            {weatherData.hourly && (
              <HourlyForecast data={weatherData.hourly} unit={unit} />
            )}

            {/* 📅 DAILY + CHARTS */}
            {weatherData.daily && (
              <>
                <DailyForecast data={weatherData.daily} unit={unit} />
                <WeatherChart dailyData={weatherData.daily} unit={unit} />
                <PrecipitationChart dailyData={weatherData.daily} />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
