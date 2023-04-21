import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react'
import React, { useEffect } from "react";
import Autoplay from 'embla-carousel-autoplay'
import carousel1 from '../../../../public/caraousel/caraousel1.png'

const Index = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  
  return (
    <div className="embla overflow-hidden mt-8" 
    ref={emblaRef}
    >
      <div className="embla__container flex">
        <div className="embla__slide min-w-0 flex-[0_0_100%] flex justify-center">
          <Image
           className=""
                    loading="lazy"
                    src={carousel1}
                    alt="Image is loading..."
                    width={1000}
                    height={1000}/>
        </div>
        <div className="embla__slide min-w-0 flex-[0_0_100%] flex justify-center">
          <Image
           className=""
                    loading="lazy"
                    src={carousel1}
                    alt="Image is loading..."
                    width={1000}
                    height={1000}/>
        </div>
        <div className="embla__slide min-w-0 flex-[0_0_100%] flex justify-center">
          <Image
           className=""
                    loading="lazy"
                    src={carousel1}
                    alt="Image is loading..."
                    width={1000}
                    height={1000}/>
        </div>
      </div>
    </div>
  );
}

export default Index;