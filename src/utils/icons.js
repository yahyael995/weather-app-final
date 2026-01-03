// src/utils/icons.js (Updated for WeatherAPI.com codes)
import clearDay from '../assets/icons/clear-day.svg';
import clearNight from '../assets/icons/clear-night.svg';
import cloudy from '../assets/icons/cloudy.svg';
import fog from '../assets/icons/fog.svg';
import partlyCloudyDay from '../assets/icons/partly-cloudy-day.svg';
import partlyCloudyNight from '../assets/icons/partly-cloudy-night.svg';
import rain from '../assets/icons/rain.svg';
import snow from '../assets/icons/snow.svg';
import thunderstorm from '../assets/icons/thunderstorm.svg';

const iconMap = {
  // Day icons
  1000: clearDay, // Sunny
  1003: partlyCloudyDay, // Partly cloudy
  1006: cloudy, // Cloudy
  1009: cloudy, // Overcast
  1030: fog, // Mist
  1063: rain, // Patchy rain possible
  1066: snow, // Patchy snow possible
  1069: rain, // Patchy sleet possible
  1072: rain, // Patchy freezing drizzle possible
  1087: thunderstorm, // Thundery outbreaks possible
  1114: snow, // Blowing snow
  1117: snow, // Blizzard
  1135: fog, // Fog
  1147: fog, // Freezing fog
  1150: rain,
  1153: rain,
  1168: rain,
  1171: rain,
  1180: rain,
  1183: rain,
  1186: rain,
  1189: rain,
  1192: rain,
  1195: rain,
  1198: rain,
  1201: rain,
  1204: snow, // Light sleet
  1207: snow, // Moderate or heavy sleet
  1210: snow,
  1213: snow,
  1216: snow,
  1219: snow,
  1222: snow,
  1225: snow,
  1237: snow, // Ice pellets
  1240: rain,
  1243: rain,
  1246: rain,
  1249: snow, // Light sleet showers
  1252: snow, // Moderate or heavy sleet showers
  1255: snow,
  1258: snow,
  1261: snow,
  1264: snow,
  1273: thunderstorm,
  1276: thunderstorm,
  1279: thunderstorm,
  1282: thunderstorm,
};

const nightIconMap = {
  1000: clearNight, // Clear
  1003: partlyCloudyNight, // Partly cloudy
  // For most other night conditions, the day icon is sufficient
};

export const getWeatherIcon = (code, isDay) => {
  if (!isDay && nightIconMap[code]) {
    return nightIconMap[code];
  }
  return iconMap[code] || cloudy; // Default to cloudy icon
};
