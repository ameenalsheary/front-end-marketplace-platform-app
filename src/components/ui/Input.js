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
  variant = "default",
  size = "medium",
  disabled = false,
  className = "",

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
  const baseClasses =
    "w-full font-medium rounded-md transition-all transform focus:outline-none border";

  const variants = {
    default: disabled
      ? "bg-button-disabled text-text border border-button-disabled cursor-not-allowed"
      : error
      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
      : success
      ? "border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
      : "border-primary focus:border-primary focus:ring-1 focus:ring-primary",
  };

  const sizes = {
    small: "p-1.5 text-sm",
    medium: "p-1.5 text-base",
  };

  const inputClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${
    disabled ? "cursor-not-allowed opacity-60" : ""
  } ${className}`;

  const containerClasses = `flex flex-col gap-1 ${
    props.containerClassName || ""
  }`;

  const renderInput = () => (
    <div
      className={`relative ${startIcon || endIcon ? "flex items-center" : ""}`}
    >
      {startIcon && (
        <div className="absolute left-3 text-text">{startIcon}</div>
      )}
      <input
        type={type}
        className={`
          ${inputClasses}
          ${startIcon ? "pl-10" : ""}
          ${endIcon ? "pr-10" : ""}
          ${disabled ? "cursor-not-allowed" : ""}
        `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        id={id}
        name={name}
        autoComplete={autoComplete}
        {...props}
      />
      {endIcon && <div className="absolute right-3 text-text">{endIcon}</div>}
    </div>
  );

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium ${
            error ? "text-error" : "text-text"
          }`}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      {renderInput()}

      {/* Helper/Error Text */}
      {(helperText || errorText) && (
        <p className={`text-xs ${error ? "text-red-500" : "text-green-500"}`}>
          {error ? errorText : helperText}
        </p>
      )}
    </div>
  );
};

export default Input;

// And here's how you would use it:
<>
  {/* Basic usage */}
  <Input
    placeholder="Enter your name"
    value={"name"}
    onChange={(e) => setName(e.target.value)}
  />

  {/* With label and helper text */}
  <Input
    label="Email"
    type="email"
    placeholder="your@email.com"
    helperText="We'll never share your email"
  />

  {/* With error state */}
  <Input
    label="Password"
    type="password"
    error={true}
    errorText="Password must be at least 8 characters"
  />

  {/* With icons */}
  <Input
    startIcon={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    }
    placeholder="Search..."
  />

  {/* Disabled state */}
  <Input label="Disabled Field" value="Can't edit this" disabled={true} />

  {/* Different sizes */}
  <Input size="small" placeholder="Small input" />
  <Input size="medium" placeholder="Large input" />
</>;
