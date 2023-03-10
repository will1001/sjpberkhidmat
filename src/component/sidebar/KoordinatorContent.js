import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { logoSidebar } from "../../utility/icon/LogoSidebar";
import { setToken } from "../../redux/userReducer";
import { useDispatch } from "react-redux";
import SelectPeriode from "../SelectPeriode";

const RelawanContent = ({ setSelectTool }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [select, setSelect] = useState("Dashboard");
  const handleLogOut = () => {
    dispatch(setToken({ token: "", roles: "" }));
    router.push("../Login");
  };
  return (
    <>
      <div className="mt-3 ">
        <SelectPeriode />
      </div>

      <div className="mt-3">
        {logoSidebar
          .filter((data) => ["relawan"].includes(data.role))
          .map((res, i) => (
            <div
              onClick={() => {
                setSelect(res.name);
                setSelectTool(res.name);
                router.push({
                  pathname: "/Admin",
                  query: { component: res.path },
                });
              }}
              key={i}
              className={`flex items-center gap-2 ${
                select === res.name
                  ? "bg-[#FFECE4] text-[#E44700] stroke-[#E44700]"
                  : "stroke-[#374151] text-[#374151]"
              }  py-2 cursor-pointer text-[21px] font-medium`}
            >
              {res.icon} {res.name}
            </div>
          ))}
        <div onClick={handleLogOut}>logout sementara</div>
      </div>
    </>
  );
};

export default RelawanContent;
