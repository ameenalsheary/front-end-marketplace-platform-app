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
  const variantClass = disabled
    ? "btn-disabled"
    : {
      primary: "btn-primary",
      secondary: "btn-secondary",
      error: "btn-error",
    }[variant];

  const sizeClass = {
    small: "btn-sm",
    medium: "btn-md",
  }[size];

  const classes = `btn ${variantClass} ${sizeClass} ${className}`;

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
