// src/components/SurpriseMe.jsx
import React from 'react';

const SurpriseMe = ({ onSurprise }) => {
  return (
    <button onClick={onSurprise} title="Surprise Me!">
      🎉
    </button>
  );
};

export default SurpriseMe;
