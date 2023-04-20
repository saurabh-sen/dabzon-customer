import React from "react";
import NavBar from "../../components/NavBar/index";
import FooterComponents from "../../components/FooterComponents/index";
import contactUs from "../../../public/contactUs.png";
import Image from "next/image";

const contact = () => {
  return (
    <div className="contact bg-gray-100 ">
      <NavBar />
      <div className="flex items-center justify-evenly min-h-screen bg-gray-100 flex-wrap py-16 ml-3">
        <div className="flex flex-col items-center justify-center min-w-[300px] space-y-8 ">
          <div className=" "></div>
          <div className="customer__info space-y-2 text-base ">
            <p className="customer__heading font-semibold text-2xl text-gray-900">
              Love to hear from you Get In touch 👋
            </p>
            <div className="customer__name flex flex-col">
              <label className="text-gray-900 mt-8" htmlFor="name">
                Your Name
              </label>
              <input
                className="border-gray-300 border rounded-md p-2 outline-0 bg-transparent w-[300px] "
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
            </div>
            <div className=" customer__email flex flex-col ">
              <label className="text-gray-900 " htmlFor="email">
                Your Email
              </label>
              <input
                className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[300px] "
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email..."
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-900 " htmlFor="message">
                Message
              </label>
              <textarea
                className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[300px]"
                name="message"
                id="message"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="buttons__container flex flex-col items-center w-[295px]">
              <button
                className="bg-dabgreen text-white w-56 rounded-full h-9 mt-5 shadow-2xl"
                type="button">
                Create
              </button>
            </div>
          </div>
        </div>

        <Image
          className="m-2 hidden md:block"
          src={contactUs}
          alt="Image is loading..."
          width={445}
          height={445}
        />
      </div>
      <FooterComponents />
    </div>
  );
};

export default contact;
