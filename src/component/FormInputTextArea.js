import React from "react";

function FormInputTextArea({ label, type, onChange, value, disabled }) {
  return (
    <div className="flex justify-start items-center my-3">
      <label className="text-[14px] w-[20%] text-[#374151] mr-[50px]">
        {label}
      </label>
      <textarea
        cols="9"
        rows="7"
        onChange={onChange}
        className="w-[70%] border text-[#374151] px-2 outline-0"
        // type={type}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

export default FormInputTextArea;
