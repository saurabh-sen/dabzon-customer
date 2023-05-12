import React from 'react'

export default function Address({ setRight, userId }) {

    const [address, setAddress] = React.useState({
        name: "",
        number: "",
        email: "",
        address: "",
        city: "",
        pincode: "",
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        fetch("/api/user/setUserAddress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, address }),
        }).then((res) => res.json()).then((data) => {
            if (data.status === 200) {
                alert("Address updated successfully");
            }else{
                alert("Something went wrong, please try again");
            }
        });
    }
    
    React.useEffect(() => {
        fetch(`/api/user/getUserAddress?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) setAddress(data.data);
            });
    }, []);

    return (
        <div className="flex flex-col border-2 bg-white rounded-xl px-2 md:p-6 mb-20 sm:mb-0 w-full">
            <button className="block md:hidden" onClick={() => setRight(9)}>
                {/* go back svg */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>
            <div className="Modal_container flex items-center h-full ">
                <form onSubmit={(e) => onSubmit(e)} className="flex flex-col justify-center items-center space-y-4 p-6 mx-auto rounded-md ">
                    <div className="customer__name flex flex-col">
                        <label className="text-gray-900 " htmlFor="name">
                            Your Name
                        </label>
                        <input
                            onChange={(e) =>
                                setAddress((prev) => (prev = { ...prev, name: e.target.value }))
                            }
                            className="border-gray-300 border rounded-md p-2 outline-0 bg-transparent sm:w-[300px] "
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
                            className="border-gray-300 border rounded-md p-2 outline-0 bg-transparent sm:w-[300px] "
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
            className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent sm:w-[300px] "
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
                            className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent sm:w-[300px] "
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
                            className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent sm:w-[300px] "
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
                            className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent sm:w-[300px] "
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Enter your city"
                            required
                            value={address.city}
                        />

                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={(e) => onSubmit(e)}
                            className="flex justify-center items-center text-green-50 bg-dabgreen rounded-full w-24 h-9"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};