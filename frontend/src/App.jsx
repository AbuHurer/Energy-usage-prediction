import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [state, setState] = useState("");
  const [region, setRegion] = useState("");
  const [days, setDays] = useState(30);
  const [predictions, setPredictions] = useState([]);

  const handlePredict = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", {
        state: state,
        region: region,
        days: parseInt(days),
      });

      if (res.data && res.data.predictions) {
        setPredictions(res.data.predictions);
      } else {
        setPredictions([]);
        alert("⚠️ No predictions returned from backend");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error fetching predictions");
    }
  };

  const chartData = {
    labels: predictions?.map((p) => p.date) || [],
    datasets: [
      {
        label: "⚡ Predicted Energy Usage",
        data: predictions?.map((p) => p.predicted_usage) || [],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center p-6">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide">
          ⚡ Energy Usage Predictor
        </h1>
        <p className="text-gray-400 mt-2">
          Enter details below to forecast future energy consumption
        </p>
      </header>

      {/* Input Card */}
      <div className="bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-xl mb-10 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">
          🔍 Prediction Settings
        </h2>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Enter State (e.g., Punjab)"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Enter Region (e.g., NR)"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Days to Predict"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handlePredict}
            className="bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-lg font-semibold"
          >
            🚀 Predict
          </button>
        </div>
      </div>

      {/* Chart Section */}
      {predictions.length > 0 && (
        <div className="bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-3xl border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-green-400">
            📊 Prediction Results
          </h2>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
}

export default App;
