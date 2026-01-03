// src/App.jsx (The Final, Corrected Version with ALL Buttons)
import React, { useState, useEffect, useCallback } from 'react'; // Add useCallback
import { useWeather } from './hooks/useWeather.js';
import { getBackgroundImage } from './utils/backgrounds.js';

// Using the REAL file names you provided
import CurrentWeather from './components/CurrentWeather.jsx';
import DailyForecast from './components/DailyForecast.jsx';
import HourlyForecast from './components/HourlyForecast.jsx';
import WeatherChart from './components/WeatherChart.jsx';
import SearchBar from './components/SearchBar.jsx';
import SurpriseMe from './components/SurpriseMe.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

import './App.css';

// Simple components that were missing
const ErrorBox = ({ message, onClear }) => (
  <div className="solid-card error-box">
    <p>⚠️ {message}</p>
    <button onClick={onClear}>Try again</button>
  </div>
);

const WelcomeMessage = () => (
  <div className="solid-card welcome-message">
    <h2>Welcome to WeatherWise</h2>
    <p>Enter a city name or use your location to get the weather forecast.</p>
  </div>
);

function App() {
  const [unit, setUnit] = useState('celsius');
  const { weatherData, error, loading, fetchWeatherData, clearError } = useWeather(unit);
  const [background, setBackground] = useState(getBackgroundImage(null, 1));

  // --- 1. DEFINE THE GEOLOCATION HANDLER ---
  const handleGeolocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeatherData({ coords: position.coords }),
        (err) => console.error(`Geolocation error: ${err.message}`) // Log error properly
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [fetchWeatherData]);
  // --- END OF GEOLOCATION HANDLER ---

  useEffect(() => {
    if (weatherData && weatherData.current) {
      const newBg = getBackgroundImage(weatherData.current.weathercode, weatherData.current.is_day);
      setBackground(newBg);
    }
  }, [weatherData]);

  useEffect(() => {
    // On initial load, try to get location
    handleGeolocation();
  }, [handleGeolocation]); // Depend on the memoized function

  const handleSearch = (city) => {
    fetchWeatherData({ city });
  };

  const handleUnitToggle = () => {
    setUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  const handleSurpriseMe = () => {
    const cities = ["Tokyo", "Delhi", "Shanghai", "São Paulo", "Mumbai", "Mexico City", "Beijing", "Osaka", "Cairo", "New York", "Dhaka", "Karachi", "Buenos Aires", "Kolkata", "Istanbul", "Chongqing", "Lagos", "Manila", "Rio de Janeiro", "Tianjin"];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    fetchWeatherData({ city: randomCity });
  };

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <div className="main-container">
        <div className="top-bar">
          <SearchBar onSearch={handleSearch} />
          <div className="button-group">
            <button onClick={toggleTheme} title="Toggle Theme">🌙</button>
            <button onClick={handleUnitToggle} title="Toggle Units">
              {unit === 'celsius' ? '°C' : '°F'}
            </button>
            <SurpriseMe onSurprise={handleSurpriseMe} />
            {/* --- 2. ADD THE LOCATION BUTTON BACK --- */}
            <button onClick={handleGeolocation} title="Use My Location">
              📍
            </button>
            {/* --- END OF ADDED BUTTON --- */}
          </div>
        </div>

        <div className="content-area">
          {loading && <LoadingSpinner />}
          {error && <ErrorBox message={error} onClear={clearError} />}
          {!loading && !error && !weatherData && <WelcomeMessage />}
          {!loading && !error && weatherData && (
            <>
              <CurrentWeather data={weatherData} unit={unit} />
              <HourlyForecast data={weatherData} unit={unit} />
              <DailyForecast data={weatherData} unit={unit} />
              <WeatherChart data={weatherData} unit={unit} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
