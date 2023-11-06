import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import listIcon from "../../utility/icon/centerIcon.png";
import logoutIcon from "../../utility/icon/logout.png";
import { UserIcon } from "../../utility/icon/icon";
import Logo from "../../utility/Logo";
import { setToken } from "../../redux/userReducer";
import { useRouter } from "next/router";

const NavbarMobile = ({ popup, setPopup }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [popupUser, setPopupUser] = useState(false);
  const name = useSelector((state) => state.user.name);
  const role = useSelector((state) => state.user.roles);
  const handleLogOut = () => {
    dispatch(setToken({ token: "", roles: "" }));
    router.push("../Login");
    if (role === "relawan") {
      router.push("../Login");
    } else if (role === "admin") {
      router.push("Login");
    } else if (role === "koordinator" || role === "ketua_tim") {
      router.push("../Login");
    }
  };
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {" "}
      <div className="flex items-center justify-between px-[16px] py-[10px] border-b-[1px] sticky top-0 bg-white mt-[30px]">
        <div className="flex gap-3 items-center">
          <img
            onClick={() => {
              setPopup(!popup);
              setPopupUser(false);
            }}
            src={listIcon.src}
            alt="asdsad"
          />
          <Logo mobile={screenSize} />
        </div>
        <div
          onClick={() => {
            setPopupUser(!popupUser);
            setPopup(false);
          }}
        >
          <UserIcon />
        </div>
      </div>
      {popupUser === true && (
        <div className="fixed bg-white w-screen pt-[27px] pl-[24px] shadow-lg pb-[12px]">
          <div className="flex items-center gap-2 border-b mr-[100px] pb-[12px]">
            <UserIcon />
            <div>
              <p className="text-[18px] text-[#374151] font-semibold">{name}</p>
              <p className="text-[12px] text-[#374151] ">{role}</p>
            </div>
          </div>
          <div onClick={handleLogOut} className="flex gap-2 mt-3 items-center">
            <img src={logoutIcon.src} />
            <p className="text-[14px] text-[#9CA3AF] font-medium">Logout</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarMobile;
