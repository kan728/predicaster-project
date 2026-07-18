import React from 'react';

function MiddleBox({ predicated, state }) {
  return (
    <div className='w-full lg:w-full rounded-sm h-auto lg:h-[70%] m-5 lg:mt-28 p-5 flex items-center justify-center bg-bg'>
      {predicated ? (
        state === 1 ? (
          <>
            <div className='w-full h-full bg-screen rounded-sm p-4 tracking-wide font-medium text-sm overflow-auto font-serif'>
              <h1 className='text-3xl'>Earthquake Prediction</h1>
              <p>The provided location has experienced an earthquake with a magnitude of <span className=' text-blue-400'>{predicated.toFixed(4)}</span>.</p>
              <p>This information is based on the latest seismic data and predictions from reliable sources. Understanding the potential magnitude of an earthquake can help in assessing the potential impact and necessary precautions.</p>
              <br />
              <h1 className='text-3xl'>Precautionary Measures</h1>
              <p>In the event of an earthquake, it is important to take the following precautions to ensure your safety:</p>
              <ul className='list-disc list-inside'>
                <li>Secure heavy furniture and appliances to walls to prevent them from toppling.</li>
                <li>Identify safe spots in each room, such as under sturdy furniture or against interior walls.</li>
                <li>Have an emergency kit ready, including water, non-perishable food, flashlights, and a first-aid kit.</li>
                <li>Ensure that you and your family know the evacuation routes and safe spots both inside and outside your home.</li>
                <li>Stay informed about earthquake updates and warnings from local authorities and seismic monitoring agencies.</li>
              </ul>
              <p>By being prepared and informed, you can reduce the risk and impact of earthquakes on your life and property.</p>
            </div>
          </>
        ) : state === 2 ? (
          <>
            <div className='w-full h-full bg-screen rounded-sm p-4 tracking-wide font-medium text-sm overflow-auto font-serif'>
              <h1 className='text-3xl'>Flood Prediction</h1>
              <p>The model predicts a flood risk of{" "}<span className="text-blue-500 text-lg">{(predicated * 100).toFixed(4)}%</span>.</p>
              <p>This information is based on the latest flood data and predictions from reliable sources. Understanding the potential depth of a flood can help in assessing the potential impact and necessary precautions.</p>
              <br />
              <h1 className='text-3xl'>Precautionary Measures</h1>
              <p>In the event of a flood, it is important to take the following precautions to ensure your safety:</p>
              <ul className='list-disc list-inside'>
                <li>Move to higher ground immediately and avoid walking or driving through floodwaters.</li>
                <li>Disconnect electrical appliances and turn off utilities to prevent electrical hazards.</li>
                <li>Prepare an emergency kit with essentials like water, non-perishable food, flashlights, and a first-aid kit.</li>
                <li>Stay informed with updates from local authorities and weather services.</li>
                <li>Have a plan for evacuation and ensure all family members know it.</li>
              </ul>
              <p>Being aware and prepared can significantly mitigate the impact of floods on your life and property.</p>
            </div>
          </>
        ): (
          <>
            <div className='w-full h-full bg-screen rounded-sm p-4 tracking-wide font-medium text-sm overflow-auto font-serif'>
              <h1 className='text-3xl'>Hurricane Prediction</h1>
             <p>The provided location has experienced a hurricane with a predicted wind speed of{" "}<span className="text-red-500">{predicated.toFixed(4)} knots</span>.</p>
              <p>This information is based on the latest hurricane data and predictions from reliable sources. Understanding the potential severity of a hurricane can help in assessing the potential impact and necessary precautions.</p>
              <br />
              <h1 className='text-3xl'>Precautionary Measures</h1>
              <p>In the event of a hurricane, it is important to take the following precautions to ensure your safety:</p>
              <ul className='list-disc list-inside'>
                <li>Secure your home by installing storm shutters or boarding up windows and doors.</li>
                <li>Stock up on emergency supplies including water, food, medications, and a first-aid kit.</li>
                <li>Follow evacuation orders from local authorities and have a clear evacuation plan.</li>
                <li>Keep informed with updates from weather services and local news.</li>
                <li>Ensure you have a battery-powered radio and spare batteries for emergency communication.</li>
              </ul>
              <p>Preparation and awareness are key to minimizing the impact of hurricanes on your safety and property.</p>
            </div>
          </>
        )
      ) : (
        <div className='w-full h-full bg-screen rounded-sm font-serif p-4 tracking-wide font-medium text-sm overflow-auto'>
          <h1 className=' text-3xl'>PredictaSafe</h1>
          <p className=' text-lg'>Our model uses advanced machine learning and real-time data to predict natural disasters like earthquakes, floods, and hurricanes based on geographic coordinates.</p>
          <br/>
          <h1 className=' text-3xl'>Key Features:</h1>
          <ul className=' list-disc list-inside text-lg'>
            <li>Real-time Predictions: Get instant predictions for earthquake magnitude, flood depth, and hurricane wind speed.</li>
            <li>Accurate Data: Utilizes data from reliable sources for precise forecasts.</li>
            <li>User-Friendly: Easy-to-understand predictions with practical precautionary measures.</li>
            <li>Stay informed and prepared with our accurate and timely disaster predictions.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MiddleBox;
