import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
    </div>
  );
};

export default LoadingSpinner;