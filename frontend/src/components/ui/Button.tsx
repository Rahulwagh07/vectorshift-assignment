import React from 'react';
import * as Icons from "react-icons/fi";

interface ButtonProps {
  icon?: string;
  text?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  text = 'Button',
  variant = 'primary',
  onClick
}) => {
  const ButtonIcon = icon ? Icons[icon as keyof typeof Icons] : null;

  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 
        px-4 py-2 rounded-md 
        transition-colors duration-200
        ${variantStyles[variant]}
      `}
    >
      {ButtonIcon && <ButtonIcon size={16} />}
      <span>{text}</span>
    </button>
  );
}; 