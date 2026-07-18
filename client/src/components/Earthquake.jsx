import React, { useState } from "react";
import axios from "axios";

function Earthquake({ setPredicated, setstate }) {
  const [earthquakeData, setEarthquakeData] = useState({
    latitude: "",
    longitude: "",
    depth: "",
    magnitude: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEarthquakeData({ ...earthquakeData, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formattedData = {};
    for (const [key, val] of Object.entries(earthquakeData)) {
      formattedData[key] = parseFloat(val);
    }

    try {
      console.log("📤 Sending Earthquake data:", formattedData);
      const res = await axios.post("http://localhost:5001/earth", formattedData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("📥 Response received:", res.data);

      // Match your backend key
      const prediction =
        res.data.predicted_earthquake_intensity ||
        res.data.predicted_magnitude ||
        res.data.prediction ||
        res.data.result;

      console.log("✅ Predicted earthquake intensity:", prediction);

      if (prediction !== undefined && prediction !== null) {
        setPredicated(prediction);
        setstate(1); // to update middle box
      } else {
        alert("Prediction key not found in backend response!");
      }
    } catch (error) {
      console.error("❌ Error fetching earthquake prediction:", error);
      alert("Error connecting to backend. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl">
        {Object.keys(earthquakeData).map((key) => (
          <input
            key={key}
            name={key}
            type="number"
            placeholder={`Enter ${key.replaceAll("_", " ")}`}
            onChange={handleChange}
            className="bg-white border border-gray-400 p-2 rounded-md text-black"
          />
        ))}
      </div>

      <button
        onClick={handleClick}
        className="bg-white mt-6 text-black p-3 px-8 font-semibold rounded-md transition duration-150 ease-in-out hover:bg-gray-600 hover:text-white"
      >
        Show Data
      </button>
    </div>
  );
}

export default Earthquake;
