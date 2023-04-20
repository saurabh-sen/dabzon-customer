import React from "react";
import Image from "next/image";
import profile from "../../../../public/avatar.png";

export default function Hello({ setRight, setProfileData, profileData }) {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData(prev => prev = { ...prev, image: reader.result });
    }
    reader.readAsDataURL(file);
  }

  const [edit, setEdit] = React.useState(false);
  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    // check fields 
    if(profileData.name === '' || profileData.email === '' || profileData.gender === '' || profileData.number === '' || profileData.password === '' || profileData.userId === '')return alert("Please fill all the fields");

    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    // console.log(data);
  }

  return (
    <div className="flex flex-col border-2 bg-white rounded-xl p-6 mb-20 sm:mb-0 w-full relative">
      <button className="block md:hidden" onClick={() => setRight(9)}>
        {/* go back svg */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      {!edit
        ? <button className="rounded-full p-2 absolute top-6 right-6 bg-dabgreen" onClick={(e) => setEdit(prev => !prev)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="" fill="white" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
        </button>
        : <button className="rounded-full p-2 absolute top-6 right-6 bg-dabgreen" onClick={(e) => setEdit(prev => !prev)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="" fill="white" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>}

      <div className="flex items-center">
        <div className="w-24 h-24  mr-4">
          <Image
            className=" w-24 h-24 rounded-full object-cover"
            loading="lazy"
            src={profileData.image ? profileData.image : profile}
            alt="Image is loading..."
            width={1000}
            height={1000}
          />
        </div>
        {edit && <div className="flex flex-col">
          <label htmlFor='profilePhoto'>
            <button className="text-xs text-gray-50 h-9 w-28 my-2 bg-dabgreen rounded-full relative" onClick={() => document.getElementById('profilePhoto').click()}>
              Change Photo
              <input onChange={(e) => handleFileChange(e)} id='profilePhoto' name="file-upload" type="file" className="absolute top-0 left-0 w-28 h-8 invisible z-10" />
            </button>
          </label>
          <button onClick={() => setProfileData(prev => prev = {...prev, image: ''})} className="text-xs text-red-900 h-9 w-28 my-2 bg-red-200 rounded-full">
            Delete Photo
          </button >
        </div>}
      </div>
      <p className="text-[0.55rem] mt-2 mb-4">
        For better result use 160 * 160px pic & we support jpg and png.
      </p>
      <div className=" Your___Name___  flex flex-col my-2">
        <label className="text-gray-900 text-sm" htmlFor="name">
          Your Name
        </label>
        <input
          className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[230px] md:w-[300px] text-sm"
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name..."
          required
          value={profileData.name}
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
        />
      </div>
      <div className=" Mail___ flex flex-col my-2">
        <label className="text-gray-900 text-sm" htmlFor="mail">
          Your Mail
        </label>
        <input
          className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[230px] md:w-[300px] text-sm"
          type="email"
          id="mail"
          name="mail"
          placeholder="Enter your mail..."
          required
          value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
        />
      </div>
      <div className="Gender______  flex flex-col my-2">
        <label className="text-gray-900 text-sm" htmlFor="dropdown">
          Gender
        </label>
        <select
          className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[230px] md:w-[300px] text-sm"
          id="dropdown"
          name="dropdown"
          required
          defaultValue={profileData.gender ? profileData.gender : 'notSelected'}
          onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
        >
          <option disabled value="notSelected">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className=" Mobile___Number flex flex-col my-2">
        <label className="text-gray-900 text-sm" htmlFor="number">
          Mobile Number
        </label>
        <input
          className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[230px] md:w-[300px] text-sm"
          type="tel"
          id="number"
          name="number"
          placeholder="Enter your number..."
          required
          value={profileData.number}
          onChange={(e) => setProfileData({ ...profileData, number: e.target.value })}
        />
      </div>

      <div className=" Password___ flex flex-col my-2">
        <label className="text-gray-900 text-sm" htmlFor="password">
          Password
        </label>
        <input
          className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[230px] md:w-[300px] text-sm"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password..."
          required
          value={profileData.password}
          onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
        />
      </div>

      {edit && <div className="flex justify-center w-[230px] md:w-[300px]">
        <button
          className="bg-dabgreen text-white w-56 rounded-full h-9 mt-4 shadow-2xl"
          type="button"
          onClick={(e) => { setEdit(prev => !prev); handleProfileUpdate(e) }}
        >
          Submit
        </button>
      </div>}
    </div >
  );
};
