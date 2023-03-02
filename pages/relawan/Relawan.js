import React from "react";
import { useState } from "react";
import RealCount from "../../src/component/admin/RealCount";
import RelawanContent from "../../src/component/sidebar/RelawanContent";
import SideBar from "../../src/component/sidebar/SideBar";
import Logo from "../../src/utility/Logo";

const Relawan = () => {
  const [selectTool, setSelectTool] = useState("Real Count");
  console.log(selectTool);
  return (
    <div className="flex h-screen">
      <div className="basis-3/12 sticky min-h-screen overflow-scroll  scrollbar-thin scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]">
        <SideBar content={<RelawanContent setSelectTool={setSelectTool} />} />
      </div>
      <div className="basis-9/12 overflow-scroll scrollbar-thin scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]">{selectTool === "Real Count" && <RealCount user={"Relawan"} />}</div>
    </div>
  );
};

export default Relawan;
