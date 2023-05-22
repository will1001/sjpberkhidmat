import React from "react";

function FormInputItem({ label, type, onChange, value, disabled, maxLength, mobile }) {
  return (
    <div className={`${mobile === true ? "flex flex-col gap-1 mt-3" : "flex justify-start items-center my-3"} `}>
      <label className={`${mobile === true ? "text-[#374151] text-[14px]" : "text-[14px] w-[50%] text-[#374151] mr-[50px]"} `}>{label}</label>
      <input onChange={onChange} className={`${mobile === true ? "w-full border text-[#374151] px-2 py-1 mt-2]" : "h-[40px] w-[70%] border text-[] px-2 outline-0"} `} type={type} value={value} disabled={disabled} maxLength={maxLength} />
    </div>
  );
}

export default FormInputItem;
