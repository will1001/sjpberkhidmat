import React from "react";
import Logo from "../../src/utility/Logo";
import alert from "../../src/utility/img/alert_plano.png";
import { SubmitIcon } from "../../src/utility/icon/icon";
import { useRouter } from "next/router";

const InputData = () => {
  const router = useRouter();
  return (
    <>
      <div className="fixed bg-white w-screen px-8 py-2 border-b-2">
        <div className="flex justify-between items-center gap-12">
          <Logo />
          <div className="flex items-center">
            <img className="" src={alert.src} />
          </div>
          <div className="flex gap-3">
            <div className="flex bg-[#E44700] stroke-white py-2 px-4 gap-3 items-center rounded-sm cursor-pointer">
              <SubmitIcon /> <p className="text-white font-semibold">Submit</p>
            </div>
            <div className="py-2 px-4 border rounded-sm border-[#374151] text-[#374151] font-semibold cursor-pointer">Lanjutkan Nanti</div>
          </div>
        </div>
      </div>

      <div className="text-[#374151] p-6">
        <div className="flex mt-[80px]">
          <div className=" basis-1/2">{router.query.plano && <img className="w-full h-full" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + router.query.plano} />}</div>
          <div className="basis-1/2">asd</div>
        </div>
      </div>
    </>
  );
};

export default InputData;
