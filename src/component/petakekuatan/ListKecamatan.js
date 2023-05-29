import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axiosFetch from "../../API/axiosFetch";
import relawan from "../../utility/peta/relawan.png";
import logistik from "../../utility/peta/logistik.png";
import simpatisan from "../../utility/peta/simpatisan.png";
import program from "../../utility/peta/program.png";
import JaringanIconSvg from "../../utility/icon/jaringan.svg";
import targetSuara from "../../utility/peta/target_suara.png";
import suaraPeriodeLalu from "../../utility/peta/suara_periode_lalu.png";
import TPS from "../../utility/peta/TPS.png";
import DPTDPS from "../../utility/peta/DPT_DPS.png";
import { useRouter } from "next/router";

const ListKecamatan = ({ id, icon, setHover, kabupaten, statisticKec }) => {
  const router = useRouter();
  const [lombokBarat, setLombokBarat] = useState();
  const [selectIcon, setSelectIcon] = useState();
  if (id !== undefined) {
    useEffect(() => {
      axiosFetch("get", `user/kecamatan/${id}`)
        .then((res) => setLombokBarat(res))
        .catch((err) => console.log(err));
    }, [id]);
  }

  useEffect(() => {
    icon === "Jumlah Relawan" && setSelectIcon(relawan);
    icon === "Target Suara" && setSelectIcon(targetSuara);
    icon === "Suara Periode Lalu" && setSelectIcon(suaraPeriodeLalu);
    icon === "Jumlah TPS" && setSelectIcon(TPS);
    icon === "Jumlah DPT/DPS" && setSelectIcon(DPTDPS);
    icon === "Jumlah Simpatisan" && setSelectIcon(simpatisan);
    icon === "Logistik" && setSelectIcon(logistik);
    icon === "Program" && setSelectIcon(program);
    icon === "Jaringan" && setSelectIcon(JaringanIconSvg);
    icon === undefined && setSelectIcon();
  }, [icon]);

  const hoverhandler = (nama) => {
    setHover(nama);
  };

  return (
    <>
      {/* lombok barat */}
      {kabupaten === "5201" && (
        <>
          {/* kab lombok barat */}
          <div className="text-[#374151]">
            <div className="fixed left-[750px] flex gap-2 mt-2 border-2 text-[#374151] py-2 px-4 rounded-full">
              <p>{icon !== undefined ? `${icon}:` : "Peta Kekuatan:"}</p> <p className="font-semibold">Kab. Lombok Barat</p>
            </div>
            {/* Batu Layar */}
            <div
              onClick={
                icon === undefined
                  ? () =>
                      router.push({
                        pathname: "./DetailKelurahan",
                        query: { id_kabupaten: "5201", id_kecamatan: "5201061" },
                      })
                  : () => {
                      let path = "Dashboard";
                      let query = {};
                      const idKabupaten = "5201";
                      const idKecamatan = "5201061";

                      switch (icon) {
                        case "Target Suara":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Suara Periode Lalu":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah TPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah DPT/DPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah Relawan":
                          path = "../Admin";
                          query = {
                            component: "Relawan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Jumlah Simpatisan":
                          path = "../Admin";
                          query = {
                            component: "Simpatisan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Logistik":
                          path = "../Admin";
                          query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                          break;
                        case "Program":
                          path = "../Admin";
                          query = {
                            component: "/program",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };

                          break;
                        default:
                          break;
                      }
                      router.push({
                        pathname: path,
                        query: query,
                      });
                    }
              }
              onMouseEnter={() => hoverhandler("Batu Layar")}
              onMouseLeave={() => hoverhandler()}
              className="fixed top-[60px] left-[700px]"
            >
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && (
                    <p className="text-[#FF5001] font-bold text-[26px]">
                      {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[6]?.target_suara?.toLocaleString()}
                      {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[6]?.suara_periode_lalu?.toLocaleString()}
                      {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_tps?.toLocaleString()}
                      {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_dpt_dps?.toLocaleString()}
                      {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_relawans?.toLocaleString()}
                      {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_simpatisans?.toLocaleString()}
                      {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_logistik?.toLocaleString()}
                      {icon === "Program" && statisticKec?.length !== undefined && statisticKec[6]?.program?.toLocaleString()}
                    </p>
                  )}
                  <p className="font-medium">Kec. Batu Layar</p>
                </div>
              </div>
            </div>
            {/* Gunung Sari */}
            <div
              onClick={
                icon === undefined
                  ? () =>
                      router.push({
                        pathname: "./DetailKelurahan",
                        query: { id_kabupaten: "5201", id_kecamatan: "5201060" },
                      })
                  : () => {
                      let path = "Dashboard";
                      let query = {};
                      const idKabupaten = "5201";
                      const idKecamatan = "5201060";

                      switch (icon) {
                        case "Target Suara":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Suara Periode Lalu":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah TPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah DPT/DPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah Relawan":
                          path = "../Admin";
                          query = {
                            component: "Relawan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Jumlah Simpatisan":
                          path = "../Admin";
                          query = {
                            component: "Simpatisan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Logistik":
                          path = "../Admin";
                          query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                          break;
                        case "Program":
                          path = "../Admin";
                          query = {
                            component: "/program",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };

                          break;
                        default:
                          break;
                      }
                      router.push({
                        pathname: path,
                        query: query,
                      });
                    }
              }
              onMouseEnter={() => hoverhandler("Gunung Sari")}
              onMouseLeave={() => hoverhandler()}
              className="fixed top-[65px] left-[880px]"
            >
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && (
                    <p className="text-[#FF5001] font-bold text-[26px]">
                      {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[4]?.target_suara?.toLocaleString()}
                      {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[4]?.suara_periode_lalu?.toLocaleString()}
                      {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_tps?.toLocaleString()}
                      {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_dpt_dps?.toLocaleString()}
                      {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_relawans?.toLocaleString()}
                      {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_simpatisans?.toLocaleString()}
                      {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_logistik?.toLocaleString()}
                      {icon === "Program" && statisticKec?.length !== undefined && statisticKec[4]?.program?.toLocaleString()}
                    </p>
                  )}
                  <p className="font-medium">Kec. Gunung Sari</p>
                </div>
              </div>
            </div>
            {/* Lingsar */}
            <div
              onClick={
                icon === undefined
                  ? () =>
                      router.push({
                        pathname: "./DetailKelurahan",
                        query: { id_kabupaten: "5201", id_kecamatan: "5201051" },
                      })
                  : () => {
                      let path = "Dashboard";
                      let query = {};
                      const idKabupaten = "5201";
                      const idKecamatan = "5201051";

                      switch (icon) {
                        case "Target Suara":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Suara Periode Lalu":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah TPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah DPT/DPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah Relawan":
                          path = "../Admin";
                          query = {
                            component: "Relawan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Jumlah Simpatisan":
                          path = "../Admin";
                          query = {
                            component: "Simpatisan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Logistik":
                          path = "../Admin";
                          query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                          break;
                        case "Program":
                          path = "../Admin";
                          query = {
                            component: "/program",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };

                          break;
                        default:
                          break;
                      }
                      router.push({
                        pathname: path,
                        query: query,
                      });
                    }
              }
              onMouseEnter={() => hoverhandler("Lingsar")}
              onMouseLeave={() => hoverhandler()}
              className="fixed top-[150px] left-[940px]"
            >
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && (
                    <p className="text-[#FF5001] font-bold text-[26px]">
                      {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[7]?.target_suara?.toLocaleString()}
                      {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[7]?.suara_periode_lalu?.toLocaleString()}
                      {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_tps?.toLocaleString()}
                      {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_dpt_dps?.toLocaleString()}
                      {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_relawans?.toLocaleString()}
                      {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_simpatisans?.toLocaleString()}
                      {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_logistik?.toLocaleString()}
                      {icon === "Program" && statisticKec?.length !== undefined && statisticKec[7]?.program?.toLocaleString()}
                    </p>
                  )}
                  <p className="font-medium">Kec. Lingsar</p>
                </div>
              </div>
            </div>
            {/* Narmada */}
            <div
              onClick={
                icon === undefined
                  ? () =>
                      router.push({
                        pathname: "./DetailKelurahan",
                        query: { id_kabupaten: "5201", id_kecamatan: "5201050" },
                      })
                  : () => {
                      let path = "Dashboard";
                      let query = {};
                      const idKabupaten = "5201";
                      const idKecamatan = "5201050";

                      switch (icon) {
                        case "Target Suara":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Suara Periode Lalu":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah TPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah DPT/DPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah Relawan":
                          path = "../Admin";
                          query = {
                            component: "Relawan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Jumlah Simpatisan":
                          path = "../Admin";
                          query = {
                            component: "Simpatisan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Logistik":
                          path = "../Admin";
                          query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                          break;
                        case "Program":
                          path = "../Admin";
                          query = {
                            component: "/program",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };

                          break;
                        default:
                          break;
                      }
                      router.push({
                        pathname: path,
                        query: query,
                      });
                    }
              }
              onMouseEnter={() => hoverhandler("Narmada")}
              onMouseLeave={() => hoverhandler()}
              className="fixed top-[150px] left-[1100px]"
            >
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && (
                    <p className="text-[#FF5001] font-bold text-[26px]">
                      {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[8]?.target_suara?.toLocaleString()}
                      {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[8]?.suara_periode_lalu?.toLocaleString()}
                      {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_tps?.toLocaleString()}
                      {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_dpt_dps?.toLocaleString()}
                      {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_relawans?.toLocaleString()}
                      {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_simpatisans?.toLocaleString()}
                      {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_logistik?.toLocaleString()}
                      {icon === "Program" && statisticKec?.length !== undefined && statisticKec[8]?.program?.toLocaleString()}
                    </p>
                  )}
                  <p className="font-medium">Kec. Narmada</p>
                </div>
              </div>
            </div>
            {/* Labu Api */}
            <div
              onClick={
                icon === undefined
                  ? () =>
                      router.push({
                        pathname: "./DetailKelurahan",
                        query: { id_kabupaten: "5201", id_kecamatan: "5201030" },
                      })
                  : () => {
                      let path = "Dashboard";
                      let query = {};
                      const idKabupaten = "5201";
                      const idKecamatan = "5201030";

                      switch (icon) {
                        case "Target Suara":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Suara Periode Lalu":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah TPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah DPT/DPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah Relawan":
                          path = "../Admin";
                          query = {
                            component: "Relawan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Jumlah Simpatisan":
                          path = "../Admin";
                          query = {
                            component: "Simpatisan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Logistik":
                          path = "../Admin";
                          query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                          break;
                        case "Program":
                          path = "../Admin";
                          query = {
                            component: "/program",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };

                          break;
                        default:
                          break;
                      }
                      router.push({
                        pathname: path,
                        query: query,
                      });
                    }
              }
              onMouseEnter={() => hoverhandler("Labu Api")}
              onMouseLeave={() => hoverhandler()}
              className="fixed top-[250px] left-[780px]"
            >
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && (
                    <p className="text-[#FF5001] font-bold text-[26px]">
                      {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[2]?.target_suara?.toLocaleString()}
                      {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[2]?.suara_periode_lalu?.toLocaleString()}
                      {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_tps?.toLocaleString()}
                      {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_dpt_dps?.toLocaleString()}
                      {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_relawans?.toLocaleString()}
                      {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_simpatisans?.toLocaleString()}
                      {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_logistik?.toLocaleString()}
                      {icon === "Program" && statisticKec?.length !== undefined && statisticKec[2]?.program?.toLocaleString()}
                    </p>
                  )}
                  <p className="font-medium">Kec. Labu Api</p>
                </div>
              </div>
            </div>
            {/* Kediri */}
            <div
              onClick={
                icon === undefined
                  ? () =>
                      router.push({
                        pathname: "./DetailKelurahan",
                        query: { id_kabupaten: "5201", id_kecamatan: "5201040" },
                      })
                  : () => {
                      let path = "Dashboard";
                      let query = {};
                      const idKabupaten = "5201";
                      const idKecamatan = "5201040";

                      switch (icon) {
                        case "Target Suara":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Suara Periode Lalu":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah TPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah DPT/DPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah Relawan":
                          path = "../Admin";
                          query = {
                            component: "Relawan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Jumlah Simpatisan":
                          path = "../Admin";
                          query = {
                            component: "Simpatisan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Logistik":
                          path = "../Admin";
                          query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                          break;
                        case "Program":
                          path = "../Admin";
                          query = {
                            component: "/program",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };

                          break;
                        default:
                          break;
                      }
                      router.push({
                        pathname: path,
                        query: query,
                      });
                    }
              }
              onMouseEnter={() => hoverhandler("Kediri")}
              onMouseLeave={() => hoverhandler()}
              className="fixed top-[260px] left-[960px]"
            >
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && (
                    <p className="text-[#FF5001] font-bold text-[26px]">
                      {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[1]?.target_suara?.toLocaleString()}
                      {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[1]?.suara_periode_lalu?.toLocaleString()}
                      {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_tps?.toLocaleString()}
                      {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_dpt_dps?.toLocaleString()}
                      {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_relawans?.toLocaleString()}
                      {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_simpatisans?.toLocaleString()}
                      {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_logistik?.toLocaleString()}
                      {icon === "Program" && statisticKec?.length !== undefined && statisticKec[1]?.program?.toLocaleString()}
                    </p>
                  )}
                  <p className="font-medium">Kec. Kediri</p>
                </div>
              </div>
            </div>
            {/* Kuripan */}
            <div
              onClick={
                icon === undefined
                  ? () =>
                      router.push({
                        pathname: "./DetailKelurahan",
                        query: { id_kabupaten: "5201", id_kecamatan: "5201041" },
                      })
                  : () => {
                      let path = "Dashboard";
                      let query = {};
                      const idKabupaten = "5201";
                      const idKecamatan = "5201041";

                      switch (icon) {
                        case "Target Suara":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Suara Periode Lalu":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah TPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah DPT/DPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah Relawan":
                          path = "../Admin";
                          query = {
                            component: "Relawan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Jumlah Simpatisan":
                          path = "../Admin";
                          query = {
                            component: "Simpatisan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Logistik":
                          path = "../Admin";
                          query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                          break;
                        case "Program":
                          path = "../Admin";
                          query = {
                            component: "/program",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };

                          break;
                        default:
                          break;
                      }
                      router.push({
                        pathname: path,
                        query: query,
                      });
                    }
              }
              onMouseEnter={() => hoverhandler("Kuripan")}
              onMouseLeave={() => hoverhandler()}
              className="fixed top-[350px] left-[980px]"
            >
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && (
                    <p className="text-[#FF5001] font-bold text-[26px]">
                      {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[5]?.target_suara?.toLocaleString()}
                      {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[5]?.suara_periode_lalu?.toLocaleString()}
                      {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_tps?.toLocaleString()}
                      {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_dpt_dps?.toLocaleString()}
                      {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_relawans?.toLocaleString()}
                      {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_simpatisans?.toLocaleString()}
                      {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_logistik?.toLocaleString()}
                      {icon === "Program" && statisticKec?.length !== undefined && statisticKec[5]?.program?.toLocaleString()}
                    </p>
                  )}
                  <p className="font-medium">Kec. Kuripan</p>
                </div>
              </div>
            </div>
            {/* Gerung */}
            <div
              onClick={
                icon === undefined
                  ? () =>
                      router.push({
                        pathname: "./DetailKelurahan",
                        query: { id_kabupaten: "5201", id_kecamatan: "5201020" },
                      })
                  : () => {
                      let path = "Dashboard";
                      let query = {};
                      const idKabupaten = "5201";
                      const idKecamatan = "5201020";

                      switch (icon) {
                        case "Target Suara":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Suara Periode Lalu":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah TPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah DPT/DPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah Relawan":
                          path = "../Admin";
                          query = {
                            component: "Relawan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Jumlah Simpatisan":
                          path = "../Admin";
                          query = {
                            component: "Simpatisan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Logistik":
                          path = "../Admin";
                          query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                          break;
                        case "Program":
                          path = "../Admin";
                          query = {
                            component: "/program",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };

                          break;
                        default:
                          break;
                      }
                      router.push({
                        pathname: path,
                        query: query,
                      });
                    }
              }
              onMouseEnter={() => hoverhandler("Gerung")}
              onMouseLeave={() => hoverhandler()}
              className="fixed top-[340px] left-[780px]"
            >
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && (
                    <p className="text-[#FF5001] font-bold text-[26px]">
                      {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[9]?.target_suara?.toLocaleString()}
                      {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[9]?.suara_periode_lalu?.toLocaleString()}
                      {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_tps?.toLocaleString()}
                      {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_dpt_dps?.toLocaleString()}
                      {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_relawans?.toLocaleString()}
                      {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_simpatisans?.toLocaleString()}
                      {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_logistik?.toLocaleString()}
                      {icon === "Program" && statisticKec?.length !== undefined && statisticKec[9]?.program?.toLocaleString()}
                    </p>
                  )}
                  <p className="font-medium">Kec. Gerung</p>
                </div>
              </div>
            </div>
            {/* Lembar */}
            <div
              onClick={
                icon === undefined
                  ? () =>
                      router.push({
                        pathname: "./DetailKelurahan",
                        query: { id_kabupaten: "5201", id_kecamatan: "5201011" },
                      })
                  : () => {
                      let path = "Dashboard";
                      let query = {};
                      const idKabupaten = "5201";
                      const idKecamatan = "5201011";

                      switch (icon) {
                        case "Target Suara":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Suara Periode Lalu":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah TPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah DPT/DPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah Relawan":
                          path = "../Admin";
                          query = {
                            component: "Relawan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Jumlah Simpatisan":
                          path = "../Admin";
                          query = {
                            component: "Simpatisan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Logistik":
                          path = "../Admin";
                          query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                          break;
                        case "Program":
                          path = "../Admin";
                          query = {
                            component: "/program",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };

                          break;
                        default:
                          break;
                      }
                      router.push({
                        pathname: path,
                        query: query,
                      });
                    }
              }
              onMouseEnter={() => hoverhandler("Lembar")}
              onMouseLeave={() => hoverhandler()}
              className="fixed top-[440px] left-[900px]"
            >
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && (
                    <p className="text-[#FF5001] font-bold text-[26px]">
                      {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[3]?.target_suara?.toLocaleString()}
                      {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[3]?.suara_periode_lalu?.toLocaleString()}
                      {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_tps?.toLocaleString()}
                      {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_dpt_dps?.toLocaleString()}
                      {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_relawans?.toLocaleString()}
                      {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_simpatisans?.toLocaleString()}
                      {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_logistik?.toLocaleString()}
                      {icon === "Program" && statisticKec?.length !== undefined && statisticKec[3]?.program?.toLocaleString()}
                    </p>
                  )}
                  <p className="font-medium">Kec. Lembar</p>
                </div>
              </div>
            </div>
            {/* Sekotong */}
            <div
              onClick={
                icon === undefined
                  ? () =>
                      router.push({
                        pathname: "./DetailKelurahan",
                        query: { id_kabupaten: "5201", id_kecamatan: "5201010" },
                      })
                  : () => {
                      let path = "Dashboard";
                      let query = {};
                      const idKabupaten = "5201";
                      const idKecamatan = "5201010";

                      switch (icon) {
                        case "Target Suara":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Suara Periode Lalu":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah TPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah DPT/DPS":
                          path = "../DetailTargetDesa";
                          query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                          break;
                        case "Jumlah Relawan":
                          path = "../Admin";
                          query = {
                            component: "Relawan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Jumlah Simpatisan":
                          path = "../Admin";
                          query = {
                            component: "Simpatisan",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };
                          break;
                        case "Logistik":
                          path = "../Admin";
                          query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                          break;
                        case "Program":
                          path = "../Admin";
                          query = {
                            component: "/program",
                            id_kabupaten: idKabupaten,
                            id_kecamatan: idKecamatan,
                          };

                          break;
                        default:
                          break;
                      }
                      router.push({
                        pathname: path,
                        query: query,
                      });
                    }
              }
              onMouseEnter={() => hoverhandler("Sekotong")}
              onMouseLeave={() => hoverhandler()}
              className="fixed top-[460px] left-[600px]"
            >
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && (
                    <p className="text-[#FF5001] font-bold text-[26px]">
                      {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[0]?.target_suara?.toLocaleString()}
                      {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[0]?.suara_periode_lalu?.toLocaleString()}
                      {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_tps?.toLocaleString()}
                      {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_dpt_dps?.toLocaleString()}
                      {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_relawans?.toLocaleString()}
                      {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_simpatisans?.toLocaleString()}
                      {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_logistik?.toLocaleString()}
                      {icon === "Program" && statisticKec?.length !== undefined && statisticKec[0]?.program?.toLocaleString()}
                    </p>
                  )}
                  <p className="font-medium">Kec. Sekotong</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* lombok utara */}
      {kabupaten === "5208" && (
        <div className="text-[#374151]">
          <div className="fixed left-[750px] flex gap-2 mt-2 border-2 text-[#374151] py-2 px-4 rounded-full">
            <p>{icon !== undefined ? `${icon}:` : "Peta Kekuatan:"}</p> <p className="font-semibold">Kab. Lombok Utara</p>
          </div>
          {/* Pemenang */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5208", id_kecamatan: "5208010" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5208";
                    const idKecamatan = "5208010";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Pemenang")}
            onMouseLeave={() => hoverhandler()}
            className="fixed top-[400px] left-[580px]"
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[26px]">
                    {icon === "Target Suara" && statisticKec.length !== undefined && statisticKec[3]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec.length !== undefined && statisticKec[3].suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec.length !== undefined && statisticKec[3].jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec.length !== undefined && statisticKec[3].jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec.length !== undefined && statisticKec[3].jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec.length !== undefined && statisticKec[3].jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec.length !== undefined && statisticKec[3].jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec.length !== undefined && statisticKec[3].program?.toLocaleString()}
                  </p>
                )}
                <p className="font-medium">Kec. Pemenang</p>
              </div>
            </div>
          </div>
          {/* Tanjung */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5208", id_kecamatan: "5208020" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5208";
                    const idKecamatan = "5208020";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Tanjung")}
            onMouseLeave={() => hoverhandler()}
            className="fixed top-[420px] left-[760px]"
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[26px]">
                    {icon === "Target Suara" && statisticKec.length !== undefined && statisticKec[1]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec.length !== undefined && statisticKec[1].suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec.length !== undefined && statisticKec[1].jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec.length !== undefined && statisticKec[1].jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec.length !== undefined && statisticKec[1].jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec.length !== undefined && statisticKec[1].jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec.length !== undefined && statisticKec[1].jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec.length !== undefined && statisticKec[1].program?.toLocaleString()}
                  </p>
                )}
                <p className="font-medium">Kec. Tanjung</p>
              </div>
            </div>
          </div>
          {/* Gangga */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5208", id_kecamatan: "5208030" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5208";
                    const idKecamatan = "5208030";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Gangga")}
            onMouseLeave={() => hoverhandler()}
            className="fixed top-[320px] left-[860px]"
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[26px]">
                    {icon === "Target Suara" && statisticKec.length !== undefined && statisticKec[4]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec.length !== undefined && statisticKec[4].suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec.length !== undefined && statisticKec[4].jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec.length !== undefined && statisticKec[4].jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec.length !== undefined && statisticKec[4].jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec.length !== undefined && statisticKec[4].jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec.length !== undefined && statisticKec[4].jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec.length !== undefined && statisticKec[4].program?.toLocaleString()}
                  </p>
                )}
                <p className="font-medium">Kec. Gangga</p>
              </div>
            </div>
          </div>
          {/* Kayangan */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5208", id_kecamatan: "5208040" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5208";
                    const idKecamatan = "5208040";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Kayangan")}
            onMouseLeave={() => hoverhandler()}
            className="fixed top-[220px] left-[960px]"
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[26px]">
                    {icon === "Target Suara" && statisticKec.length !== undefined && statisticKec[2]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec.length !== undefined && statisticKec[2].suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec.length !== undefined && statisticKec[2].jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec.length !== undefined && statisticKec[2].jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec.length !== undefined && statisticKec[2].jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec.length !== undefined && statisticKec[2].jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec.length !== undefined && statisticKec[2].jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec.length !== undefined && statisticKec[2].program?.toLocaleString()}
                  </p>
                )}
                <p className="font-medium">Kec. Kayangan</p>
              </div>
            </div>
          </div>
          {/* Bayan */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5208", id_kecamatan: "5208050" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5208";
                    const idKecamatan = "5208050";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Bayan")}
            onMouseLeave={() => hoverhandler()}
            className="fixed top-[320px] left-[1100px]"
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[26px]">
                    {icon === "Target Suara" && statisticKec.length !== undefined && statisticKec[0]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec.length !== undefined && statisticKec[0].suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec.length !== undefined && statisticKec[0].jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec.length !== undefined && statisticKec[0].jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec.length !== undefined && statisticKec[0].jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec.length !== undefined && statisticKec[0].jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec.length !== undefined && statisticKec[0].jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec.length !== undefined && statisticKec[0].program?.toLocaleString()}
                  </p>
                )}
                <p className="font-medium">Kec. Bayan</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* lombok tengah */}
      {kabupaten === "5202" && (
        <div className="text-[#374151] fixed">
          <div className="fixed bg-white left-[750px] flex gap-2 mt-2 border-2 text-[#374151] py-2 px-4 rounded-full">
            <p>{icon !== undefined ? `${icon}:` : "Peta Kekuatan:"}</p> <p className="font-semibold">Kab. Lombok Tengah</p>
          </div>
          {/* Batukliang Utara */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202091" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202091";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Batukliang Utara")}
            onMouseLeave={() => hoverhandler()}
            className="fixed top-[80px] left-[880px]"
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[5]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[5]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[5]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Batukliang Utara</p> : <p className="font-medium text-[14px]">Batukliang Utara</p>}
              </div>
            </div>
          </div>
          {/* Kopang */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202050" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202050";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Kopang")}
            onMouseLeave={() => hoverhandler()}
            className="fixed top-[250px] left-[1030px]"
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[1]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[1]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[1]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Kopang</p> : <p className="font-medium text-[14px]">Kopang</p>}
              </div>
            </div>
          </div>
          {/* Batukliang */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202090" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202090";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Batukliang")}
            onMouseLeave={() => hoverhandler()}
            className="fixed top-[190px] left-[850px] bg-white shadow-md border-[#FFCFB9] border rounded-md p-2"
          >
            <div className={`cursor-pointer items-center flex ${icon === undefined && "justify-center"} `}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[11]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[11]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[11]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[11]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[11]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[11]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[11]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[11]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Batukliang</p> : <p className="font-medium text-[14px]">Batukliang</p>}
              </div>
            </div>
          </div>
          {/* Pringgarata */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202080" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202080";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Pringgarata")}
            onMouseLeave={() => hoverhandler()}
            className={` fixed top-[220px] ${icon === undefined ? "left-[700px]" : "left-[660px]"}  bg-white shadow-md border-[#FFCFB9] border rounded-md p-2`}
          >
            <div className={`cursor-pointer items-center flex ${icon === undefined && "justify-center"} `}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[10]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[10]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[10]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[10]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[10]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[10]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[10]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[10]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Pringgarata</p> : <p className="font-medium text-[16px]">Pringgarata</p>}
              </div>
            </div>
          </div>
          {/* Praya */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202060" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202060";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Praya")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[270px] left-[900px]" : "top-[280px] left-[860px]"} `}
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[8]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[8]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[8]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Praya</p> : <p className="font-medium text-[16px]">Praya</p>}
              </div>
            </div>
          </div>
          {/* Jonggat */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202070" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202070";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Jonggat")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[280px] left-[750px]" : "top-[310px] left-[700px]"} `}
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[6]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[6]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[6]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Jonggat</p> : <p className="font-medium text-[16px]">Jonggat</p>}
              </div>
            </div>
          </div>
          {/* Janapria */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202040" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202040";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Janapria")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[320px] left-[1050px]" : "top-[340px] left-[1050px]"} `}
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[7]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[7]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[7]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Janapria</p> : <p className="font-medium text-[16px]">Janapria</p>}
              </div>
            </div>
          </div>
          {/* Praya Timur */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202030" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202030";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Praya Timur")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[420px] left-[1050px]" : "top-[430px] left-[1050px]"} `}
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[0]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[0]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[0]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Praya Timur</p> : <p className="font-medium text-[16px]">Praya Timur</p>}
              </div>
            </div>
          </div>
          {/* Praya Tengah */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202061" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202061";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Praya Tengah")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[370px] left-[960px]" : "top-[370px] left-[860px]"} `}
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[3]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[3]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[3]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Praya Tengah</p> : <p className="font-medium text-[16px]">Praya Tengah</p>}
              </div>
            </div>
          </div>
          {/* Pujut */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202020" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202020";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Pujut")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[470px] left-[900px]" : "top-[470px] left-[890px]"} `}
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[2]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[2]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[2]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Pujut</p> : <p className="font-medium text-[16px]">Pujut</p>}
              </div>
            </div>
          </div>
          {/* Praya Barat */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202010" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202010";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Praya Barat")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[480px] left-[700px]" : "top-[500px] left-[700px]"} `}
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[9]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[9]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[9]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Praya Barat</p> : <p className="font-medium text-[16px]">Praya Barat</p>}
              </div>
            </div>
          </div>
          {/* Praya Barat Daya */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5202", id_kecamatan: "5202011" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5202";
                    const idKecamatan = "5202011";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Praya Barat Daya")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[370px] left-[670px]" : "top-[400px] left-[640px]"} `}
          >
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[4]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[4]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[4]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium">Kec. Praya Barat Daya</p> : <p className="font-medium text-[16px]">Praya Barat Daya</p>}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* lombok timur */}
      {kabupaten === "5203" && (
        <div className="text-[#374151] fixed">
          <div className="fixed bg-white left-[750px] flex gap-2 mt-2 border-2 text-[#374151] py-2 px-4 rounded-full">
            <p>{icon !== undefined ? `${icon}:` : "Peta Kekuatan:"}</p> <p className="font-semibold">Kab. Lombok Timur</p>
          </div>
          {/* Sambelia */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203100" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203100";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Sambelia")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[80px] left-[1000px]" : "top-[65px] left-[1040px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[9]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[9]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[9]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[9]?.program?.toLocaleString()?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Sambelia</p> : <p className="font-medium text-[12px]">Sambelia</p>}
              </div>
            </div>
          </div>
          {/* Suralaga */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203061" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203061";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Suralaga")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[320px] left-[920px]" : "top-[335px] left-[920px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[16]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[16]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[16]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[16]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[16]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[16]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[16]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[16]?.program?.toLocaleString()?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Suralaga</p> : <p className="font-medium text-[12px]">Suralaga</p>}
              </div>
            </div>
          </div>
          {/* Sembalun */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203092" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203092";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Sembalun")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[80px] left-[780px]" : "top-[65px] left-[730px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[2]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[2]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[2]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[2]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Sembalun</p> : <p className="font-medium text-[12px]">Sembalun</p>}
              </div>
            </div>
          </div>
          {/* Pringgabaya */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203080" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203080";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Pringgabaya")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[160px] left-[1000px]" : "top-[155px] left-[1040px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[0]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[0]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[0]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[0]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Pringgabaya</p> : <p className="font-medium text-[12px]">Pringgabaya</p>}
              </div>
            </div>
          </div>
          {/* Suela */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203081" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203081";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Suela")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[160px] left-[900px]" : "top-[130px] left-[890px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[19]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[19]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[19]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[19]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[19]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[19]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[19]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[19]?.program?.toLocaleString()?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Suela</p> : <p className="font-medium text-[12px]">Suela</p>}
              </div>
            </div>
          </div>
          {/* Wanasaba */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203091" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203091";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Wanasaba")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[220px] left-[910px]" : "top-[200px] left-[900px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[7]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[7]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[7]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[7]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Wanasaba</p> : <p className="font-medium text-[12px]">Wanasaba</p>}
              </div>
            </div>
          </div>
          {/* Aikmel */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203090" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203090";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Aikmel")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[180px] left-[790px]" : "top-[150px] left-[780px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[6]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[6]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[6]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[6]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Aikmel</p> : <p className="font-medium text-[12px]">Aikmel</p>}
              </div>
            </div>
          </div>
          {/* Pringgasela */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203051" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203051";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Pringgasela")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[230px] left-[730px]" : "top-[205px] left-[720px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[4]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[4]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[4]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[4]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Pringgasela</p> : <p className="font-medium text-[12px]">Pringgasela</p>}
              </div>
            </div>
          </div>
          {/* Sikur */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203040" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203040";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Sikur")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[280px] left-[740px]" : "top-[275px] left-[710px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[11]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[11]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[11]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[11]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[11]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[11]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[11]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[11]?.program?.toLocaleString()?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Sikur</p> : <p className="font-medium text-[12px]">Sikur</p>}
              </div>
            </div>
          </div>
          {/* Montong Gading */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203031" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203031";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Montong Gading")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[325px] left-[630px]" : "top-[345px] left-[620px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[5]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[5]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[5]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[5]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Montong Gading</p> : <p className="font-medium text-[12px]">Montong Gading</p>}
              </div>
            </div>
          </div>
          {/* Lenek */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203019" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203019";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Lenek")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[270px] left-[890px]" : "top-[265px] left-[910px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[20]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[20]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[20]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[20]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[20]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[20]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[20]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[20]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Lenek</p> : <p className="font-medium text-[12px]">Lenek</p>}
              </div>
            </div>
          </div>
          {/* Masbagik */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203050" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203050";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Masbagik")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[300px] left-[820px]" : "top-[275px] left-[800px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[14]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[14]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[14]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[14]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[14]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[14]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[14]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[14]?.program?.toLocaleString()?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Masbagik</p> : <p className="font-medium text-[12px]">Masbagik</p>}
              </div>
            </div>
          </div>
          {/* Terara */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203030" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203030";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Terara")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[370px] left-[690px]" : "top-[400px] left-[700px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[13]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[13]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[13]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[13]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[13]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[13]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[13]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[13]?.program?.toLocaleString()?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Terara</p> : <p className="font-medium text-[12px]">Terara</p>}
              </div>
            </div>
          </div>
          {/* Labuhan Haji */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203071" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203071";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Labuhan Haji")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[370px] left-[970px]" : "top-[390px] left-[960px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[18]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[18]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[18]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[18]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[18]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[18]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[18]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[18]?.program?.toLocaleString()?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Labuhan Haji</p> : <p className="font-medium text-[12px]">Labuhan Haji</p>}
              </div>
            </div>
          </div>
          {/* Selong */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203070" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203070";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Selong")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[370px] left-[880px]" : "top-[390px] left-[870px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[17]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[17]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[17]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[17]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[17]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[17]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[17]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[17]?.program?.toLocaleString()?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Selong</p> : <p className="font-medium text-[12px]">Selong</p>}
              </div>
            </div>
          </div>
          {/* Sukamulia */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203060" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203060";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Sukamulia")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[340px] left-[800px]" : "top-[330px] left-[800px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[15]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[15]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[15]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[15]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[15]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[15]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[15]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[15]?.program?.toLocaleString()?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Sukamulia</p> : <p className="font-medium text-[12px]">Sukamulia</p>}
              </div>
            </div>
          </div>
          {/* Sakra */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203020" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203020";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Sakra")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[400px] left-[750px]" : "top-[400px] left-[790px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[3]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[3]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[3]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[3]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Sakra</p> : <p className="font-medium text-[12px]">Sakra</p>}
              </div>
            </div>
          </div>
          {/* Sakra Timur*/}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203022" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203022";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Sakra Timur")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[455px] left-[890px]" : "top-[455px] left-[900px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[12]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[12]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[12]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[12]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[12]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[12]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[12]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[12]?.program?.toLocaleString()?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Sakra Timur</p> : <p className="font-medium text-[12px]">Sakra Timur</p>}
              </div>
            </div>
          </div>
          {/* Sakra Barat */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203021" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203021";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Sakra Barat")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[440px] left-[730px]" : "top-[460px] left-[690px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[1]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[1]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[1]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[1]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Sakra Barat</p> : <p className="font-medium text-[12px]">Sakra Barat</p>}
              </div>
            </div>
          </div>
          {/* Keruak */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203010" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203010";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Keruak")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[485px] left-[780px]" : "top-[490px] left-[810px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[8]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[8]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[8]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[8]?.program?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Keruak</p> : <p className="font-medium text-[12px]">Keruak</p>}
              </div>
            </div>
          </div>
          {/* Jerowaru */}
          <div
            onClick={
              icon === undefined
                ? () =>
                    router.push({
                      pathname: "./DetailKelurahan",
                      query: { id_kabupaten: "5203", id_kecamatan: "5203011" },
                    })
                : () => {
                    let path = "Dashboard";
                    let query = {};
                    const idKabupaten = "5203";
                    const idKecamatan = "5203011";

                    switch (icon) {
                      case "Target Suara":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Suara Periode Lalu":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah TPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah DPT/DPS":
                        path = "../DetailTargetDesa";
                        query = { id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };
                        break;
                      case "Jumlah Relawan":
                        path = "../Admin";
                        query = {
                          component: "Relawan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Jumlah Simpatisan":
                        path = "../Admin";
                        query = {
                          component: "Simpatisan",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };
                        break;
                      case "Logistik":
                        path = "../Admin";
                        query = { component: "/logistik", id_kabupaten: idKabupaten, id_kecamatan: idKecamatan };

                        break;
                      case "Program":
                        path = "../Admin";
                        query = {
                          component: "/program",
                          id_kabupaten: idKabupaten,
                          id_kecamatan: idKecamatan,
                        };

                        break;
                      default:
                        break;
                    }
                    router.push({
                      pathname: path,
                      query: query,
                    });
                  }
            }
            onMouseEnter={() => hoverhandler("Jerowaru")}
            onMouseLeave={() => hoverhandler()}
            className={`fixed ${icon === undefined ? "top-[550px] left-[790px]" : "top-[565px] left-[890px]"} `}
          >
            <div className={`border py-1 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3 h-[16px] w-[18px]" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && (
                  <p className="text-[#FF5001] font-bold text-[16px]">
                    {" "}
                    {icon === "Target Suara" && statisticKec?.length !== undefined && statisticKec[10]?.target_suara?.toLocaleString()}
                    {icon === "Suara Periode Lalu" && statisticKec?.length !== undefined && statisticKec[10]?.suara_periode_lalu?.toLocaleString()}
                    {icon === "Jumlah TPS" && statisticKec?.length !== undefined && statisticKec[10]?.jumlah_tps?.toLocaleString()}
                    {icon === "Jumlah DPT/DPS" && statisticKec?.length !== undefined && statisticKec[10]?.jumlah_dpt_dps?.toLocaleString()}
                    {icon === "Jumlah Relawan" && statisticKec?.length !== undefined && statisticKec[10]?.jumlah_relawans?.toLocaleString()}
                    {icon === "Jumlah Simpatisan" && statisticKec?.length !== undefined && statisticKec[10]?.jumlah_simpatisans?.toLocaleString()}
                    {icon === "Logistik" && statisticKec?.length !== undefined && statisticKec[10]?.jumlah_logistik?.toLocaleString()}
                    {icon === "Program" && statisticKec?.length !== undefined && statisticKec[10]?.program?.toLocaleString()?.toLocaleString()}
                  </p>
                )}
                {icon === undefined ? <p className="font-medium text-[12px]">Kec. Jerowaru</p> : <p className="font-medium text-[12px]">Jerowaru</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListKecamatan;
