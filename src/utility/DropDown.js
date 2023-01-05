import React from "react";
import { DropDownIconBlack } from "./icon/icon";

const DropDown = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <button className="flex justify-between px-4 pt-3 items-start w-[109px] h-[48px] border rounded-sm" onClick={handleOpen}>
      {open ? (
        <ul className="text-slate-400">
          <li>2025</li>
          <li>2026</li>
          <li>2027</li>
          <li>2028</li>
        </ul>
      ) : (
        <p className="text-slate-400">2024</p>
      )}
      <div className="">
        <DropDownIconBlack />
      </div>
    </button>
  );
};

export default DropDown;
