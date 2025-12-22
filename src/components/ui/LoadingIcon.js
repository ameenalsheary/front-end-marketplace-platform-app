import LoadingIcon from "./loadingIcon/LoadingIcon";

const LoadingOverlay = ({ show }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-10 bg-background/50 cursor-wait flex items-center justify-center">
      <LoadingIcon />
    </div>
  );
};

export default LoadingOverlay;
