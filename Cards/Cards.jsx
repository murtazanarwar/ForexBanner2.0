import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import "./Cards.css";

function Cards() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Asynchronous data fetching
    const fetchData = async () => {
      try {
        // Determine the API base URL based on the protocol
        const isSecure = window.location.protocol === "https:";
        const apiBaseUrl = isSecure
          ? "https://api.currencylayer.com"
          : "http://api.currencylayer.com";
        const API_URL = `${apiBaseUrl}/live?access_key=d8eeb01f8cbb0ff3dc0412ae743e395a&format=1`;

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (data && data.quotes) {
          setExchangeRates(data.quotes);
        } else {
          // throw an error if data is missing or invalid
          throw new Error("Data is invalid or missing");
        }

        setLoading(false);
      } catch (error) {
        // Handle errors in data fetching
        console.error("Error fetching exchange rates:", error);
        setLoading(false);
      }
    };

    // Initiate data fetching on component mount
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "white" }}>Exchange Rates From USD</h1>
      </div>
      <div className="cards">
        {loading ? (
          // Display a loading message when data is being fetched
          <p style={{ color: "white" }}>loading...</p>
        ) : (
          Object.entries(exchangeRates).map(
            (
              [currencyPair, rate] //iterate over fetch array
            ) => (
              <Card
                targetValue={rate}
                key={currencyPair}
                currencyPair={currencyPair} //renders Card component when fetching done
              />
            )
          )
        )}
      </div>
    </>
  );
}

export default Cards;
