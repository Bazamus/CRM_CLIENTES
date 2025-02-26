import React from 'react';

export function Select({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [],
  required = false,
  className = ''
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label} {required && '*'}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-1 focus:ring-primary focus:border-primary bg-white dark:bg-dark-card text-gray-900 dark:text-white ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
