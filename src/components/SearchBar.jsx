// src/components/SearchBar.jsx

import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && !loading) {
      onSearch(city);
      setCity(''); // مسح الحقل بعد البحث
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        name="city"
        placeholder="Search for a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading} // تعطيل الحقل أثناء التحميل
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;
