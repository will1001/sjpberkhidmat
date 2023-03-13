import React from "react";
import Countdown from "react-countdown";

const CountDown = ({ mobile }) => {
  return (
    <div className={`${mobile !== undefined ? "flex gap-1" : "flex gap-4"} `}>
      <Countdown
        date={Date.now() + (1692201600000 - Date.now())}
        renderer={(props) => (
          <>
            <div className={`${mobile !== undefined ? "flex flex-col justify-center h-[29.87px] w-[28px] bg-white rounded-md text-center" : "flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center"}`}>
              <p className={`${mobile !== undefined ? "text-[15px] font-bold text-[#FF5001]" : "text-[49px] font-bold text-[#FF5001]"}`}>{props.days}</p>
              <p className={`${mobile !== undefined ? "text-[#FF5001] text-[5.4px]" : "text-[#FF5001] text-[18px]"} `}>Hari</p>
            </div>
            <div className={`${mobile !== undefined ? "flex flex-col justify-center h-[29.87px] w-[28px] bg-white rounded-md text-center" : "flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center"}`}>
              <p className={`${mobile !== undefined ? "text-[15px] font-bold text-[#FF5001]" : "text-[49px] font-bold text-[#FF5001]"}`}>{props.hours}</p>
              <p className={`${mobile !== undefined ? "text-[#FF5001] text-[5.4px]" : "text-[#FF5001] text-[18px]"} `}>Jam</p>
            </div>
            <div className={`${mobile !== undefined ? "flex flex-col justify-center h-[29.87px] w-[28px] bg-white rounded-md text-center" : "flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center"}`}>
              <p className={`${mobile !== undefined ? "text-[15px] font-bold text-[#FF5001]" : "text-[49px] font-bold text-[#FF5001]"}`}>{props.minutes}</p>
              <p className={`${mobile !== undefined ? "text-[#FF5001] text-[5.4px]" : "text-[#FF5001] text-[18px]"} `}>Menit</p>
            </div>
            <div className={`${mobile !== undefined ? "flex flex-col justify-center h-[29.87px] w-[28px] bg-white rounded-md text-center" : "flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center"}`}>
              <p className={`${mobile !== undefined ? "text-[15px] font-bold text-[#FF5001]" : "text-[49px] font-bold text-[#FF5001]"}`}>{props.seconds}</p>
              <p className={`${mobile !== undefined ? "text-[#FF5001] text-[5.4px]" : "text-[#FF5001] text-[18px]"} `}>Detik</p>
            </div>
          </>
        )}
      />
      ,
    </div>
  );
};

export default CountDown;
