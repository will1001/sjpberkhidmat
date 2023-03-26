import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToolMobile } from "../../redux/toolMobileReducer";
import { logoSidebar } from "../../utility/icon/LogoSidebar";

const ToolSidebar = ({ setSelectTool }) => {
  const dispatch = useDispatch();
  const tool = useSelector((state) => state.toolMobile.tool);

  return (
    <div>
      {logoSidebar
        .filter((data) => ["relawan"].includes(data.role))
        .map((res, i) => (
          <div
            onClick={() => {
              dispatch(setToolMobile({ tool: res.name }));
            }}
            key={i}
            className={`flex items-center gap-2 ${tool === res.name ? "bg-[#FFECE4] text-[#E44700] stroke-[#E44700]" : "stroke-[#374151] text-[#374151]"}  py-2 px-2 cursor-pointer text-[18px] font-medium`}
          >
            {res.icon} {res.name}
          </div>
        ))}
    </div>
  );
};

export default ToolSidebar;
