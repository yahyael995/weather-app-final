import axios from 'axios';

export default async function handler(req, res) {
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
      const geo = await axios.get(
        `https://api.weatherapi.com/v1/search.json`,
        { params: { key: apiKey, q: city } }
      );

      if (!geo.data.length) {
        return res.status(404).json({ error: 'City not found.' });
      }

      lat = geo.data[0].lat;
      lon = geo.data[0].lon;
      locationName = geo.data[0].name;
    }

    const weather = await axios.get(
      'https://api.open-meteo.com/v1/forecast',
      {
        params: {
          latitude: lat,
          longitude: lon,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weathercode,wind_speed_10m',
          hourly: 'temperature_2m,weathercode,is_day',
          daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
          timezone: 'auto',
          temperature_unit: unit === 'fahrenheit' ? 'fahrenheit' : 'celsius',
          forecast_days: 8
        }
      }
    );

    res.status(200).json({ ...weather.data, city: locationName });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data.' });
  }
}
