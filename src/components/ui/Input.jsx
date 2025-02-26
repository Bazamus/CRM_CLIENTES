import React from 'react';

export function Input({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text',
  required = false,
  placeholder = '',
  className = ''
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label} {required && '*'}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-1 focus:ring-primary focus:border-primary bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${className}`}
      />
    </div>
  );
}
