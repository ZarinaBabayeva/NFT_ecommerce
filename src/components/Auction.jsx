import React, { useState, useEffect } from "react";

function Auction({ endDate }) {
  const [endTime, setEndTime] = useState(new Date(endDate));
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeRemaining = endTime - new Date();
      setTimeRemaining(timeRemaining);
      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  if (!endTime) {
    return null;
  }
  let seconds = Math.floor((timeRemaining / 1000) % 60);
  let minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  let hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;
  days = days < 10 ? "0" + days : days;

  return (
    <div className="auction_time">
      <p>Auction ends in:</p>
      {timeRemaining > 0 ? (
        <ul className="time j-flex">
          <li>
            {days}
            <span>Days</span>
          </li>
          <li className="symbol">:</li>
          <li>
            {hours}
            <span>Hours</span>
          </li>
          <li className="symbol">:</li>
          <li>
            {minutes}
            <span>Minutes</span>
          </li>
          <li className="symbol">:</li>
          <li>
            {seconds}
            <span>Seconds</span>
          </li>
        </ul>
      ) : (
        <h1>Auction end!</h1>
      )}
    </div>
  );
}

export default Auction;
