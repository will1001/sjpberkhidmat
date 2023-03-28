import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../API/useFetch";

import Button from "../../component/Button";
import JumlahPenduduk from "../../component/JumlahPenduduk";

import { BackIcon, PendudukIcon, PetaKekuatanIcon, RelawanIcon, TargetSuaraIcon, TpsIcon } from "../../utility/icon/icon";
import PetaLombok from "../../utility/PetaLombok";

function Dashboard() {
  const router = useRouter();
  const getTarget = useFetch("get", "user/dashboard/statistik/kabupaten");
  const id_kabupaten = useSelector((state) => state.user.id_kabupaten);
  const roles = useSelector((state) => state.user.roles);

  const jumlahSimpatisan =
    getTarget !== undefined &&
    getTarget?.data?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.jumlah_simpatisans;
    }, 0);
  const targetSuara =
    getTarget !== undefined &&
    getTarget?.data?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.target_suara;
    }, 0);
  const suaraLalu =
    getTarget !== undefined &&
    getTarget?.data?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.suara_periode_lalu;
    }, 0);
  const jumlahTPS =
    getTarget !== undefined &&
    getTarget?.data?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.jumlah_tps;
    }, 0);
  const jumlahDPTDPS =
    getTarget !== undefined &&
    getTarget?.data?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.jumlah_dpt_dps;
    }, 0);
  const jumlahRelawans =
    getTarget !== undefined &&
    getTarget?.data?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.jumlah_relawans;
    }, 0);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {screenSize.width >= 350 && screenSize.width <= 450 ? (
        <div className="px-[16px]">
          <p className="mt-[21px] mb-[21px] text-[24px] text-[#374151] font-bold">Dashboard</p>
          <div className="flex flex-col gap-3">
            <JumlahPenduduk title={"Target Suara"} total={targetSuara?.toLocaleString()} icon={<TargetSuaraIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
            <JumlahPenduduk title={"Suara Periode Lalu"} total={suaraLalu?.toLocaleString()} icon={<TargetSuaraIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
            <JumlahPenduduk title={"Jumlah TPS"} total={jumlahTPS?.toLocaleString()} icon={<TpsIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
            <JumlahPenduduk title={"Jumlah DPT/DPS"} total={jumlahDPTDPS?.toLocaleString()} icon={<PendudukIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
            <JumlahPenduduk title={"Jumlah Relawan"} total={jumlahRelawans?.toLocaleString()} icon={<RelawanIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
            <JumlahPenduduk title={"Jumlah Simpatisan"} total={jumlahSimpatisan?.toLocaleString()} icon={<PendudukIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
          </div>
          <div
            onClick={() => {
              // console.log(roles === "admin");
              roles === "koordinator" &&
                router.push({
                  pathname: "../peta_kekuatan/DetailKota",
                  query: { kota: id_kabupaten, mobile: "true" },
                });

              roles === "admin" ||
                (roles === "ketua_tim" && router.push("/PetaKekuatan"));
            }}
            className="mt-6"
          >
            <Button title={"Peta Kekuatan"} text={"white"} icon={<PetaKekuatanIcon />} w={"100%"} h={"63px"} bgColor={"rgb(51, 65, 85)"} />
          </div>
        </div>
      ) : (
        <div className="bg-orange-50 h-screen">
          <div className="pt-4 pl-8 ">
            <h1 className="font-bold text-[32px] text-slate-700 ml-24">Dapil Nusa Tenggara Barat II</h1>
            <div className="flex mx-24 item-center gap-4 mt-2">
              <JumlahPenduduk title={"Target Suara"} total={targetSuara?.toLocaleString()} icon={<TargetSuaraIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
              <JumlahPenduduk title={"Suara Periode Lalu"} total={suaraLalu?.toLocaleString()} icon={<TargetSuaraIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
              <JumlahPenduduk title={"Jumlah TPS"} total={jumlahTPS?.toLocaleString()} icon={<TpsIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
            </div>
            <div className="flex mx-24 item-center gap-4 mt-2">
              <JumlahPenduduk title={"Jumlah DPT/DPS"} total={jumlahDPTDPS?.toLocaleString()} icon={<PendudukIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
              <JumlahPenduduk title={"Jumlah Relawan"} total={jumlahRelawans?.toLocaleString()} icon={<RelawanIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
              <JumlahPenduduk title={"Jumlah Simpatisan"} total={jumlahSimpatisan?.toLocaleString()} icon={<PendudukIcon />} totalSize={"32px"} titleSize={"21px"} w={"287px"} h={"73px"} />
            </div>
            <div className="pl-24 mt-6 mb-8">
              <div
                onClick={() => {
                  // console.log(roles === "admin");
                  roles === "koordinator" &&
                    router.push({
                      pathname: "../peta_kekuatan/DetailKota",
                      query: { kota: id_kabupaten },
                    });

                  roles === "admin" && router.push("/PetaKekuatan");
                }}
              >
                <Button title={"Peta Kekuatan"} text={"white"} icon={<PetaKekuatanIcon />} w={"280px"} h={"63px"} bgColor={"rgb(51, 65, 85)"} />
              </div>
            </div>
            <div className="pl-24 bg-orange-50">
              <PetaLombok />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
