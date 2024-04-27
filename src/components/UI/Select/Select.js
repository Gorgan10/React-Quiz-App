import React from 'react';
import cl from './Select.module.css'

const Select = ({ label, value, onChange, options }) => {
  const htmlFor = `${label}-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <div className={cl.Select}>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={option.value + index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
