import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  const baseClasses =
    "flex items-center justify-center font-medium rounded-md transition-all transform focus:outline-none";

  const variants = {
    primary: disabled
      ? "bg-button-disabled text-text border border-button-disabled cursor-not-allowed"
      : "bg-primary text-white border border-primary hover:bg-primary/90 active:scale-95 cursor-pointer",
    secondary: disabled
      ? "bg-button-disabled text-text border border-button-disabled cursor-not-allowed"
      : "bg-background-tertiary text-text border border-border hover:bg-background active:scale-95 cursor-pointer",
  };

  const sizes = {
    small: "p-1 text-sm",
    medium: "p-1 text-base",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
