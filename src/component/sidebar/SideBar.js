import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackIcon } from "../../utility/icon/icon";
import Logo from "../../utility/Logo";
import Footer from "../Footer";
import logoutIcon from "../../utility/icon/logout.png";
import { setToken } from "../../redux/userReducer";

function SideBar({ content }) {
  const router = useRouter();
  const role = useSelector((state) => state.user.roles);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(setToken({ token: "", roles: "" }));
    if (role === "relawan") {
      router.push("../Login");
    } else if (role === "admin") {
      router.push("Login");
    } else if (role === "koordinator" || role === "ketua_tim") {
      router.push("../Login");
    }
  };
  console.log(role);
  return (
    <>
      <div onClick={() => router.back()} className="flex justify-end cursor-pointer mr-2">
        <BackIcon />
      </div>
      <div className="flex flex-col justify-between px-8 mt-2 h-full border-r-2 ">
        <div>
          <Logo />
        </div>
        <div className="">{content}</div>
        <div onClick={handleLogOut} className="flex border-b-2 gap-2 p-2 justify-start w-full text-[18px] text-[#9CA3AF] font-medium items-center cursor-pointer">
          <img src={logoutIcon.src} alt="logout.png" /> <p>Logout</p>
        </div>
        <div className="pt-[50px] bottom-0 -z-10">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default SideBar;
