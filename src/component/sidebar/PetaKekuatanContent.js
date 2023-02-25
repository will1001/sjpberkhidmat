import { useRouter } from "next/router";
import React from "react";
import { KembaliIcon, TpsIcon } from "../../utility/icon/icon";
import Button from "../Button";
import ButtonPopUpInfo from "../ButtonPopUpInfo";

function PetaKekuatanContent({ dataKabupaten, setHover, targetKab, program, statistic }) {
  const kabupaten = dataKabupaten?.data;
  const router = useRouter();
  // console.log(targetKab, "asdasd");
  const jumlahSimpatisan =
    statistic !== undefined &&
    statistic?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.jumlah_simpatisans;
    }, 0);
  const targetSuara =
    statistic !== undefined &&
    statistic?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.target_suara;
    }, 0);
  const persentase = (jumlahSimpatisan / targetSuara) * 100;
  console.log(parseInt(persentase.toFixed()));

  return (
    <div className="mt-4 ">
      <div onClick={() => router.back()}>
        <Button title={"Kembali"} icon={<KembaliIcon />} text={"white"} w={"149px"} h={"53px"} bgColor={"rgb(51, 65, 85)"} />
      </div>

      <ButtonPopUpInfo type={"kab_kota"} statistic={statistic} targetKab={targetKab} setHover={setHover} programData={program} data={undefined} />
      {/* realcount progress */}
      <div className="border-b-2 mt-6" />
      <p className="mt-3 text-[18px] text-[#374151] font-bold">Suara Real Count</p>
      <div className="flex gap-2 items-center ">
        <div className="w-full bg-[#FFECE4] h-[31px] flex items-center">
          <div className={`w-[${parseInt(persentase.toFixed())}] bg-[#FF5001] flex items-center  h-[27px]`}></div>
        </div>
        <p className="relative right-0 text-[#FF5001] text-[26px] font-bold">{parseInt(persentase.toFixed())}%</p>
      </div>
    </div>
    // </div>
  );
}

export default PetaKekuatanContent;
