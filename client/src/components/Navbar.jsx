import React from 'react';

function Navbar() {
    return (
        <div className='flex items-center justify-center w-[95vw] fixed top-3 bg-bg backdrop-blur-xl h-auto p-4 px-5 lg:px-8 rounded-md lg:border-[1px] border-white'>
            <div className='flex flex-1 items-center justify-start font-bold text-md xl:text-2xl'>
                <a href='http://localhost:3000'>
                        PredictaSafe 
                    </a>
            </div>
            <div className='flex items-center justify-end gap-4 lg:gap-10'>
                <div>
                    <a href='http://127.0.0.1:5001/' className='bg-white text-black font-semibold text-sm lg:text-md lg:font-bold p-2 px-3 lg:px-5 rounded-sm transition duration-150 ease-in-out hover:bg-[#5b5b5b] hover:text-white hover:-translate-y-1'>
                        After Disaster
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
