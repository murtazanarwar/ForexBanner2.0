import React, { useState, useEffect } from "react";
import "./Card.css";

function NumberCounter({ targetValue, decimals }) {
  const [count, setCount] = useState(0);
  const increment = (targetValue / 100).toFixed(decimals);

  useEffect(() => {
    const interval = setInterval(() => {
      if (parseFloat(count) < targetValue) {
        setCount((prevCount) => {
          const nextCount = (
            parseFloat(prevCount) + parseFloat(increment)
          ).toFixed(decimals);
          return parseFloat(nextCount) > targetValue
            ? targetValue.toFixed(decimals)
            : nextCount;
        });
      } else {
        clearInterval(interval);
      }
    }, 100); // Increase the interval duration to 100 milliseconds
    return () => clearInterval(interval);
  }, [count, targetValue, decimals]);

  return <div>{count}</div>;
}

const Card = ({ targetValue, currencyPair }) => {
  const decimals = 6;

  return (
    <div className="card">
      <h1 className="currencyPair">{currencyPair.replace("USD", "")}</h1>
      <div className="count-container">
        <NumberCounter targetValue={targetValue} decimals={decimals} />
      </div>
    </div>
  );
};

export default Card;
