import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && String(value).length > 0;

  return (
    <div className="relative w-full mb-1">
      <input
        id={id}
        value={value}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        className={`peer w-full px-3 pt-5 pb-2 border rounded-[4px] outline-none transition-colors bg-transparent text-[16px] text-[#1f1f1f] h-[56px]
          ${props.disabled ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' : ''}
          ${isFocused ? 'border-[#0b57d0] border-2' : 'border-[#747775]'}
          ${!isFocused && !props.disabled ? 'hover:border-[#1f1f1f]' : ''}
        `}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 pointer-events-none px-1 bg-[#fff] max-w-[90%] whitespace-nowrap overflow-hidden text-ellipsis
          ${(isFocused || hasValue) 
            ? '-top-2 text-[12px] leading-[12px] h-fit' 
            : 'top-[18px] text-[16px]'}
          ${isFocused ? 'text-[#0b57d0] font-medium' : 'text-[#444746]'}
          ${!isFocused && hasValue ? 'text-[#444746]' : ''}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;