import React from "react";

const CountDown = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center">
        <p className="text-[49px] font-bold text-[#FF5001]">7</p>
        <p className="text-[#FF5001] text-[18px]">Hari</p>
      </div>
      <div className="flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center">
        <p className="text-[49px] font-bold text-[#FF5001]">14</p>
        <p className="text-[#FF5001] text-[18px]">Jam</p>
      </div>
      <div className="flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center">
        <p className="text-[49px] font-bold text-[#FF5001]">15</p>
        <p className="text-[#FF5001] text-[18px]">Menit</p>
      </div>
      <div className="flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center">
        <p className="text-[49px] font-bold text-[#FF5001]">52</p>
        <p className="text-[#FF5001] text-[18px]">Detik</p>
      </div>
    </div>
  );
};

export default CountDown;
