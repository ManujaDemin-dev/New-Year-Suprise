"use client";

import { useEffect, useState } from "react";

const Timer = ({ className }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const newYearDate = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0);

    const updateCount = () => {
      const now = new Date();
      const diff = newYearDate - now;

      if (diff <= 0) {
        // set the time left to a new year string
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds })
    };

    const interval = setInterval(updateCount, 1000);
    updateCount();

    return () => clearInterval(interval)
  }, []);

  return (
    <div className={`flex flex-col gap-14 md:flex-row md:gap-24 ${className}`}>
        <TimerCard time={timeLeft.days} segment="Days" />
        <TimerCard time={timeLeft.hours} segment="Hours" />
        <TimerCard time={timeLeft.minutes} segment="Minutes" />
        <TimerCard time={timeLeft.seconds} segment="Seconds" />
    </div>
  )
};

const TimerCard = ({time, segment}) => {
  return (
    <div className="rounded-lg shadow-xl w-[170]">
      <div className="timer-card-body rounded-t-lg flex justify-center items-center">
        <p className="text-8xl font-medium">{time}</p>
      </div>
      <div className="timer-card-footer rounded-b-lg flex justify-center items-center">
        <p className="text-white text-2xl">{segment}</p>
      </div>
    </div>
  );
};

export default Timer;
