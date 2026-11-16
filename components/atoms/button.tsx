import { ButtonProps, ButtonSize, ButtonVariant } from "@/types/button";
import { Loader } from "lucide-react";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-aorange text-white hover:opacity-10 hover:text-white hover:border hover:border-aorange focus:ring-aorange",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    transparent: "text-dark-gray focus:ring-current focus:ring-offset-0 hover:shadow"
  };

  // Size styling maps
  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Combine styles safely
  const combinedClasses =
    `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();
  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader className="animate-spin"/> : null}
      {children}
    </button>
  );
};

export default Button;
