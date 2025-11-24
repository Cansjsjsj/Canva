import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  // Google buttons: 36px height usually, or 40px. "Next" is usually filled blue.
  // "Create account" is text.
  
  const baseClasses = "px-6 h-10 rounded-full text-sm font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-[#0b57d0] text-white hover:bg-[#0a4ebf] hover:shadow-md",
    secondary: "text-[#0b57d0] hover:bg-[#f0f4f9] border border-[#747775] hover:border-transparent", // Often used for "Back"
    ghost: "text-[#0b57d0] hover:bg-[#f0f4f9] px-2" // For "Create account"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;