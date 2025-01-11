import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-primary rounded-lg transform rotate-45"></div>
        <div className="absolute inset-0 bg-secondary rounded-lg transform -rotate-45 scale-75"></div>
      </div>
      <span className="text-xl font-bold text-neutral">Sistema BIC</span>
    </div>
  );
};