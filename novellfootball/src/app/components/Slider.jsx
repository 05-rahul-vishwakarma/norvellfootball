import { Carousel } from "flowbite-react";
import Image from "next/image";
function Slider() {
  return (
    <div className="h-[100%]  sm:h-64 xl:h-80 2xl:h-96  rounded-lg mr-auto ml-auto  ">
      <Carousel leftControl=" " rightControl=" ">
        {/* <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." /> */}
        {/* <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." /> */}
        <Image
          src={"/item.png"}
          alt="..."
          width={100}
          height={100}
          unoptimized
          className="px-1"
        />
        <Image
          src={"/item2.png"}
          alt="..."
          width={100}
          height={100}
          unoptimized
          className="px-1"
        />
        <Image
          src={"/item3.png"}
          alt="..."
          width={100}
          height={100}
          unoptimized
          className="px-1"
        />
        <Image
          src={"/item4.png"}
          alt="..."
          width={100}
          height={100}
          unoptimized
          className="px-1"
        />
      </Carousel>
    </div>
  );
}

export default Slider;
