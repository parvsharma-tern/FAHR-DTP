import React, { useEffect, useState } from 'react';

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  score, 
  size = 80, 
  strokeWidth = 8, 
  color = "text-blue-600" 
}) => {
  const [progress, setProgress] = useState(0);
  
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background Circle */}
        <circle
          className="text-[#EFEBE9]" 
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        {/* Progress Circle */}
        <circle
          className={`${color} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
      </svg>
      <span className={`absolute text-2xl font-bold ${color}`}>
        {progress}
      </span>
    </div>
  );
};

export default CircularProgress;