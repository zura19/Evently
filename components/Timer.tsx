"use client";
import { useState, useEffect } from "react";

type TimerProps = {
  date: string; // Ensure the date is passed as a string
};

function Timer({ date }: TimerProps) {
  const targetTime = new Date(date).getTime();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Set initial value only on the client side
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  if (!timeLeft) return null; // Prevent mismatch on first render

  return (
    <>
      {timeLeft.days > 0 && ` ${timeLeft.days}d `}
      {timeLeft.hours > 0 && ` ${timeLeft.hours}h `}
      {timeLeft.minutes > 0 && ` ${timeLeft.minutes}m `}
      {timeLeft.seconds > 0 && ` ${timeLeft.seconds}s `}
    </>
  );
}

export default Timer;
