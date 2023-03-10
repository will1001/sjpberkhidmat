import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../../src/component/admin/Dashboard";
import DptDps from "../../src/component/admin/dpt_dps/DptDps";
import Logistik from "../../src/component/admin/Logistik";
import RealCount from "../../src/component/admin/RealCount";
import RelawanDash from "../../src/component/admin/RelawanDash";
import SimpatisanDash from "../../src/component/admin/SimpatisanDash";
import Forum from "../../src/component/Forum";
import KoordinatorContetn from "../../src/component/sidebar/KoordinatorContetn";
import RelawanContent from "../../src/component/sidebar/RelawanContent";
import SideBar from "../../src/component/sidebar/SideBar";
import Logo from "../../src/utility/Logo";

const Relawan = () => {
  const [selectTool, setSelectTool] = useState("Dashboard");
  const [popupPeriode, setPopupPeriode] = useState(false);
  const roles = useSelector((state) => state.user.roles);
  console.log(selectTool);
  return (
    <div className="flex h-screen">
      <div className="basis-3/12 sticky min-h-screen overflow-scroll  scrollbar-thin scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]">
        <SideBar content={<KoordinatorContetn roles={roles} setPopupPeriode={setPopupPeriode} setSelectTool={setSelectTool} selectTool={selectTool}/>} />
      </div>
      <div className={`${popupPeriode === true && "-z-50"} basis-9/12 overflow-scroll scrollbar-thin scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]`}>
       {selectTool === "Dashboard" && <Dashboard/>}
        {selectTool === "Real Count" && <RealCount user={"Relawan"} />}
        {selectTool === "DPT/DPS" && <DptDps/>}
        {selectTool === "Logistik" && <Logistik/>}
        {selectTool === "Relawan" && <RelawanDash/>}
        {selectTool === "Simpatisan" && <SimpatisanDash/>}
        {selectTool === "Forum" && <Forum/>}
      </div>
    </div>
  );
};

export default Relawan;
