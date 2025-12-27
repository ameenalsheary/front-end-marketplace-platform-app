import React from "react";

const Input = ({
  // Basic props
  type = "text",
  placeholder = "",
  value,
  onChange,
  onFocus,
  onBlur,

  // Styling & variants
  size = "medium",
  disabled = false,
  className = "",
  containerClassName = "",

  // Validation & states
  error = false,
  success = false,
  required = false,

  // Labels & helpers
  label,
  helperText,
  errorText,

  // Icons
  startIcon,
  endIcon,

  // HTML attributes
  id,
  name,
  autoComplete = "off",
  ...props
}) => {
  const baseClasses = "input-base";
  const stateClasses = disabled ? "input-disabled" : error ? "input-error" : success ? "input-success" : "input-default";
  const sizes = {
    small: "input-sm",
    medium: "input-md",
  };

  const inputClasses = [
    baseClasses,
    stateClasses,
    sizes[size],
    startIcon && "pl-10",
    endIcon && "pr-10",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex flex-col gap-0.5 ${containerClassName}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium ${error ? "text-error" : "text-text"}`}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <div className="relative flex items-center">
        {startIcon && (
          <div className="absolute left-3 pointer-events-none text-text">
            {startIcon}
          </div>
        )}

        <input
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error}
          className={inputClasses}
          {...props}
        />

        {endIcon && (
          <div className="absolute right-3 pointer-events-none text-text">
            {endIcon}
          </div>
        )}
      </div>

      {/* Helper / Error text */}
      {(helperText || errorText) && (
        <p className={`text-xs ${error ? "text-error" : success ? "text-success" : "text-muted"}`}>
          {error ? errorText : helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
