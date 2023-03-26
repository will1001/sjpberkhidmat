import React from "react";

function FormSelect({ label, onChange, options, value, mobile }) {
  return (
    <div className={`${mobile === true ? "flex flex-col gap-1 mt-3" : "flex justify-start items-center my-3"} `}>
      <label className={`${mobile === true ? "text-[14px] text-[#374151]" : "text-[14px] w-[20%] text-[#374151] mr-[50px]"} `}>{label}</label>
      <select onChange={onChange} className={`${mobile === true ? "border text-[#374151] px-2 py-1" : "h-[40px] w-[70%] border text-[#374151]"}  `} value={value}>
        <option value="" disabled selected>
          Pilih {label}
        </option>
        {options.data?.map((res, i) => {
          return (
            <option key={i} value={res._id}>
              {res.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormSelect;
