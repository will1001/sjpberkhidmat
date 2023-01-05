import React from "react";

function Button({ icon, title, w, h, bgColor, border, text, borderColor }) {
  return (
    <button style={{ width: w, height: h, backgroundColor: bgColor }} className={`rounded-sm`}>
      <div className="flex justify-center items-center  gap-2 ">
        {icon}
        <p className={`font-semibold text-[26px] text-${text} ${border} ${borderColor}`}>{title}</p>
      </div>
    </button>
  );
}

export default Button;
