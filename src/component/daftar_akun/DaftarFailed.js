import React, { useState } from "react";

const DaftarFailed = ({ error, title }) => {
  return (
    <div className="mt-[130px]">
      <p className="flex justify-center font-bold text-[32px] text-[#374151] mt-[32px]">{title}</p>
      <p className="flex items-center justify-center text-[21px] italic text-red-500 mt-[20px] underline">{error}</p>
    </div>
  );
};

export default DaftarFailed;
