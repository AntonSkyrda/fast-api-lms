interface SpinnerMiniProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "white" | "primary" | "secondary" | "success" | "danger";
}

function SpinnerMini({ size = "md", color = "primary" }: SpinnerMiniProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "size-18",
  };

  const colorClasses = {
    white: "text-white",
    primary: "primary",
    secondary: "text-gray-600",
    success: "text-green-500",
    danger: "text-red-500",
  };

  return (
    <div
      className="inline-block animate-spin"
      role="status"
      aria-label="loading"
    >
      <svg
        className={`${sizeClasses[size]} ${colorClasses[color]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export default SpinnerMini;
