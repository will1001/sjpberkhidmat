import React from "react";
import cariProgramIcon from "../../src/utility/icon/searchIcon.png";

function SearchInput({ placeholder, onChange }) {
  return (
    <div className="border border-gray-500 border-1 rounded-lg p-[3px]">
      {" "}
      <input
        onChange={onChange}
        style={{ backgroundImage: `url(${cariProgramIcon.src})` }}
        className="w-[317px] bg-no-repeat bg-right h-[40px] rounded-md outline-0 pl-2 pr-8 text-[14px] text-slate-800 font-semibold"
        type={"text"}
        // value={search}
        id="search"
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchInput;
