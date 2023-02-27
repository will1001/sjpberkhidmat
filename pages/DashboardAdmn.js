import React from "react";
import useFetch from "../src/API/useFetch";
import Button from "../src/component/Button";
import JumlahPenduduk from "../src/component/JumlahPenduduk";

import { BackIcon, PendudukIcon, PetaKekuatanIcon, TargetSuaraIcon, TpsIcon } from "../src/utility/icon/icon";
import PetaLombok from "../src/utility/PetaLombok";

function AdminDashboard() {
  return (
    <div className="bg-orange-50">
      <button>
        <BackIcon />
      </button>
      <div className="pt-4 pl-8 ">
        <h1 className="font-bold text-[32px] text-slate-700 ml-24">Dapil Nusa Tenggara Barat II</h1>
        <div className="flex ml-24 item-center gap-4 mt-2">
          <JumlahPenduduk title={"Target Suara"} total={"123.456"} icon={<TargetSuaraIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"89px"} />
          <JumlahPenduduk title={"Suara Periode Lalu"} total={"123.456"} icon={<TargetSuaraIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"89px"} />
          <JumlahPenduduk title={"Jumlah TPS"} total={"123.456"} icon={<TpsIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"89px"} />
        </div>
        <div className="flex ml-24 item-center gap-4 mt-2">
          <JumlahPenduduk title={"Jumlah DPT/DPS"} total={"123.456"} icon={<TargetSuaraIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"89px"} />
          <JumlahPenduduk title={"Jumlah Relawan"} total={"123.456"} icon={<TargetSuaraIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"89px"} />
          <JumlahPenduduk title={"Jumlah Simpatisan"} total={"123.456"} icon={<PendudukIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"89px"} />
        </div>
        <div className="ml-24 mt-6 mb-8">
          <Button title={"Peta Kekuatan"} text={"white"} icon={<PetaKekuatanIcon />} w={"280px"} h={"63px"} bgColor={"rgb(51, 65, 85)"} />
        </div>
        <div className="ml-24">
          <PetaLombok />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
