import React from "react";

function JumlahPenduduk({ title, total, icon, h, w, totalSize, titleSize, active }) {
  return (
    <button
      value={title}
      style={{ width: "100%" }}
      className={` 
      ${title === active ? "text-white" : "text-orange-600"}
      ${title === active ? "bg-orange-600" : "bg-white"}
      ${title === active ? "stroke-white" : "stroke-orange-600"}
       flex border rounded-md   border-orange-300  items-center gap-4`}
    >
      <div className="flex items-center gap-2 px-2 w-full">
        <div className="px-2"> {icon}</div>
        <div className="">
          <p className={`text-[${totalSize}] flex px-2 font-bold`}>{total}</p>
          <p className={`flex text-[${titleSize}] ${title === active ? "text-white" : "text-[#374151]"} font-medium `}>{title}</p>
        </div>
      </div>
    </button>
  );
}

export default JumlahPenduduk;
