import React, { useState } from "react";
import Earthquake from "./Earthquake";
import Flood from "./Flood";
import Cyclone from "./Cyclone";

function LeftBox({ setPredicated, setstate }) {
  const [active, setActive] = useState("earthquake");

  const handleActive = (type) => {
    setActive(type);
  };

  return (
    <div className="w-full lg:w-[95vw] h-full lg:h-auto m-5 lg:mr-5 lg:my-5 lg:ml-0 lg:mt-28 py-5 lg:py-3 px-5 flex flex-col items-center justify-between bg-bg rounded-sm">
      {/* Dynamic content area */}
      <div className="flex flex-wrap bg-screen lg:w-full h-full rounded-sm mb-4">
        {active === "earthquake" && (
          <Earthquake setPredicated={setPredicated} setstate={setstate} />
        )}
        {active === "flood" && (
          <Flood setPredicated={setPredicated} setstate={setstate} />
        )}
        {active === "cyclone" && (
          <Cyclone setPredicated={setPredicated} setstate={setstate} />
        )}
      </div>

      <div className="flex items-center justify-around w-full gap-1 gap-y-3 xl:gap-3 flex-wrap">
        <button
          className={`border border-black text-sm p-3 px-12 flex items-center justify-center font-semibold rounded-full transition duration-150 ease-in-out 
            ${
              active === "earthquake"
                ? "bg-red-500 text-white"
                : "bg-white text-black hover:bg-red-400 hover:text-white"
            }`}
          onClick={() => handleActive("earthquake")}
        >
          Earthquake
        </button>

        <button
          className={`border border-black text-sm p-3 px-12 flex items-center justify-center font-semibold rounded-full transition duration-150 ease-in-out 
            ${
              active === "flood"
                ? "bg-blue-500 text-white"
                : "bg-white text-black hover:bg-blue-400 hover:text-white"
            }`}
          onClick={() => handleActive("flood")}
        >
          Flood
        </button>

        <button
          className={`border border-black text-sm p-3 px-12 flex items-center justify-center font-semibold rounded-full transition duration-150 ease-in-out 
            ${
              active === "cyclone"
                ? "bg-emerald-500 text-white"
                : "bg-white text-black hover:bg-emerald-400 hover:text-white"
            }`}
          onClick={() => handleActive("cyclone")}
        >
          Cyclone
        </button>
      </div>
    </div>
  );
}

export default LeftBox;
