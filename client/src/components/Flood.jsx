import React, { useState } from "react";
import axios from "axios";

function Flood({ setPredicated, setstate }) {
  const [floodData, setFloodData] = useState({
    MonsoonIntensity: "",
    TopographyDrainage: "",
    RiverManagement: "",
    Deforestation: "",
    Urbanization: "",
    ClimateChange: "",
    DamsQuality: "",
    Siltation: "",
    AgriculturalPractices: "",
    Encroachments: "",
    IneffectiveDisasterPreparedness: "",
    DrainageSystems: "",
    CoastalVulnerability: "",
    Landslides: "",
    Watersheds: "",
    DeterioratingInfrastructure: "",
    PopulationScore: "",
    WetlandLoss: "",
    InadequatePlanning: "",
    PoliticalFactors: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFloodData({ ...floodData, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formattedData = {};
    for (const [key, val] of Object.entries(floodData)) {
      formattedData[key] = parseFloat(val) || 0;
    }

    try {
      console.log("📤 Sending Flood data:", formattedData);

      const res = await axios.post("http://localhost:5001/flood", formattedData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("📥 Full raw response:", res);
      console.log("📥 Response data:", res.data);

      // Check for both top-level and nested keys
      const prediction =
        res.data.predicted_flood_probability ??
        res.data.predicted_flood_risk ??
        res.data.predicted_value ??
        res.data.prediction ??
        res.data.result ??
        (res.data.data && res.data.data.predicted_flood_probability);

      console.log("✅ Final prediction value:", prediction);

      if (prediction !== undefined && prediction !== null) {
        setPredicated(prediction);
        setstate(2);
      } else {
        alert(
          "⚠️ Prediction not found. Check console log for backend response structure."
        );
      }
    } catch (error) {
      console.error("❌ Axios/Backend Error:", error);
      alert("❌ Error connecting to backend. Check if Flask server is running.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-6xl">
        {Object.keys(floodData).map((key) => (
          <input
            key={key}
            name={key}
            type="number"
            placeholder={`Enter ${key.replaceAll(/([A-Z])/g, " $1")}`}
            onChange={handleChange}
            className="bg-white border border-gray-400 p-2 rounded-md text-black text-sm"
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

export default Flood;
