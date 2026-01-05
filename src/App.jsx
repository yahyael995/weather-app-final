// src/App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';

// Components
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherChart from './components/WeatherChart';
import PrecipitationChart from './components/PrecipitationChart';

// Utils / API
import { fetchWeatherData } from './utils/weatherApi';

function App() {
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const [unit, setUnit] = useState('celsius');
  const [darkMode, setDarkMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* =======================
     Dark Mode Handler
  ======================= */
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  /* =======================
     Fetch Weather
  ======================= */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(query);
      setWeatherData(data);
      setCity(query);
      setQuery('');
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="App">
      <div className="main-container">

        {/* =======================
            Top Bar
        ======================= */}
        <div className="top-bar">
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for a city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <div className="button-group">
            <button
              title="Toggle °C / °F"
              onClick={() =>
                setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')
              }
            >
              {unit === 'celsius' ? '°C' : '°F'}
            </button>

            <button
              title="Toggle Dark Mode"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* =======================
            Status States
        ======================= */}
        {loading && <div className="loading-spinner" />}

        {error && (
          <div className="solid-card error-box">
            <p>{error}</p>
          </div>
        )}

        {!weatherData && !loading && !error && (
          <div className="solid-card welcome-message">
            <h2>🌍 Welcome</h2>
            <p>Search for a city to see the weather forecast.</p>
          </div>
        )}

        {/* =======================
            Content Area
        ======================= */}
        {weatherData && (
          <main className="content-area">

            {/* Current Weather في الأعلى */}
            {weatherData?.current && (
              <div className="current-weather-wrapper">
                <CurrentWeather data={weatherData} unit={unit} />
              </div>
            )}

            {/* Hourly */}
            {weatherData?.hourly && (
              <HourlyForecast data={weatherData.hourly} unit={unit} />
            )}

            {/* Daily + Charts */}
            {weatherData?.daily && (
              <>
                <DailyForecast data={weatherData.daily} unit={unit} />
                <WeatherChart dailyData={weatherData.daily} unit={unit} />
                <PrecipitationChart dailyData={weatherData.daily} />
              </>
            )}

          </main>
        )}

      </div>
    </div>
  );
}

export default App;
