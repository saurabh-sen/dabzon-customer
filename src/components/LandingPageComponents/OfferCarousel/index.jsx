import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import carousel1 from "../../../../public/caraousel/caraousel1.png";

const Index = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [carousel, setCarousel] = useState([]);
  useEffect(() => {
    fetch("/api/landingpage/carousel")
      .then((res) => res.json())
      .then((res) => setCarousel(res.allData));
    // .then((res)=> console.log(res))
  }, []);
  console.log(carousel._id);

  return (
    <div className="embla overflow-hidden mt-8" ref={emblaRef}>
      <div className="embla__container flex">
        <div className="embla__slide min-w-0 flex-[0_0_100%] flex justify-center">
          
          <Link href={carousel?.link1? carousel.link1:""}>

          <Image
            className="w-[85vw] h-80"
            loading="lazy"
            src={
              carousel?.image1
                ? carousel.image1
                : ""
            }
            alt="Image is loading..."
            width={1000}
            height={1000}
            />
            </Link>
        
        </div>
        <div className="embla__slide min-w-0 flex-[0_0_100%] flex justify-center">
        <Link href={carousel?.link2? carousel.link2:""}>

          <Image
            className="w-[85vw] h-80"
            loading="lazy"
            src={
              carousel?.image2
                ? carousel.image2
                : ""
            }
            alt="Image is loading..."
            width={1000}
            height={1000}
          />
        </Link>
        </div>
        <div className="embla__slide min-w-0 flex-[0_0_100%] flex justify-center">
        <Link href={carousel?.link3? carousel.link3:""}>

          <Image
            className="w-[85vw] h-80"
            loading="lazy"
            src={
              carousel?.image3
              ? carousel.image3
              : ""
            }
            alt="Image is loading..."
            width={1000}
            height={1000}
          />
          </Link>
        </div>
        <div className="embla__slide min-w-0 flex-[0_0_100%] flex justify-center">
        <Link href={carousel?.link4? carousel.link4:""}>

          <Image
            className="w-[85vw] h-80"
            loading="lazy"
            src={
              carousel?.image4
              ? carousel.image4
              : ""
            }
            alt="Image is loading..."
            width={1000}
            height={1000}
          />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
