import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(1200); // 20 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (time === 0 && isActive) {
      setIsActive(false);
      handleTimerEnd();
    }
    return () => clearInterval(timer);
  }, [isActive, time]);

  const handleTimerEnd = () => {
    alert("Time's up!");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      <h1>Timer</h1>
      <p>{formatTime(time)}</p>
      <button onClick={() => setIsActive(true)}>Start</button>
    </div>
  );
}
