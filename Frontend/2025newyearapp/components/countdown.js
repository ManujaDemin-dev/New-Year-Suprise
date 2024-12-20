"use client";

import { useEffect, useState } from "react";
import styles from "./countdown.module.css";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const newYearDate = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0);

    const updateCount = () => {
      const now = new Date();
      const diff = newYearDate - now;

      if (diff <= 0) {
        setTimeLeft("Happy New Year!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
    };

    const interval = setInterval(updateCount, 1000);
    updateCount();

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.heading}>Countdown To New Year 2025</h1> */}
      <div className={styles.timer}>{timeLeft}</div>
    </div>
  );
};

export default Countdown;
