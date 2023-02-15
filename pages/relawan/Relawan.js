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
    <div className="flex">
      <div className="basis-3/12">
        <SideBar content={<RelawanContent setSelectTool={setSelectTool} />} />
      </div>
      <div>{selectTool === "Real Count" && <RealCount user={"Relawan"} />}</div>
    </div>
  );
};

export default Relawan;
