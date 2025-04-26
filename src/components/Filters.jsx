import React from 'react';

const Filters = ({ selectedSeverity, setSelectedSeverity, sortOrder, setSortOrder }) => {
  return (
    <div className="filters">
      <select
        className="input-field"
        value={selectedSeverity}
        onChange={(e) => setSelectedSeverity(e.target.value)}
      >
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select
        className="input-field"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option>Low to High</option>
        <option>High to Low</option>
      </select>
    </div>
  );
};

export default Filters;
