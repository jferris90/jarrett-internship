import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const calculateCountdown = () => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const difference = expiry - now;

    if (difference <= 0) {
      return "Expired";
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return <div>{countdown}</div>;
};

export default Countdown;