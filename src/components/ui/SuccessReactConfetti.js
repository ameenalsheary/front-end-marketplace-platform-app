"use client";

import Confetti from "react-confetti";
import { useEffect, useState } from "react";

const SuccessReactConfetti = () => {
  const [dimensions, setDimensions] = useState({
    width: document.documentElement.clientWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: document.documentElement.clientWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Confetti
      width={dimensions.width} // Total width of the confetti area
      height={dimensions.height} // Total height of the confetti area
      numberOfPieces={200} // Number of confetti pieces to render
      recycle={false} // false = play once, do not loop/recycle
      gravity={0.3} // Gravity force pulling pieces downward
    />
  );
};

export default SuccessReactConfetti;
