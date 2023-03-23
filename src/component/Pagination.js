import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DropDownIcon, NextIcon, PrevIcon } from "../utility/icon/icon";

const Pagination = ({ total_page, current_page, total, setCurrentPage, mobile }) => {
  const [button, setButton] = useState();

  useEffect(() => {
    if (total_page !== undefined) {
      let array = [];
      for (let i = 0; i < total_page; i++) {
        array.push(i);
      }
      setButton(array);
    }
  }, [total_page]);
  //   console.log(setCurrentPage);

  return (
    <div className={`${mobile === true ? "flex flex-col items-center gap-3 mt-3" : "flex items-center justify-between"} `}>
      <div className="flex items-center gap-3 text-[#D1D5DB] stroke-[#D1D5DB]">
        <div className=" flex items-center border px-2 py-1 rounded-md">
          10 <DropDownIcon />
        </div>
        Showing 1 - 10 of {total}
      </div>
      <div className="flex items-center gap-12 stroke-black">
        <div className={`${current_page === 1 ? "hidden" : "visible"}`} onClick={() => setCurrentPage(current_page - 1)}>
          <PrevIcon />
        </div>

        <div className="flex gap-2 items-center">
          {button !== undefined &&
            button.length !== 0 &&
            button.map((res, i) => (
              <div
                onClick={() => setCurrentPage(i + 1)}
                className={`${i <= current_page + 1 && i >= current_page - 2 && i + 1 !== total_page ? "visible" : "hidden"} ${current_page === i + 1 ? "bg-[#FF5001] text-white" : ""} px-3 text-[14px] rounded-md py-1 cursor-pointer`}
                key={i}
              >
                {i + 1}
              </div>
            ))}
          ....
          {button !== undefined &&
            button.length !== 0 &&
            button.map((res, i) => (
              <div onClick={() => setCurrentPage(i + 1)} className={`${i + 1 === total_page ? "visible" : "hidden"} ${current_page === i + 1 ? "bg-[#FF5001] text-white" : ""} px-3 text-[14px] rounded-md py-1 cursor-pointer`} key={i}>
                {i + 1}
              </div>
            ))}
        </div>
        <div className={`${current_page === total_page ? "hidden" : "visible"}`} onClick={() => setCurrentPage(current_page + 1)}>
          <NextIcon />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
