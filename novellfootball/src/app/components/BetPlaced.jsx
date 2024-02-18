import React from 'react'
import { IoIosArrowBack } from "react-icons/io";


function BetPlaced() {
  return (
    <div className='absolute bottom-0 left-0 w-[100%] h-[80%] bg-white ' >
        <div className='grid grid-flow-col  place-items-center' >
          <span className='flex place-items-center justify-self-start p-[.5rem]' ><IoIosArrowBack />Back</span>
           <div className='flex place-items-center justify-self-start'>
           <span className="w-[70px] h-[5px]  rounded-2xl  "
            style={{
              background: "#2785f6"
            }}></span>
           </div>
          <span></span>
        </div>
    </div>
  )
}

export default BetPlaced