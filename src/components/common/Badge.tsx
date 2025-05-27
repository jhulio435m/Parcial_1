import React from 'react';

interface BadgeProps {
  status: 'pending' | 'confirmed' | 'cancelled';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const statusClasses = {
    pending: 'bg-warning-500 text-white',
    confirmed: 'bg-success-500 text-white',
    cancelled: 'bg-error-500 text-white',
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status]} ${className}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default Badge;