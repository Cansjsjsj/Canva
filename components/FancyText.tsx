
import React from 'react';

const FancyText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const classes = `font-fancy font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-600 inline-block ${className}`;
  return <span className={classes}>{children}</span>;
};

export default FancyText;