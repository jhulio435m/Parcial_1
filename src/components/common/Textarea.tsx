import React from 'react';

interface TextareaProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder = '',
  required = false,
  error,
  rows = 4,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-error-500">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-4 py-2 rounded-md border ${
          error ? 'border-error-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-primary-300 transition duration-200`}
      />
      {error && <p className="text-error-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Textarea;