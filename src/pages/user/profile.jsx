import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/index";
import FooterComponents from "../../components/FooterComponents";
import AccountNav from "../../components/Account/AccountNav/AccountNav";
import Hello from "../../components/Account/Hello/Hello";
import MyOrder from "../../components/Account/MyOrder/MyOrder";
import Address from "../../components/Account/Address/Address";
import WishList from "../../components/Account/WishList/WishList";
import { getCookie } from "../../cookie/index";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const [right, setRight] = useState(1);
  const [profileData, setProfileData] = React.useState({
    userId: "",
    image: "",
    name: "",
    email: "",
    gender: "",
    number: "",
    password: "",
  });

  useEffect(() => {
    if(getCookie("userSession")===''){
      router.replace("/auth/login?redirect=profile")
    }
    if(window.innerWidth <= 768){
      setRight(9);
    }
    setProfileData(prev => prev = {...prev, userId: getCookie("userSession")})
  }, []);

  return (
    <div className="profile">
      <NavBar />
      <div className="profile__container max-w-7xl mx-auto  my-3 flex justify-center">
        <div className="profile__left md:block hidden">
          <AccountNav setRight={setRight} right={right} profileData={profileData} />
        </div>

        {(() => {
          switch (right) {
            case 1:
              return (
                <div className="profile__right w-[18rem] sm:w-[30rem] md:w-[39rem]">
                  <Hello setRight={setRight} setProfileData={setProfileData} profileData={profileData}/>
                </div>
              );
            case 2:
              return (
                <div className="profile__right w-[30rem] md:w-[39rem]">
                  <MyOrder setRight={setRight}/>
                </div>
              );
            case 3:
              return (
                <div className="profile__right w-[30rem] md:w-[39rem]">
                  <Address setRight={setRight} />
                </div>
              );
            case 4:
              return (
                <div className="profile__right w-[30rem] md:w-[39rem]">
                  <WishList setRight={setRight} />
                </div>
              );
            default:
              return (
                <div className="profile__left mb-20">
                  <AccountNav setRight={setRight} />
                </div>
              );
          }
        })()}
      </div>
      <div className="footer hidden sm:block">
        <FooterComponents />
      </div>
    </div>
  );
};

export default Profile;
