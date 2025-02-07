"use client";
import { useState, useEffect } from "react";

function Timer({ date }: { date: Date }) {
  const targetDate = new Date(date).getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {timeLeft.days > 0 ? ` ${timeLeft.days}d` : null}
      {timeLeft.hours > 0 ? ` ${timeLeft.hours}h` : null}
      {timeLeft.minutes > 0 ? ` ${timeLeft.minutes}m` : null}
      {timeLeft.seconds > 0 ? ` ${timeLeft.seconds}s` : null}
    </>
  );
}

export default Timer;
