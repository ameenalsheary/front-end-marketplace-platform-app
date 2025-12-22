const FormErrorMessage = ({ text = "", type = "success", className = "" }) => {
  if (!text) return null;

  const color = type === "fail" ? "text-red-500" : "text-green-500";

  return (
    <p className={`${color} text-sm text-center ${className}`}>
      {text}
    </p>
  );
};

export default FormErrorMessage;
