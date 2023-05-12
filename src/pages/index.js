import Head from "next/head";
import ShopByCategory from "../components/LandingPageComponents/ShopByCategory/index";
import TopOffers from "../components/LandingPageComponents/TopOffers/index";
import OtherSupport from "../components/LandingPageComponents/OtherSupports/index";
import ShopByBrand from "../components/LandingPageComponents/ShopByBrand/index";
import FooterComponents from "../components/FooterComponents/index";
import NavBar from "../components/NavBar/index";
import OfferCarousel from "../components/LandingPageComponents/OfferCarousel/index";
import TopSellingBatteries from "../components/LandingPageComponents/TopSellingBatteries/index";
import FAQ from "../components/LandingPageComponents/FAQ/index";
import BestFeedback from "../components/LandingPageComponents/BestFeedback/index";
import BlogComponents from "../components/BlogComponents/index";
import Location from "../components/LandingPageComponents/Location/index";
import { useState, useEffect, useRef } from "react";
import { createClient } from "next-sanity";
// import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

export default function Home({ shopbycategoryData, blogData }) {
  const [city, setCity] = useState("");

  // const incrementVisit = async () => {
  //   const res = await fetch("/api/landingpage/incrementVisit");
  //   const resJSON = await res.json();
  //   // console.log(resJSON);
  // };

  // //get location
  // useEffect(() => {
  //   const options = {
  //     enableHighAccuracy: true,
  //   };
  //   if ("geolocation" in navigator) {
  //     // if location allowed
  //     // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
  //     navigator.geolocation.getCurrentPosition(async ({ coords }) => {
  //       const { latitude, longitude } = coords;
  //       // this api gives location details from latitude and longitude
  //       // console.log(coords);
  //       const res = await fetch(
  //         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  //       );
  //       const data = await res.json();
  //       // console.log(data.city);
  //       setCity(data.city);
  //     });
  //   } else {
  //     // if location not allowed
  //     setCity("none");
  //   }

  //   // save the number of visitor on home page using local storage into mongodb database
  //   if (localStorage.getItem("homePageVisit") === null) {
  //     localStorage.setItem("homePageVisit", 1);
  //     incrementVisit();
  //   }
  // }, []);

  
  // const tawkMessengerRef = useRef();
  // const handleMinimize = () => {
  //   tawkMessengerRef.current.minimize();
  // };
  return (
    <>
      <Head>
        <title>Dabzon - India</title>
        <meta
          name="description"
          content="An ecommerce store - Batteries and inverters"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main__page bg-gray-100 ">
        {/* <button onClick={handleMinimize}> Minimize the Chat </button> */}

        {/* <TawkMessengerReact
          propertyId={process.env.NEXT_PUBLIC_PROPERTYID}
          widgetId={process.env.NEXT_PUBLIC_WIDGETID}
          ref={tawkMessengerRef}
        /> */}
        <NavBar />
        {/* <Location /> */}
        <OfferCarousel />
        <OtherSupport />
        <ShopByCategory data={shopbycategoryData} />
        <TopOffers />
        <ShopByBrand />
        <TopSellingBatteries title="Top Selling Batteries" />
        <BestFeedback />
        <BlogComponents source="home" blogHeading="Blogs" data={blogData} />
        <FAQ />
        <FooterComponents />
      </main>
    </>
  );
}

const client = createClient({
  projectId: "icb5plbz",
  dataset: "production",
  apiVersion: "2021-10-14",
  useCdn: false,
});

export async function getServerSideProps(context) {
  // this api is on dabzon-admin
  //if any confusion just "!! console.log(resJSON) !!"
  const value = await Promise.all([
    fetch(
      `https://dabzon-customer.vercel.app/api/landingpage/shopbycategory`
    ).then((res) => res.json()),
  ]);

  const query = `*[_type == "blog"][0..1]`;
  const blog = await client.fetch(query);

  return {
    props: {
      shopbycategoryData: value[0].allData,
      blogData: blog,
    },
  };
}

// this code will check whether connection between frontend, backend, database is working fine
// to use this just paste these three lines in getServer function
// if output is  " Connected to Database " then everything is working fine

// await fetch("http://localhost:3000/api/checkconnection")
// .then((res)=>res.json())
// .then((data)=>console.log(data.msg));
