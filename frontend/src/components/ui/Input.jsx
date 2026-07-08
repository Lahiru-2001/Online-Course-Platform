import React from 'react';

export default function Input({ label, type = 'text', value, onChange, placeholder = '', className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/10"
        {...props}
      />
    </div>
  );
}
