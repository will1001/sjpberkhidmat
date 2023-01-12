import React from "react";

function JumlahPenduduk({ title, total, icon, h, w, totalSize, titleSize, active }) {
  return (
    <button
      value={title}
      style={{ width: w, height: h }}
      className={` 
      ${title === active ? "text-white" : "text-orange-600"}
      ${title === active ? "bg-orange-600" : "bg-white"}
      ${title === active ? "stroke-white" : "stroke-orange-600"}
       flex border rounded-md   border-orange-300 justify-start p-4 items-center gap-4`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <div className="flex flex-col justify-start items-start ">
          <span className={`text-[${totalSize}] font-bold`}>{total}</span>
          <p className={`text-[${titleSize}] font-medium`}>{title}</p>
        </div>
      </div>
    </button>
  );
}

export default JumlahPenduduk;
