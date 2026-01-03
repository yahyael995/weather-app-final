// src/services/weatherService.js (النسخة الجديدة التي تتحدث مع الـ Backend)

import axios from 'axios';

// 1. تعريف عنوان الـ API الجديد الخاص بنا
const API_BASE_URL = 'http://localhost:3001/weather';
// 2. تعديل دالة getCoordinates (لا تزال تتحدث مع Open-Meteo مباشرة )
// (لا تغيير هنا، يمكننا نقلها إلى الـ Backend لاحقًا ولكن لنبقها بسيطة الآن)
export const getCoordinates = async (cityName) => {
  const response = await axios.get(
    'https://geocoding-api.open-meteo.com/v1/search',
    {
      params: { name: cityName, count: 1 },
    }
  );
  if (response.data.results && response.data.results.length > 0) {
    return response.data.results[0];
  } else {
    throw new Error(`Could not find coordinates for "${cityName}".`);
  }
};

// 3. تعديل دالة getWeather لتتحدث مع خادمنا
export const getWeather = async (latitude, longitude, tempUnit = 'celsius') => {
  // لاحظ كيف أصبح الطلب أبسط بكثير
  const response = await axios.get(`${BACKEND_API_URL}/api/weather`, {
    params: {
      lat: latitude,
      lon: longitude,
      unit: tempUnit,
    },
  });
  return response.data;
};

// 4. دالة getCityNameFromCoords (لا تغيير هنا أيضًا)
export const getCityNameFromCoords = async (latitude, longitude) => {
  // ... (الكود يبقى كما هو)
};
