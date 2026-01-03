// src/components/WeatherForecast.jsx (النسخة المحدثة مع الأيقونات)

import WeatherIcon from './WeatherIcon'; // 1. استيراد مكون الأيقونة

const getDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

function WeatherForecast({ data }) {
  const { time, weathercode, temperature_2m_max, temperature_2m_min } =
    data.daily;

  return (
    <div className="forecast-container">
      <h3>7-Day Forecast</h3>
      <table className="forecast-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Condition</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          {time.map((date, index) => (
            <tr key={date}>
              <td>{getDayName(date)}</td>
              {/* 2. استخدام مكون الأيقونة بدلاً من الرقم */}
              <td>
                <WeatherIcon code={weathercode[index]} />
              </td>
              <td>{temperature_2m_max[index]}°</td>
              <td>{temperature_2m_min[index]}°</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherForecast;
