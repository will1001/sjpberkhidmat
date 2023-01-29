import React from "react";

function FormInputItem({ label, type, onChange }) {
  return (
    <div className="flex justify-start items-center my-3">
      <label className="text-[14px] w-[20%] text-[#374151] mr-[50px]">{label}</label>
      <input
        onChange={onChange}
        className="h-[40px] w-[70%] border text-[#374151] px-2 outline-0"
        type={type}
      />
    </div>
  );
}

export default FormInputItem;
