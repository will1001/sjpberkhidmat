import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { UserIcon } from "../../utility/icon/icon";
import { logoSidebar } from "../../utility/icon/LogoSidebar";
import SelectPeriode from "../SelectPeriode";

const KoordinatorContetn = ({
  roles,
  setPopupPeriode,
  setSelectTool,
  selectTool,
}) => {
  const router = useRouter();
  const username = useSelector((state) => state.user.name);
  return (
    <div>
      <div className="flex items-center mb-4">
        <UserIcon />
        <div className="flex flex-col pl-2 ">
          <p className="font-semibold text-slate-700">{username}</p>
          <p className="text-xs text-slate-700 font-thin">Akun {roles} </p>
        </div>
      </div>
      <div className="mb-3">
        <SelectPeriode setPopupPeriode={setPopupPeriode} />
      </div>

      {logoSidebar
        .filter((data) => data.koordinator === true)
        .map((res, i) => (
          <div
            onClick={() => {
              setSelectTool(res.name);
              router.push({ pathname: "/koordinator/Koordinator" });
            }}
            className={`${
              selectTool === res.name
                ? "bg-[#FFECE4] text-[#FF5001] stroke-[#FF5001]"
                : "stroke-[#374151] text-[#374151]"
            }  flex gap-3 p-2 cursor-pointer items-center font-medium`}
            key={i}
          >
            {res.icon} <p className="text-[21px]">{res.name}</p>
          </div>
        ))}
      <div className="border-b-2 mt-2" />
    </div>
  );
};

export default KoordinatorContetn;
