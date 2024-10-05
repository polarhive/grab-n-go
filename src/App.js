import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1iJ5AMyZGH4vhL9bqr_SBzFY7Y4LmAi4Aa03yJP_yLco/gviz/tq?tqx=out:csv';

    axios
      .get(sheetUrl)
      .then((response) => {
        const rows = response.data.split("\n");
        const parsedData = rows.map((row) => row.split(","));
        setSheetData(parsedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>There was an error fetching the data: {error.message}</p>;
  }

  return (
    <div className="App">
      <h1>Google Sheet Data</h1>
      <table>
        <thead>
          <tr>
            {sheetData[0]?.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sheetData.slice(1).map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
