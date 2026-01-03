// src/utils/weatherIcons.jsx (Corrected with WMO Codes)
import { WiDaySunny, WiNightClear, WiCloudy, WiDayCloudy, WiNightAltCloudy, WiRain, WiShowers, WiSnow, WiThunderstorm, WiFog } from 'weather-icons-react';

export const getWeatherIcon = (code, isDay, size = 24) => {
  switch (code) {
    case 0: return isDay ? <WiDaySunny size={size} /> : <WiNightClear size={size} />;
    case 1:
    case 2:
    case 3: return isDay ? <WiDayCloudy size={size} /> : <WiNightAltCloudy size={size} />;
    case 45:
    case 48: return <WiFog size={size} />;
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82: return <WiRain size={size} />;
    case 56:
    case 57:
    case 66:
    case 67: return <WiShowers size={size} />; // Freezing Rain
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86: return <WiSnow size={size} />;
    case 95:
    case 96:
    case 99: return <WiThunderstorm size={size} />;
    default: return <WiDaySunny size={size} />;
  }
};
