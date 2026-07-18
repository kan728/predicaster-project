import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import LeftBox from '../components/LeftBox'
import MiddleBox from '../components/MiddleBox'
import Chatbot from '../components/Chatbot'

function Home() {
  const [predicated, setPredicated] = useState("")
  const [state, setstate] = useState(0);
  return (
    <div className="bg-url bg-no-repeat bg-cover bg-center select-none w-screen h-auto overflow-auto lg:h-full flex flex-col items-center justify-center text-white m-0 p-0 box-border">
      <div className='w-screen h-full flex justify-center'>
        <Navbar />
      </div >
      <div className="min-h-screen lg:h-screen w-[95vw] items-center justify-around flex flex-col lg:flex-row mt-20 lg:mt-8">
        <LeftBox setPredicated={setPredicated} setstate={setstate} />
        <MiddleBox predicated={predicated} state={state} />
        <Chatbot />
      </div>
    </div>
  )
}

export default Home