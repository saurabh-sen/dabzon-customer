import { getCookie } from "../../../cookie/index";
import React, { useState } from "react";


const index = ({ address, setAddress, setShowAddressModal }) => {

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(address)
    if (address.city === '' || address.address === '' || address.name === '' || address.number === '' || address.pincode === '') {
      alert('choose city');
      return;
    }
    let emailId = getCookie("userSession")
    let obj = {
      ...address,
      email: emailId,
    }
    const res = await fetch(`/api/address/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    if (res.status === 200) {
      alert("added address");
      setShowAddressModal(prev => prev = {
        ...prev,
        showModal: false,
      })
    }
    // console.log(data);
  }

  const cancelEdit = (e) => {
    e.preventDefault();
    setShowAddressModal({
      showModal: false,
      address: null
    })
  }

  return (
    <div className="Modal_container flex items-center h-full py-8">
      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col border-2 border-dabgreen justify-center items-center space-y-4 w-[40rem] h-[38rem] p-6 mx-auto bg-gray-100 rounded-md shadow-md">
        <div className="customer__name flex flex-col">
          <label className="text-gray-900 " htmlFor="name">
            Your Name
          </label>
          <input
            onChange={(e) =>
              setAddress((prev) => (prev = { ...prev, name: e.target.value }))
            }
            className="border-gray-300 border rounded-md p-2 outline-0 bg-transparent w-[300px] "
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
            value={address.name}
          />
        </div>
        <div className="customer__number flex flex-col">
          <label className="text-gray-900 " htmlFor="mobile">
            Mobile no.
          </label>
          <input
            onChange={(e) =>
              setAddress((prev) => (prev = { ...prev, number: e.target.value }))
            }
            className="border-gray-300 border rounded-md p-2 outline-0 bg-transparent w-[300px] "
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="Enter your Mobile no."
            required
            value={address.number}
          />
        </div>
        {/* <div className=" customer__email flex flex-col ">
          <label className="text-gray-900 " htmlFor="email">
            Your Email
          </label>
          <input
            onChange={(e) =>
              setAddress((prev) => (prev = { ...prev, email: e.target.value }))
            }
            className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[300px] "
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email..."
            required
            value={address.email}
          />
        </div> */}

        <div className=" customer__pincode flex flex-col ">
          <label className="text-gray-900 " htmlFor="pincode">
            Pin Code
          </label>
          <input
            onChange={(e) =>
              setAddress((prev) => (prev = { ...prev, pincode: e.target.value }))
            }
            className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[300px] "
            type="number"
            id="pincode"
            name="pincode"
            placeholder="Enter your pincode..."
            required
            value={address.pincode}
          />
        </div>

        <div className=" customer__pincode flex flex-col ">
          <label className="text-gray-900 " htmlFor="address">
            Full Address
          </label>
          <input
            onChange={(e) =>
              setAddress((prev) => (prev = { ...prev, address: e.target.value }))
            }
            className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[300px] "
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            required
            value={address.address}
          />
        </div>
        <div className="flex flex-col">

          <label className="text-gray-900 " htmlFor="city">City</label>
          <input
            onChange={(e) =>
              setAddress((prev) => (prev = { ...prev, city: e.target.value }))
            }
            className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[300px] "
            type="text"
            id="city"
            name="city"
            placeholder="Enter your city"
            required
            value={address.city}
          />

        </div>
        <div className="flex justify-between w-72">
          <button
            onClick={(e) => onSubmit(e)}
            className="flex justify-center items-center text-green-50 bg-dabgreen rounded-full w-24 h-9"
            type="submit"
          >
            Save
          </button>
          <button
            onClick={(e) => cancelEdit(e)}
            className="flex justify-center items-center text-green-50 bg-dabgreen rounded-full w-24 h-9">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default index;
