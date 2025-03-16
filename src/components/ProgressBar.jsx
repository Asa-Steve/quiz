const ProgressBar = ({
  percentage = 0,
  text = null,
  height = 120,
  width = 120,
  rad = 25,
  size = 16,
  color = "#1098ad",
}) => {
  const radius = rad;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={width} height={height} viewBox="0 0 120 120">
      {/* Background Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)" // Rotate to start from top
      />
      {/* Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize={`${size}px`}
        fill="#fff"
      >
        {text === null && percentage}
        {text && text}
      </text>
    </svg>
  );
};

export default ProgressBar;
