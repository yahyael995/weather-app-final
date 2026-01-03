// src/utils/backgrounds.js (Corrected with WMO Codes)
import clearDay from '../assets/backgrounds/clear-day.jpg';
import clearNight from '../assets/backgrounds/clear-night.jpg';
import cloudyDay from '../assets/backgrounds/cloudy-day.jpg';
import cloudyNight from '../assets/backgrounds/cloudy-night.jpg';
import rainyDay from '../assets/backgrounds/rainy-day.jpg';
import rainyNight from '../assets/backgrounds/rainy-night.jpg';
import snowyDay from '../assets/backgrounds/snowy-day.jpg';
import snowyNight from '../assets/backgrounds/snowy-night.jpg';
import thunderstormDay from '../assets/backgrounds/thunderstorm-day.jpg';
import thunderstormNight from '../assets/backgrounds/thunderstorm-night.jpg';
import defaultBg from '../assets/backgrounds/default.jpg';

const backgroundMap = {
  // Clear/Sunny
  0: { day: clearDay, night: clearNight },
  // Mainly Clear, Partly Cloudy, Overcast
  1: { day: cloudyDay, night: cloudyNight },
  2: { day: cloudyDay, night: cloudyNight },
  3: { day: cloudyDay, night: cloudyNight },
  // Rain / Drizzle
  51: { day: rainyDay, night: rainyNight },
  53: { day: rainyDay, night: rainyNight },
  55: { day: rainyDay, night: rainyNight },
  61: { day: rainyDay, night: rainyNight },
  63: { day: rainyDay, night: rainyNight },
  65: { day: rainyDay, night: rainyNight },
  80: { day: rainyDay, night: rainyNight },
  81: { day: rainyDay, night: rainyNight },
  82: { day: rainyDay, night: rainyNight },
  // Snow
  71: { day: snowyDay, night: snowyNight },
  73: { day: snowyDay, night: snowyNight },
  75: { day: snowyDay, night: snowyNight },
  85: { day: snowyDay, night: snowyNight },
  86: { day: snowyDay, night: snowyNight },
  // Thunderstorm
  95: { day: thunderstormDay, night: thunderstormNight },
  96: { day: thunderstormDay, night: thunderstormNight },
  99: { day: thunderstormDay, night: thunderstormNight },
};

export const getBackgroundImage = (code, isDay) => {
  // isDay can be 1 (day) or 0 (night)
  const isDayTime = isDay === 1;
  const condition = backgroundMap[code];
  if (condition) {
    return isDayTime ? condition.day : condition.night;
  }
  return defaultBg; // Fallback to a default background
};
