import React, { useState } from "react";
import axios from "axios";

function Cyclone({ setPredicated, setstate }) {
  const [hurriData, setHurriData] = useState({
    Latitude: "",
    Longitude: "",
    MinimumPressure: "",
    LowWindNE: "",
    LowWindSE: "",
    LowWindSW: "",
    LowWindNW: "",
    ModerateWindNE: "",
    ModerateWindSE: "",
    ModerateWindSW: "",
    ModerateWindNW: "",
    HighWindNE: "",
    HighWindSE: "",
    HighWindSW: "",
    HighWindNW: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHurriData({ ...hurriData, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formattedData = {};
    for (const [key, val] of Object.entries(hurriData))
      formattedData[key] = parseFloat(val);

    try {
      console.log("📤 Sending hurricane data:", formattedData);
      const res = await axios.post("http://localhost:5001/hurri", formattedData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("📥 Received:", res.data);
      const { predicted_maximum_wind_speed } = res.data;
      setPredicated(predicted_maximum_wind_speed);
      setstate(3);
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error connecting to backend. Please check your Flask server.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-5xl">
        {Object.keys(hurriData).map((key) => (
          <input
            key={key}
            name={key}
            type="number"
            placeholder={`Enter ${key}`}
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

export default Cyclone;
