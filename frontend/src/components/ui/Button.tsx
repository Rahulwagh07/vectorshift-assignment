import { Loader2 } from "lucide-react";
import React from "react";
import * as Icons from "react-icons/fi";

interface ButtonProps {
  icon?: string;
  text?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  text = "Button",
  variant = "primary",
  onClick,
  loading = false,
  className,
}) => {
  const ButtonIcon = icon ? Icons[icon as keyof typeof Icons] : null;

  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        flex items-center justify-center gap-2 
        px-4 py-2 rounded-md 
        transition-colors duration-200
        ${className}
        ${variantStyles[variant]}
      `}
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        ButtonIcon && <ButtonIcon size={12} />
      )}
      <span>{text}</span>
    </button>
  );
};
