import Image from "next/image";
import React, { useEffect } from "react";
import carousel1 from '../../../../public/caraousel/caraousel1.png'

const Index = () => {
  return (
    <div className="carousel my-4">
      <div className="max-w-7xl mx-auto px-[3vw] flex overflow-x-scroll">
        <div className="slider m-auto overflow-hidden relative rounded-md">
          <div className="slide-track w-[3500px] md:w-[5000px]">
            <div className="slide">
              <Image src={carousel1} className="h-[150px] md:h-[360px] " height={"auto"} width={"auto"} alt="" />
            </div>
            <div className="slide">
              <Image src={carousel1} className="h-[150px] md:h-[360px] " height={"auto"} width={"auto"} alt="" />
            </div>
            <div className="slide">
              <Image src={carousel1} className="h-[150px] md:h-[360px] " height={"auto"} width={"auto"} alt="" />
            </div>
            <div className="slide">
              <Image src={carousel1} className="h-[150px] md:h-[360px] " height={"auto"} width={"auto"} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;