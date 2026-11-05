"use client";
import { Clock } from "lucide-react";
import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  createdAt: string; // ISO timestamp (e.g., "2026-07-03T12:10:00.000Z")
  onTimeChange?: (time: string) => void;
  remaining?: boolean
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  createdAt,
  onTimeChange,
  remaining = false
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [hoursLeft, setHoursLeft] = useState<number>(72);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const createdTime = new Date(createdAt).getTime();
      const seventyTwoHours = 72 * 60 * 60 * 1000;
      const expirationTime = createdTime + seventyTwoHours;
      const now = new Date().getTime();
      const difference = expirationTime - now;

      if (difference <= 0) {
        setIsExpired(true);
        setHoursLeft(0);
        setTimeLeft("0");
        return;
      }

      // Time calculations
      const exactHours = difference / (1000 * 60 * 60);
      const hours = Math.floor(exactHours);
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setHoursLeft(exactHours);

      // Pad with leading zeros
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");

      setTimeLeft(`${formattedHours}h`);
      if (onTimeChange) {
        onTimeChange(formattedHours);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [createdAt]);

  // Dynamic status-based color system
  const getColorClasses = () => {
    // if (isExpired) {
    //   return "text-[#E7000B] ";
    // }
    if (hoursLeft <= 5) {
      // Flashes under 5 hours to draw urgency
      return "text-[#E7000B] animate-pulse";
    }
    if ( hoursLeft > 5 && hoursLeft <= 12 ) {
      // Amber warning system under 10 hours
      return "text-[#E17100] ";
    }
    // Safe zone over 10 hours remaining
    return "text-navgray";
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`text-sm flex items-center gap-1 px-2 py-0.5 font-medium transition-all select-none ${getColorClasses()}`}
      >
        <Clock size={12} />
        {timeLeft} {remaining &&<span>remaining</span>}
      </span>
    </div>
  );
};
