// src/components/PrecipitationChart.jsx (The Bulletproof Final Version)
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PrecipitationChart({ hourlyData }) {
  // --- THE BULLETPROOF CHECK ---
  if (!hourlyData || !Array.isArray(hourlyData.time)) {
    return null; // Render nothing if data is not ready
  }
  // --- END OF BULLETPROOF CHECK ---

  const chartData = hourlyData.time.map((time, index) => ({
    time: new Date(time).getHours() + ':00',
    probability: hourlyData.precipitation_probability[index],
  }));

  return (
    <>
      <h3>Precipitation Probability</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="%" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="probability" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default PrecipitationChart;
