import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { logoSidebar } from "../../utility/icon/LogoSidebar";
import SelectPeriode from "../SelectPeriode";
import { UserIcon } from "../../utility/icon/icon";
import logoutIcon from "../../utility/icon/logout.png";

const RelawanContent = ({ setSelectTool, username, role, setPopupPeriode }) => {
  const router = useRouter();
  const [select, setSelect] = useState("Real Count");

  return (
    <>
      <div className="flex gap-3 items-center">
        <UserIcon />
        <div className="text-[#374151]">
          <p className="text-[21px] font-medium">{username}</p>
          <p>Akun {role}</p>
        </div>
      </div>
      <div className="mt-3">
        <SelectPeriode setPopupPeriode={setPopupPeriode} />
      </div>
      <div className="border-b-2 mt-3" />
      <div className="mt-3">
        {logoSidebar
          .filter((data) => ["relawan"].includes(data.role))
          .map((res, i) => (
            <div
              onClick={() => {
                setSelect(res.name);
                setSelectTool(res.name);
              }}
              key={i}
              className={`flex items-center gap-2 ${
                select === res.name
                  ? "bg-[#FFECE4] text-[#E44700] stroke-[#E44700]"
                  : "stroke-[#374151] text-[#374151]"
              }  py-2 px-2 cursor-pointer text-[18px] font-medium`}
            >
              {res.icon} {res.name}
            </div>
          ))}
        <div className="border-t-2 mt-3 mb-3" />
      </div>
    </>
  );
};

export default RelawanContent;
