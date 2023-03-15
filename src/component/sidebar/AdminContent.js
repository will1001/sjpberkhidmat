import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserIcon } from "../../utility/icon/icon";
import { logoSidebar } from "../../utility/icon/LogoSidebar";
import Dashboard from "../admin/Dashboard";
import SelectPeriode from "../SelectPeriode";
import logoutIcon from "../../utility/icon/logout.png";
import { setToken } from "../../redux/userReducer";

function AdminContent({ setPopupPeriode }) {
  const [select, setSelect] = useState("Dashboard");
  const router = useRouter();
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.user.roles);
  const [akun, setAkun] = useState(roles);

  useEffect(() => {
    if (roles === "relawan") {
      setSelect("Real Count");
    }
  }, []);

  const handleLogOut = () => {
    dispatch(setToken({ token: "", roles: "" }));
    router.push("Login");
  };

  const username = useSelector((state) => state.user.name);

  return (
    <>
      <div className="mt-2">
        <div className="flex items-center mb-4">
          <UserIcon />
          <div className="flex flex-col pl-2 ">
            <p className="font-semibold text-slate-700">{username}</p>
            <p className="text-xs text-slate-700 font-thin">Akun {roles} </p>
          </div>
        </div>
        <div className="">
          <SelectPeriode setPopupPeriode={setPopupPeriode} />
        </div>

        <hr />
        <div className="mt-4 ">
          {logoSidebar.map((res, i) => {
            if (res.name === undefined) {
              <div className="hidden"></div>;
            } else {
              if (roles === "admin") {
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelect(res.name);
                      router.push({
                        pathname: "/Admin",
                        query: { component: res.path },
                      });
                    }}
                    className={`${res.name === "Seting Slider" && "border-t-2 my-2"} flex gap-2 p-2 justify-start w-full text-[18px] font-medium items-center`}
                    style={{
                      stroke: router.query.component === res.path ? "rgb(234, 88, 12)" : "rgb(51, 65, 85)",
                      backgroundColor: router.query.component === res.path ? "rgb(255, 247, 237)" : "white",
                      WebkitTextFillColor: router.query.component === res.path ? "rgb(234, 88, 12)" : "rgb(51, 65, 85)",
                    }}
                  >
                    <span className="">{res.icon} </span> <span className="font-semibold">{res.name}</span>
                  </button>
                );
              }
              if (res.role === roles) {
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelect(res.name);
                      router.push({
                        pathname: "/Admin",
                        query: { component: res.path },
                      });
                    }}
                    className="flex gap-2 p-2 justify-start w-full text-[18px] font-medium items-center"
                    style={{
                      stroke: select === res.name ? "rgb(234, 88, 12)" : "rgb(51, 65, 85)",
                      backgroundColor: select === res.name ? "rgb(255, 247, 237)" : "white",
                      WebkitTextFillColor: select === res.name ? "rgb(234, 88, 12)" : "rgb(51, 65, 85)",
                    }}
                  >
                    <span className="">{res.icon} </span> <span className="font-semibold">{res.name}</span>
                  </button>
                );
              }
            }
          })}
          <div className="border my-[2px]" />
        </div>
      </div>
    </>
  );
}

export default AdminContent;
