
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 neo-gradient opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-[10%] w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
