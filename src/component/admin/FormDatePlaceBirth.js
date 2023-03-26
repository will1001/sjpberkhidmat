import React from "react";

function FormDatePlaceBirth({ onChangePlace, onChangeDate, valuePlace, valueDate, mobile }) {
  return (
    <div className={`${mobile === true ? "flex flex-col gap-1 mt-3" : "flex justify-start items-center my-3"} `}>
      <label className={`${mobile === true ? "text-[14px] text-[#374151]" : "text-[14px] w-[20%] text-[#374151] mr-[50px]"} `}>Tempat & Tgl Lahir</label>
      <div className={`${mobile === true ? "text-[#374151] border px-2 py-1" : "h-[40px] w-[70%] border text-[#374151] flex justify-between"} `}>
        <input onChange={onChangePlace} className="px-2 outline-0" type={"text"} value={valuePlace} />
        <input onChange={onChangeDate} className=" outline-0" type="date" id="tanggal lahir" name="trip-start" defaultValue="" min="1945-01-01" max="2024-12-31" value={valueDate?.substring(0, 10)}></input>
      </div>
    </div>
  );
}

export default FormDatePlaceBirth;
