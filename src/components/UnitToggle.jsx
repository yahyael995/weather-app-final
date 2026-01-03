import React from 'react';

export default function UnitToggle({ unit, onToggle }) {
  return (
    <button onClick={onToggle} aria-label="Toggle temperature unit">
      {unit === 'celsius' ? '°C → °F' : '°F → °C'}
    </button>
  );
}
