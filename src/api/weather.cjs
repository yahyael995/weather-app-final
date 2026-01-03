// /api/weather.cjs (Corrected for CommonJS)
const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  const { unit, city, latitude, longitude } = req.query;
  const apiKey = process.env.VITE_WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key is missing on the server.' });
  }

  if (!city && (!latitude || !longitude)) {
    return res.status(400).json({ error: 'City or coordinates are required.' });
  }

  let lat = latitude;
  let lon = longitude;
  let locationName = city;

  try {
    if (city) {
      const geocodeUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`;
      const geocodeResponse = await axios.get(geocodeUrl );
      if (geocodeResponse.data.length === 0) {
        return res.status(404).json({ error: 'City not found.' });
      }
      lat = geocodeResponse.data[0].lat;
      lon = geocodeResponse.data[0].lon;
      locationName = geocodeResponse.data[0].name;
    } else if (lat && lon && !city) {
      const reverseGeocodeUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${lat},${lon}`;
      const reverseGeocodeResponse = await axios.get(reverseGeocodeUrl );
      if (reverseGeocodeResponse.data.length > 0) {
        locationName = reverseGeocodeResponse.data[0].name;
      }
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast`;
    const weatherParams = {
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weathercode,wind_speed_10m',
      hourly: 'temperature_2m,weathercode,is_day',
      daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      timezone: 'auto',
      temperature_unit: unit === 'fahrenheit' ? 'fahrenheit' : 'celsius',
      forecast_days: 8,
    };

    const weatherResponse = await axios.get(weatherUrl, { params: weatherParams } );
    
    res.status(200).json({ ...weatherResponse.data, city: locationName });

  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from external API.' });
  }
};
