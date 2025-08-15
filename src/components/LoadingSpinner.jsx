
import React from 'react';

export const LoadingSpinner = ({ message }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      {message && <h1 className="mt-4 text-xl font-bold text-primary">{message}</h1>}
    </div>
  );
};
  