// components/Dropdown.js
import React from 'react';

const Dropdown = ({ options, value, onChange }) => {
  return (
    <select className="dropdown" onChange={onChange} value={value}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
