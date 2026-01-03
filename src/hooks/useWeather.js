// src/hooks/useWeather.js (The Final, Corrected Version)
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const API_URL = '/api'; // Using the proxy

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('celsius');
  const [lastQuery, setLastQuery] = useState(null);

  const fetchWeatherData = useCallback(async (query) => {
    setLoading(true);
    setError('');
    setLastQuery(query);

    try {
        // --- THIS IS THE CRITICAL FIX ---
        let params = { unit };
        if (query.city) {
            params.city = query.city;
        } else if (query.coords) {
            // The backend expects separate lat/lon fields, not a coords object.
            params.latitude = query.coords.latitude;
            params.longitude = query.coords.longitude;
        }
        // --- END OF CRITICAL FIX ---

        const response = await axios.get(`${API_URL}/weather`, { params });

        const structuredData = {
            current: response.data.current,
            hourly: response.data.hourly,
            daily: response.data.daily,
            city: response.data.city,
        };
        setWeatherData(structuredData);

    } catch (err) {
        const errorMessage = err.response?.data?.error || err.message || 'An unexpected error occurred.';
        setError(errorMessage);
        setWeatherData(null);
    } finally {
        setLoading(false);
    }
}, [unit]);

  const toggleUnit = () => {
    setUnit(prevUnit => prevUnit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  // This effect will re-fetch data when the unit changes
  useEffect(() => {
    if (lastQuery) {
      fetchWeatherData(lastQuery);
    }
  }, [unit, lastQuery, fetchWeatherData]);

  return { weatherData, loading, error, unit, fetchWeatherData, toggleUnit, setError };
};
