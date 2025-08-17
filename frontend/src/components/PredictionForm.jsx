import React, { useState } from "react";
import axios from "axios";

export default function PredictionForm() {
  const [date, setDate] = useState("");
  const [state, setState] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", {
        date,
        state
      });
      setPrediction(res.data.predicted_usage);
    } catch (err) {
      console.error(err);
      alert("Error fetching prediction");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <label>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          State:{" "}
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>

      {prediction !== null && (
        <h3>🔮 Predicted Usage: {prediction.toFixed(2)}</h3>
      )}
    </div>
  );
}
