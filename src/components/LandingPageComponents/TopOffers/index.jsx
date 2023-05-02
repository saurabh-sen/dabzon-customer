import React from "react";
import Image from "next/image";
import Link from "next/link";
const Index = () => {
  const [topoffers, setTopOffers] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/landingpage/topoffers")
      .then((res) => res.json())
      .then((res) => setTopOffers(res.allData));
    // .then((res)=> console.log(res))
  }, []);

  // console.log(topoffers[0].link1);
  // console.log(topoffers);
  return (
    <div className="my-8 ">
      <div className="topoffers__container max-w-7xl mx-auto px-[3vw]">
        <p className=" text-left text-gray-900 text-xl sm:text-2xl font-bold">
          Top Offers
        </p>

        <div className="flex flex-wrap my-8 justify-center gap-y-4">
          <Link href={topoffers[0]?.link1 ? topoffers[0].link1 : ""}>
            <Image
              className="mx-2 w-64 md:w-[340px] md:h-[180px]"
              loading="lazy"
              src={
                topoffers[0]?.image1
                  ? topoffers[0]?.image1
                  : "https://dummyimage.com/360x180/ffffff/000000.jpg&text=Loading..."
              }
              width={1000}
              height={1000}
              alt="Image is loading..."
            />
          </Link>

          <Link href={topoffers[0]?.link2 ? topoffers[0]?.link2 : ""}>
            <Image
              className="mx-2 w-64 md:w-[340px] md:h-[180px]"
              loading="lazy"
              src={
                topoffers[0]?.image2
                  ? topoffers[0]?.image2
                  : "https://dummyimage.com/360x180/ffffff/000000.jpg&text=Loading..."
              }
              width={1000}
              height={1000}
              alt="Image is loading..."
            />
          </Link>
          <Link href={topoffers[0]?.link3 ? topoffers[0]?.link3 : ""}>
            <Image
              className="mx-2 w-64 md:w-[340px] md:h-[180px]"
              loading="lazy"
              src={
                topoffers[0]?.image3
                  ? topoffers[0]?.image3
                  : "https://dummyimage.com/360x180/ffffff/000000.jpg&text=Loading..."
              }
              width={1000}
              height={1000}
              alt="Image is loading..."
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
