import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Logistik from "../../src/component/admin/Logistik";
import RealCount from "../../src/component/admin/RealCount";
import SimpatisanDash from "../../src/component/admin/SimpatisanDash";
import RumahAspirasi from "../../src/component/aspirasi/RumahAspirasi";
import RumahAspirasi from "../../src/component/aspirasi/RumahAspirasi";
import RelawanContent from "../../src/component/sidebar/RelawanContent";
import SideBar from "../../src/component/sidebar/SideBar";
import Logo from "../../src/utility/Logo";

const Relawan = () => {
  const [selectTool, setSelectTool] = useState("Real Count");
  const name = useSelector((state) => state.user.name);
  const role = useSelector((state) => state.user.roles);
  const [popupPeriode, setPopupPeriode] = useState(false);
  console.log(popupPeriode);
  return (
    <div className="flex h-screen">
      <div className="basis-3/12 sticky min-h-screen overflow-scroll  scrollbar-thin scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]">
        <SideBar
          content={
            <RelawanContent
              setPopupPeriode={setPopupPeriode}
              username={name}
              role={role}
              setSelectTool={setSelectTool}
            />
          }
        />
      </div>
      <div
        className={`${
          popupPeriode === true && "-z-50"
        } basis-9/12 overflow-scroll scrollbar-thin scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]`}
      >
        {selectTool === "Real Count" && <RealCount user={"Relawan"} />}
        {selectTool === "Logistic" && <Logistik />}
        {selectTool === "Simpatisan" && <SimpatisanDash />}
        {selectTool === "Aspirasi" && <RumahAspirasi />}
      </div>
    </div>
  );
};

export default Relawan;
