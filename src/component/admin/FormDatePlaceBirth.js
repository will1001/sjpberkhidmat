import React from "react";

function FormDatePlaceBirth({ onChangePlace, onChangeDate }) {
  return (
    <div className="flex justify-start items-center my-3">
      <label className="text-[14px] w-[20%] text-[#374151] mr-[50px]">
        Tempat & Tgl Lahir
      </label>
      <div className="h-[40px] w-[70%] border text-[#374151] flex justify-between">
        <input
          onChange={onChangePlace}
          className="px-2 outline-0"
          type={"text"}
        />
        <input
          onChange={onChangeDate}
          className=" outline-0"
          type="date"
          id="tanggal lahir"
          name="trip-start"
          defaultValue=""
          min="1945-01-01"
          max="2024-12-31"
        ></input>
      </div>
    </div>
  );
}

export default FormDatePlaceBirth;
