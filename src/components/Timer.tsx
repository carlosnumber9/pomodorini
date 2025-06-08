import React from "react";
import { getMsFromHours } from "../utils";

const RADIUS = 100;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type Props = {
  timeLeft: number;
  totalTime: number;
};

export const Timer: React.FC<Props> = ({ timeLeft, totalTime }) => {
  const percentage = Math.max(0, timeLeft / getMsFromHours(totalTime));
  const dashOffset = CIRCUMFERENCE * (1 - percentage);

  return (
    <div className="timer-container">
      <svg width={300} height={300} className="timer">
        <circle
          cx={150}
          cy={150}
          r={RADIUS}
          fill="none"
          stroke="white"
          strokeWidth={7}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
    </div>
  );
};