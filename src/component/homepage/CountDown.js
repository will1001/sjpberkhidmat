import React from "react";
import Countdown from "react-countdown";

const CountDown = () => {
  return (
    <div className="flex gap-4">
      <Countdown
        date={Date.now() + (1692201600000 - Date.now())}
        renderer={(props) => (
          <>
            <div className="flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center">
              <p className="text-[49px] font-bold text-[#FF5001]">
                {props.days}
              </p>
              <p className="text-[#FF5001] text-[18px]">Hari</p>
            </div>
            <div className="flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center">
              <p className="text-[49px] font-bold text-[#FF5001]">
                {props.hours}
              </p>
              <p className="text-[#FF5001] text-[18px]">Jam</p>
            </div>
            <div className="flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center">
              <p className="text-[49px] font-bold text-[#FF5001]">
                {props.minutes}
              </p>
              <p className="text-[#FF5001] text-[18px]">Menit</p>
            </div>
            <div className="flex flex-col pb-2 justify-center h-[92px] w-[92px] bg-white rounded-lg items-center">
              <p className="text-[49px] font-bold text-[#FF5001]">
                {props.seconds}
              </p>
              <p className="text-[#FF5001] text-[18px]">Detik</p>
            </div>
          </>
        )}
      />
      ,
    </div>
  );
};

export default CountDown;
