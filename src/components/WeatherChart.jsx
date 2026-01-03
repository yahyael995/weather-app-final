// src/components/WeatherChart.jsx (The Final, Corrected Version)
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherChart = ({ data, unit }) => {
  if (!data || !data.daily || !data.daily.time || !data.daily.precipitation_probability_max) {
    return null; // More robust check
  }

  const chartData = data.daily.time.slice(0, 7).map((time, index) => {
    const maxTemp = unit === 'celsius' ? data.daily.temperature_2m_max[index] : data.daily.temperature_2m_max_fahrenheit[index];
    const minTemp = unit === 'celsius' ? data.daily.temperature_2m_min[index] : data.daily.temperature_2m_min_fahrenheit[index];
    return {
      name: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
      'Max Temp': Math.round(maxTemp),
      'Min Temp': Math.round(minTemp),
      'Rain %': data.daily.precipitation_probability_max[index],
    };
  });

  return (
    <div className="solid-card chart-container">
      <h3>7-Day Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          
          {/* --- THIS IS THE CRITICAL FIX --- */}
          {/* Left Y-Axis for Temperature */}
          <YAxis 
            yAxisId="left" 
            orientation="left" 
            stroke="#e74c3c" 
            label={{ value: `Temp (°${unit === 'celsius' ? 'C' : 'F'})`, angle: -90, position: 'insideLeft' }} 
          />
          {/* Right Y-Axis for Rain Probability */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#82ca9d" 
            domain={[0, 100]} // Set domain from 0 to 100%
            label={{ value: 'Rain %', angle: 90, position: 'insideRight' }}
          />
          
          <Tooltip />
          <Legend />

          {/* Bar for Rain, linked to the RIGHT axis */}
          <Bar yAxisId="right" dataKey="Rain %" fill="#82ca9d" />
          
          {/* Lines for Temp, linked to the LEFT axis */}
          <Line yAxisId="left" type="monotone" dataKey="Max Temp" stroke="#e74c3c" />
          <Line yAxisId="left" type="monotone" dataKey="Min Temp" stroke="#3498db" />
          {/* --- END OF CRITICAL FIX --- */}

        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
