import React from "react";

function FormSelect({ label, onChange, options, value }) {
  return (
    <div className="flex justify-start items-center my-3">
      <label className="text-[14px] w-[20%] text-[#374151] mr-[50px]">
        {label}
      </label>
      <select
        onChange={onChange}
        className="h-[40px] w-[70%] border text-[#374151]"
        value={value}
      >
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
