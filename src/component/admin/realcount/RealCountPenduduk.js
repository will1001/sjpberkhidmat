import React from "react";
import useFetch from "../../../API/useFetch";
import { PendudukIcon } from "../../../utility/icon/icon";
const RealCountPenduduk = () => {
  const getStatistik = useFetch("get", "user/dashboard/statistik/all");
  console.log(getStatistik);
  return (
    <div className="flex gap-8 pt-8">
      <div className="flex items-center p-2 gap-2 w-[200px] h-[60px] text-slate-700 stroke-slate-700 border border-[#FF5001] rounded-sm">
        <PendudukIcon />
        <div>
          <p className="text-[21px] font-bold text-[#FF5001]">
            {getStatistik.data !== undefined &&
              getStatistik?.data?.jumlah_penduduk}
          </p>
          <p className="text-[16px] font-normal">Jumlah Penduduk</p>
        </div>
      </div>
      <div className="flex items-center p-2 gap-2 w-[200px] h-[60px] text-slate-700 stroke-slate-700 border border-[#FF5001] rounded-sm">
        <PendudukIcon />
        <div>
          <p className="text-[21px] font-bold text-[#FF5001]">
            {getStatistik.data !== undefined &&
              getStatistik?.data?.jumlah_dpt_dps}
          </p>
          <p className="text-[16px] font-normal">Jumlah DPT / DPS</p>
        </div>
      </div>
      <div className="flex items-center p-2 gap-2 w-[200px] h-[60px] text-slate-700 stroke-slate-700 border border-[#FF5001] rounded-sm">
        <PendudukIcon />
        <div>
          <p className="text-[21px] font-bold text-[#FF5001]">
            {getStatistik.data !== undefined && getStatistik?.data?.jumlah_tps}
          </p>
          <p className="text-[16px] font-normal">Jumlah TPS</p>
        </div>
      </div>
    </div>
  );
};

export default RealCountPenduduk;
