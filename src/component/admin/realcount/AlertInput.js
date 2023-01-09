import React from "react";

const AlertInput = () => {
  return (
    <div className="flex justify-center items-center gap-4 bg-[#FEF2F2] h-[40px] w-[670px]">
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.9995 9.41113V11.4111M11.9995 15.4111H12.0095M5.07134 19.4111H18.9277C20.4673 19.4111 21.4296 17.7445 20.6598 16.4111L13.7316 4.41113C12.9618 3.0778 11.0373 3.0778 10.2675 4.41113L3.33929 16.4111C2.56949 17.7445 3.53174 19.4111 5.07134 19.4111Z"
          stroke="#B91C1C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-[#B91C1C] text-[18px] font-normal">Anda belum input daftar partai dan calon Untuk Periode 2024 - 2029</p>
    </div>
  );
};

export default AlertInput;
