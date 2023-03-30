import React, { useEffect, useState } from "react";
import { DataPerdesaIcon, KembaliIcon, TpsIcon } from "../../utility/icon/icon";
import Button from "../Button";
import JumlahPenduduk from "../JumlahPenduduk";
import ProgressBar from "../../utility/ProgresBar";
import ButtonPopUpInfo from "../ButtonPopUpInfo";
import { useRouter } from "next/router";

const MataramContent = ({ data, setHover, targetKab, setIcon, statisticKec, mobile }) => {
  const jumlahSimpatisan =
    statisticKec !== undefined &&
    statisticKec?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.jumlah_simpatisans;
    }, 0);
  const targetSuara =
    statisticKec !== undefined &&
    statisticKec?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.target_suara;
    }, 0);
  const persentase = (jumlahSimpatisan / targetSuara) * 100;
  const [nama, setNama] = useState();
  const router = useRouter();

  const id_kabupaten = data?.toString();
  const namaKabupaten = () => {
    if (id_kabupaten === "5271") {
      setNama("Kota Mataram");
    } else if (id_kabupaten === "5203") {
      setNama("Kab. Lombok Timur");
    } else if (id_kabupaten === "5201") {
      setNama("Kab. Lombok Barat");
    } else if (id_kabupaten === "5202") {
      setNama("Kab. Lombok Tengah");
    } else if (id_kabupaten === "5208") {
      setNama("Kab. Lombok Utara");
    }
  };

  useEffect(() => {
    namaKabupaten();
  }, []);

  // console.log(statisticKec !== undefined && statisticKec, "asdasd");
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <div onClick={() => router.back()}>
          <Button title={"Kembali"} text={"white"} icon={<KembaliIcon />} bgColor={"rgb(51, 65, 85)"} w={"149px"} h={"53px"} />
        </div>
        <div
          onClick={() =>
            mobile !== true
              ? router.push({
                  pathname: "./DetailKelurahan",
                })
              : router.push({
                  pathname: "./DetailKelurahan",
                  query: { display: "mobile", id_kabupaten: id_kabupaten },
                })
          }
        >
          <Button title={"Data Per Desa"} text="white" icon={<DataPerdesaIcon />} bgColor={"#FF5001"} w={"211px"} h={"53px"} />
        </div>
      </div>
      <h1 className="text-[32px] font-bold text-slate-700">{nama}</h1>
      <ButtonPopUpInfo gantiIcon={setIcon} statisticKec={statisticKec} data={id_kabupaten} setHover={setHover} targetKec={targetKab} />

      {/* <div className="mt-4 ">
        <div className="flex justify-between text[18px] text-[#374151] font-bold">
          <p className="w-[180px]">Target Simpatisan</p>
          <div className="flex gap-2">
            <p className="text-[#6B7280]">{jumlahSimpatisan?.toLocaleString()} /</p>
            <p>{targetSuara?.toLocaleString()}</p>
          </div>
        </div>
        <ProgressBar progress={persentase.toFixed()} bgcolor={"#FF5001"} height={"11px"} />
      </div> */}
    </div>
  );
};

export default MataramContent;
