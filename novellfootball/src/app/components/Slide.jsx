"use client"
// pages/index.js
import React from 'react';
import Carousel from '../components/Carousel';
import Image from 'next/image';

const Slide = () => {
  return (
    <div>
      <Carousel>
        {/* Add your carousel cells */}
        <div className="carousel-cell  w-full h-[28vh] rounded-xl ">
          <Image src="/item.png" alt="Slide 1"  height={100} width={100} className='w-full h-full rounded-xl ' />
        </div>
        <div className="carousel-cell  w-full h-[28vh] rounded-xl">
          <Image src="/item2.png" alt="Slide 1" height={100} width={100} className='w-full h-full rounded-xl '  />
        </div>
        <div className="carousel-cell  w-full h-[28vh] rounded-xl">
          <Image src="/item3.png" alt="Slide 1" height={100} width={100} className='w-full h-full rounded-xl '  />
        </div>        <div className="carousel-cell  w-full h-[28vh] rounded-xl ">
          <Image src="/item4.jpg" alt="Slide 1" height={100} width={100} className='w-full h-full rounded-xl '  />
        </div>
      </Carousel>
    </div>
  );
};

export default Slide;
