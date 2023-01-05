import React, { useState } from "react";
import { DataPerdesaIcon, HomeIcon, KembaliIcon, TpsIcon } from "../../utility/icon/icon";
import Button from "../Button";
import JumlahPenduduk from "../JumlahPenduduk";
import ProgressBar from "../../utility/ProgresBar";
import ContacRelawan from "../ContacRelawan";

const DetailDesaContent = ({ data }) => {
  const [active, setActive] = useState("hidden");
  const handleActive = () => {
    active === "hidden" ? setActive("visible") : setActive("hidden");
  };

  return (
    <>
      <div className={`${active} absolute w-[398px] top-0 left-[552px] bg-white`}>
        <button onClick={handleActive} className="absolute right-0">
          <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 16.5C0 7.66344 7.16344 0.5 16 0.5H44V44.5H16C7.16344 44.5 0 37.3366 0 28.5V16.5Z" fill="#FF5001" />
            <path d="M16 28.5L28 16.5M16 16.5L28 28.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <ContacRelawan />
      </div>

      <div>
        <div className="flex gap-2 mt-4">
          <Button title={"Kembali"} text={"white"} icon={<KembaliIcon />} bgColor={"rgb(51, 65, 85)"} w={"149px"} h={"53px"} />
          <Button title={"Per Kab/Kota"} text={"white"} icon={<DataPerdesaIcon />} bgColor={"#FF5001"} w={"201px"} h={"53px"} />
          <HomeIcon />
        </div>
        <div className="mt-4">
          <p className="text-[32px] font-bold text-slate-700">Desa {data?.nama}</p>
          <p className="text-[26px] font-medium text-slate-700">Kec. Ampenan</p>
        </div>
        <div className="flex mt-2 gap-4">
          <JumlahPenduduk title={"Relawan"} icon={<TpsIcon />} total="123.123" h={"63px"} w={"175px"} totalSize={"21px"} titleSize={"18px"} />
          <JumlahPenduduk title={"Relawan"} icon={<TpsIcon />} total="123.123" h={"63px"} w={"175px"} totalSize={"21px"} titleSize={"18px"} />
        </div>
        <div className="flex gap-4 mt-4">
          <JumlahPenduduk title={"Relawan"} icon={<TpsIcon />} total="123.123" h={"63px"} w={"175px"} totalSize={"21px"} titleSize={"18px"} />
          <JumlahPenduduk title={"Relawan"} icon={<TpsIcon />} total="123.123" h={"63px"} w={"175px"} totalSize={"21px"} titleSize={"18px"} />
        </div>
        <div className="mt-8">
          <p className="text-[18px] font-bold text-slate-700">Real Count</p>
          <ProgressBar bgcolor={"#FF5001"} progress={"95"} height={"24px"} />
        </div>
        <hr className="w-full h-1 bg-gray-100 border-0 rounded  mt-8" />
        <div className="mt-4">
          <p className="text-[18px] font-bold text-slate-700">Target Simpatisan</p>
          <ProgressBar bgcolor={"#FF5001"} progress={"95"} height={"11px"} />
          <div className="flex justify-between items-end pr-16 mt-4">
            <div className="text-[18px] font-normal text-slate-700">
              <p>Jumlah DPT</p>
              <p>Jumlah DPS</p>
              <p>Jumlah TPS</p>
              <p className="mt-4">Relawan</p>
              <p>Simpatisan</p>
            </div>
            <div className="text-[18px] font-bold text-slate-700">
              <p>325.124</p>
              <p>325.124</p>
              <p>25</p>
              <p className="mt-4 text-orange-600">42</p>
              <p className="text-orange-600">325.574</p>
            </div>
            <div className="text-[16px] font-normal text-orange-600">
              <p>.</p>
              <p>.</p>
              <p>.</p>
              <p className="underline mt-4">
                <button onClick={handleActive}>Lihat Detail</button>
              </p>
              <p className="underline">
                <button>Lihat Detail</button>
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-bold text-[18px] text-slate-700 mb-2">Program</p>
            <ul>
              <li className="w-[486px] p-4 mb-2 border">
                <p className="text-[18px] font-semibold text-slate-700">title program</p>
                <p className="text-[16px] font-normal text-slate-700">
                  Do irure anim velit est laboris irure est ipsum non cupidatat. Qui duis consectetur adipisicing ex ex duis exercitation exercitation eu irure. Elit dolore cillum exercitation reprehenderit ex occaecat aliquip sit deserunt
                  sint fugiat. Laboris nisi Lorem voluptate amet pariatur nulla nostrud ullamco. Ut sunt eiusmod ad anim laborum exercitation culpa ex irure irure ex.
                </p>
              </li>
              <li className="w-[486px] p-4 mb-2 border">
                <p className="text-[18px] font-semibold text-slate-700">title program</p>
                <p className="text-[16px] font-normal text-slate-700">
                  Do irure anim velit est laboris irure est ipsum non cupidatat. Qui duis consectetur adipisicing ex ex duis exercitation exercitation eu irure. Elit dolore cillum exercitation reprehenderit ex occaecat aliquip sit deserunt
                  sint fugiat. Laboris nisi Lorem voluptate amet pariatur nulla nostrud ullamco. Ut sunt eiusmod ad anim laborum exercitation culpa ex irure irure ex.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailDesaContent;
