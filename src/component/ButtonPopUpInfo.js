import React, { useEffect, useState } from "react";
import { DPTDPSIcon, Logistic, ProgramIcon, RelawanIcon, SimpatisanIcon, SuaraPeriodeLalu, TargetSuara, TpsIcon } from "../utility/icon/icon";
import JumlahPenduduk from "./JumlahPenduduk";
import kotaIcon from "../utility/peta/kota_icon.png";
import relawan from "../utility/peta/relawan.png";
import logistik from "../utility/peta/logistik.png";
import simpatisan from "../utility/peta/simpatisan.png";
import program from "../utility/peta/program.png";
import targetSuara from "../utility/peta/target_suara.png";
import suaraPeriodeLalu from "../utility/peta/suara_periode_lalu.png";
import TPS from "../utility/peta/TPS.png";
import DPTDPS from "../utility/peta/DPT_DPS.png";
import useFetch from "../API/useFetch";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axiosFetch from "../API/axiosFetch";

const ButtonPopUpInfo = ({ type, data, setHover, targetKab, targetKec, programData, gantiIcon, statistic, statisticKec }) => {
  const router = useRouter();
  const [active, setActive] = useState();
  const [activeType, setActiveType] = useState();
  const [icon, setIcon] = useState(kotaIcon);
  const [total, setTotal] = useState();
  const getProgram = useFetch("get", "user/articles?page=1&type=program");
  const [detailTarget, setDetailTarget] = useState();
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);

  const handleButton = (button) => {
    active !== button ? setActive(button) : setActive();
    if (gantiIcon !== undefined) {
      active !== button ? gantiIcon(button) : gantiIcon();
    }
    setActiveType(button);
  };

  useEffect(() => {
    if (active === "Jumlah Relawan") {
      setIcon(relawan);
      setTotal("relawan");
    } else if (active === "Jumlah Simpatisan") {
      setIcon(simpatisan);
      setTotal("simpatisan");
    } else if (active === "Logistik") {
      setIcon(logistik);
      setTotal("logistik");
    } else if (active === "Program") {
      setIcon(program);
      setTotal("program");
    } else if (active === "Target Suara") {
      setIcon(targetSuara);
      setTotal("target");
    } else if (active === "Suara Periode Lalu") {
      setIcon(suaraPeriodeLalu);
      setTotal("suara periode lalu");
    } else if (active === "Jumlah TPS") {
      setIcon(TPS);
      setTotal("jumlah tps");
    } else if (active === "Jumlah DPT/DPS") {
      setIcon(DPTDPS);
      setTotal("jumlah dpt/dps");
    } else {
      setIcon(kotaIcon);
      setTotal();
    }
  }, [handleButton, targetKab, activeType]);

  const id_kabupaten = data?.toString();
  const [namaKecamatan, setNamaKecamatan] = useState();

  useEffect(() => {
    if (id_kabupaten === undefined) {
      console.log("loading");
    } else if (id_kabupaten !== undefined) {
      const kecamatan = axios
        .get(`https://api.sjpberkhidmat.id/user/kecamatan/5271`)
        .then((res) => setNamaKecamatan(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [id_kabupaten]);

  useEffect(() => {
    axiosFetch("get", "user/target/details?page=1&limit=1000&id_kabupaten=5271", {}, token)
      .then((res) => setDetailTarget(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  const DetailKecamatan = (id, nama) => {
    router.push({
      pathname: "/peta_kekuatan/DetailKecamatan",
      query: { kecamatan: id, nama: nama },
    });
    // console.log(res);
  };

  const detailKota = (nama) => {
    router.push({
      pathname: "/peta_kekuatan/DetailKota",
      query: { kota: nama },
    });
    // console.log(res);
  };

  if (detailTarget !== undefined) {
    const totalTarget = detailTarget
      .filter((data) => ["mataram"].includes(data.kecamatan.name.toLowerCase()))
      .reduce((accumulator, currentItem) => {
        return accumulator + currentItem.jumlah_simpatisans;
      }, 0);
    // console.log(detailTarget.filter((data) => ["mataram"].includes(data.kecamatan.name.toLowerCase())));
    // console.log(totalTarget);
  }

  console.log(statisticKec !== undefined && statisticKec);

  return (
    <>
      <div className="flex flex-col gap-2 mt-6">
        <span id="1" onClick={() => handleButton("Target Suara")}>
          <JumlahPenduduk
            active={active}
            title={"Target Suara"}
            icon={<TargetSuara />}
            total={
              (statistic?.length !== undefined && (statistic[0]?.target_suara + statistic[1]?.target_suara + statistic[2]?.target_suara + statistic[3]?.target_suara + statistic[4]?.target_suara).toLocaleString()) ||
              (data !== undefined &&
                statisticKec !== undefined &&
                statisticKec
                  ?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue?.target_suara;
                  }, 0)
                  .toLocaleString())
            }
            h={"55px"}
            w={"150px"}
            totalSize={"21px"}
            titleSize={"18px"}
          />
        </span>
        <span
          onClick={() => {
            handleButton("Suara Periode Lalu");
          }}
        >
          <JumlahPenduduk
            active={active}
            title={"Suara Periode Lalu"}
            icon={<SuaraPeriodeLalu />}
            total={
              (statistic?.length !== undefined &&
                (statistic[0]?.suara_periode_lalu + statistic[1]?.suara_periode_lalu + statistic[2]?.suara_periode_lalu + statistic[3]?.suara_periode_lalu + statistic[4]?.suara_periode_lalu).toLocaleString()) ||
              (data !== undefined &&
                statisticKec !== undefined &&
                statisticKec
                  ?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue?.suara_periode_lalu;
                  }, 0)
                  .toLocaleString())
            }
            h={"55px"}
            w={"150px"}
            totalSize={"21px"}
            titleSize={"18px"}
          />
        </span>
        <span onClick={() => handleButton("Jumlah TPS")}>
          <JumlahPenduduk
            active={active}
            title={"Jumlah TPS"}
            icon={<TpsIcon />}
            total={
              (statistic?.length !== undefined && (statistic[0]?.jumlah_tps + statistic[1]?.jumlah_tps + statistic[2]?.jumlah_tps + statistic[3]?.jumlah_tps + statistic[4]?.jumlah_tps).toLocaleString()) ||
              (data !== undefined &&
                statisticKec !== undefined &&
                statisticKec
                  ?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue?.jumlah_tps;
                  }, 0)
                  .toLocaleString())
            }
            h={"55px"}
            w={"150px"}
            totalSize={"21px"}
            titleSize={"18px"}
          />
        </span>
        <span onClick={() => handleButton("Jumlah DPT/DPS")}>
          <JumlahPenduduk
            active={active}
            title={"Jumlah DPT/DPS"}
            icon={<DPTDPSIcon />}
            total={
              (statistic?.length !== undefined && (statistic[0]?.jumlah_dpt_dps + statistic[1]?.jumlah_dpt_dps + statistic[2]?.jumlah_dpt_dps + statistic[3]?.jumlah_dpt_dps + statistic[4]?.jumlah_dpt_dps).toLocaleString()) ||
              (data !== undefined &&
                statisticKec !== undefined &&
                statisticKec
                  ?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue?.jumlah_dpt_dps;
                  }, 0)
                  .toLocaleString())
            }
            h={"55px"}
            w={"150px"}
            totalSize={"21px"}
            titleSize={"18px"}
          />
        </span>
        <span onClick={() => handleButton("Jumlah Relawan")}>
          <JumlahPenduduk
            active={active}
            title={"Jumlah Relawan"}
            icon={<RelawanIcon />}
            total={
              (statistic?.length !== undefined && (statistic[0]?.jumlah_relawans + statistic[1]?.jumlah_relawans + statistic[2]?.jumlah_relawans + statistic[3]?.jumlah_relawans + statistic[4]?.jumlah_relawans).toLocaleString()) ||
              (data !== undefined &&
                statisticKec !== undefined &&
                statisticKec
                  ?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue?.jumlah_relawans;
                  }, 0)
                  .toLocaleString())
            }
            h={"55px"}
            w={"150px"}
            totalSize={"21px"}
            titleSize={"18px"}
          />
        </span>
        <span onClick={() => handleButton("Jumlah Simpatisan")}>
          <JumlahPenduduk
            active={active}
            title={"Jumlah Simpatisan"}
            icon={<SimpatisanIcon />}
            total={
              (statistic?.length !== undefined &&
                (statistic[0]?.jumlah_simpatisans + statistic[1]?.jumlah_simpatisans + statistic[2]?.jumlah_simpatisans + statistic[3]?.jumlah_simpatisans + statistic[4]?.jumlah_simpatisans).toLocaleString()) ||
              (data !== undefined &&
                statisticKec !== undefined &&
                statisticKec
                  ?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue?.jumlah_simpatisans;
                  }, 0)
                  .toLocaleString())
            }
            h={"55px"}
            w={"150px"}
            totalSize={"21px"}
            titleSize={"18px"}
          />
        </span>
        <span onClick={() => handleButton("Logistik")}>
          <JumlahPenduduk
            active={active}
            title={"Logistik"}
            icon={<Logistic />}
            total={
              (statistic?.length !== undefined && (statistic[0]?.jumlah_logistik + statistic[1]?.jumlah_logistik + statistic[2]?.jumlah_logistik + statistic[3]?.jumlah_logistik + statistic[4]?.jumlah_logistik).toLocaleString()) ||
              (data !== undefined &&
                statisticKec !== undefined &&
                statisticKec
                  ?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue?.jumlah_logistik;
                  }, 0)
                  .toLocaleString())
            }
            h={"55px"}
            w={"150px"}
            totalSize={"21px"}
            titleSize={"18px"}
          />
        </span>
        <span onClick={() => handleButton("Program")}>
          <JumlahPenduduk
            active={active}
            title={"Program"}
            icon={<ProgramIcon />}
            total={
              (statistic?.length !== undefined && (statistic[0]?.program + statistic[1]?.program + statistic[2]?.program + statistic[3]?.program + statistic[4]?.program).toLocaleString()) ||
              (data !== undefined &&
                statisticKec !== undefined &&
                statisticKec
                  ?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue?.program;
                  }, 0)
                  .toLocaleString())
            }
            h={"55px"}
            w={"150px"}
            totalSize={"21px"}
            titleSize={"18px"}
          />
        </span>
      </div>

      {/* semua kab / kota */}
      <div className={`${type === "kab_kota" ? "visible" : "hidden"}`}>
        <div className="flex py-2 px-[14px] fixed gap-2 bg-white left-[700px] rounded-full top-[20px] border border-[#374151] text-[#374151] font-medium">
          {active === undefined ? <p>Peta Kekuatan:</p> : <p>{active}:</p>} <span className="text-[#374151] font-bold">Semua Kab / Kota</span>
        </div>
        {/* div popup */}
        {/* lombok utara */}
        <div
          onMouseOver={() => setHover("lombok utara")}
          onMouseLeave={() => setHover()}
          onClick={
            active === undefined
              ? () => detailKota("5208")
              : () => {
                  let path = "Dashboard";
                  let query = {};
                  const idKabupaten = "5208";

                  switch (activeType) {
                    case "Target Suara":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Suara Periode Lalu":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah TPS":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah DPT/DPS":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah Relawan":
                      path = "Admin";
                      query = {
                        component: "Relawan",
                        id_kabupaten: idKabupaten,
                      };
                      break;
                    case "Jumlah Simpatisan":
                      path = "Admin";
                      query = {
                        component: "Simpatisan",
                        id_kabupaten: idKabupaten,
                      };
                      break;
                    case "Logistik":
                      path = "Admin";
                      query = { component: "/logistik" };

                      break;
                    case "Program":
                      path = "Admin";
                      query = {
                        component: "/program",
                        id_kabupaten: idKabupaten,
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
          className="flex justify-center cursor-pointer items-center gap-2 py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[650px] top-[130px] rounded-md "
        >
          <img className="h-[24px]" src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>
              {statistic?.length !== undefined && (
                <>
                  {total === "target" && statistic[3]?.target_suara?.toLocaleString()}
                  {total === "program" && statistic[3]?.program?.toLocaleString()}
                  {total === "suara periode lalu" && statistic[3]?.suara_periode_lalu?.toLocaleString()}
                  {total === "jumlah tps" && statistic[3]?.jumlah_tps?.toLocaleString()}
                  {total === "jumlah dpt/dps" && statistic[3]?.jumlah_dpt_dps?.toLocaleString()}
                  {total === "relawan" && statistic[3]?.jumlah_relawans?.toLocaleString()}
                  {total === "simpatisan" && statistic[3]?.jumlah_simpatisans?.toLocaleString()}
                  {total === "logistik" && statistic[3]?.jumlah_logistik?.toLocaleString()}
                </>
              )}
            </p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Kab. Lombok Utara</p>
          </div>
        </div>
        {/* kota mataram */}
        <div
          onMouseOver={() => setHover("kota mataram")}
          onMouseLeave={() => setHover()}
          onClick={
            active === undefined
              ? () => detailKota("5271")
              : () => {
                  let path = "Dashboard";
                  let query = {};
                  const idKabupaten = "5271";

                  switch (activeType) {
                    case "Target Suara":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Suara Periode Lalu":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah TPS":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah DPT/DPS":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah Relawan":
                      path = "Admin";
                      query = {
                        component: "Relawan",
                        id_kabupaten: idKabupaten,
                      };
                      break;
                    case "Jumlah Simpatisan":
                      path = "Admin";
                      query = {
                        component: "Simpatisan",
                        id_kabupaten: idKabupaten,
                      };
                      break;
                    case "Logistik":
                      path = "Admin";
                      query = { component: "/logistik" };

                      break;
                    case "Program":
                      path = "Admin";
                      query = {
                        component: "/program",
                        id_kabupaten: idKabupaten,
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
          className="flex justify-center items-center gap-2 cursor-pointer  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[520px] top-[320px] rounded-md "
        >
          <img className="h-[24px]" src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>
              {statistic?.length !== undefined && (
                <>
                  {total === "target" && statistic[4]?.target_suara?.toLocaleString()}
                  {total === "program" && statistic[4]?.program?.toLocaleString()}
                  {total === "suara periode lalu" && statistic[4]?.suara_periode_lalu?.toLocaleString()}
                  {total === "jumlah tps" && statistic[4]?.jumlah_tps?.toLocaleString()}
                  {total === "jumlah dpt/dps" && statistic[4]?.jumlah_dpt_dps?.toLocaleString()}
                  {total === "relawan" && statistic[4]?.jumlah_relawans?.toLocaleString()}
                  {total === "simpatisan" && statistic[4]?.jumlah_simpatisans?.toLocaleString()}
                  {total === "logistik" && statistic[4]?.jumlah_logistik?.toLocaleString()}
                </>
              )}
            </p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Kota Mataram</p>
          </div>
        </div>
        {/* lombok barat */}
        <div
          onMouseOver={() => setHover("lombok barat")}
          onMouseLeave={() => setHover()}
          onClick={
            active === undefined
              ? () => detailKota("5201")
              : () => {
                  let path = "Dashboard";
                  let query = {};
                  const idKabupaten = "5201";

                  switch (activeType) {
                    case "Target Suara":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Suara Periode Lalu":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah TPS":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah DPT/DPS":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah Relawan":
                      path = "Admin";
                      query = {
                        component: "Relawan",
                        id_kabupaten: idKabupaten,
                      };
                      break;
                    case "Jumlah Simpatisan":
                      path = "Admin";
                      query = {
                        component: "Simpatisan",
                        id_kabupaten: idKabupaten,
                      };
                      break;
                    case "Logistik":
                      path = "Admin";
                      query = { component: "/logistik" };

                      break;
                    case "Program":
                      path = "Admin";
                      query = {
                        component: "/program",
                        id_kabupaten: idKabupaten,
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
          className="flex justify-center items-center gap-2 cursor-pointer py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[420px] top-[480px] rounded-md "
        >
          <img className="h-[24px]" src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>
              {statistic?.length !== undefined && (
                <>
                  {total === "target" && statistic[0]?.target_suara?.toLocaleString()}
                  {total === "program" && statistic[0]?.program?.toLocaleString()}
                  {total === "suara periode lalu" && statistic[0]?.suara_periode_lalu?.toLocaleString()}
                  {total === "jumlah tps" && statistic[0]?.jumlah_tps?.toLocaleString()}
                  {total === "jumlah dpt/dps" && statistic[0]?.jumlah_dpt_dps?.toLocaleString()}
                  {total === "relawan" && statistic[0]?.jumlah_relawans?.toLocaleString()}
                  {total === "simpatisan" && statistic[0]?.jumlah_simpatisans?.toLocaleString()}
                  {total === "logistik" && statistic[0]?.jumlah_logistik?.toLocaleString()}
                </>
              )}
            </p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Kab. Lombok Barat</p>
          </div>
        </div>
        {/* lombok tengah */}

        <div
          onMouseOver={() => setHover("lombok tengah")}
          onMouseLeave={() => setHover()}
          onClick={
            active === undefined
              ? () => detailKota("5202")
              : () => {
                  let path = "Dashboard";
                  let query = {};
                  const idKabupaten = "5202";

                  switch (activeType) {
                    case "Target Suara":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Suara Periode Lalu":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah TPS":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah DPT/DPS":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah Relawan":
                      path = "Admin";
                      query = {
                        component: "Relawan",
                        id_kabupaten: idKabupaten,
                      };
                      break;
                    case "Jumlah Simpatisan":
                      path = "Admin";
                      query = {
                        component: "Simpatisan",
                        id_kabupaten: idKabupaten,
                      };
                      break;
                    case "Logistik":
                      path = "Admin";
                      query = { component: "/logistik" };

                      break;
                    case "Program":
                      path = "Admin";
                      query = {
                        component: "/program",
                        id_kabupaten: idKabupaten,
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
          className="flex justify-center items-center gap-2 py-2 cursor-pointer px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[790px] top-[400px] rounded-md "
        >
          <img className="h-[24px]" src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>
              {statistic?.length !== undefined && (
                <>
                  {total === "target" && statistic[1]?.target_suara?.toLocaleString()}
                  {total === "program" && statistic[1]?.program?.toLocaleString()}
                  {total === "suara periode lalu" && statistic[1]?.suara_periode_lalu?.toLocaleString()}
                  {total === "jumlah tps" && statistic[1]?.jumlah_tps?.toLocaleString()}
                  {total === "jumlah dpt/dps" && statistic[1]?.jumlah_dpt_dps?.toLocaleString()}
                  {total === "relawan" && statistic[1]?.jumlah_relawans?.toLocaleString()}
                  {total === "simpatisan" && statistic[1]?.jumlah_simpatisans?.toLocaleString()}
                  {total === "logistik" && statistic[1]?.jumlah_logistik?.toLocaleString()}
                </>
              )}
            </p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Kab. Lombok Tengah</p>
          </div>
        </div>
        {/* lombok timur */}
        <div
          onMouseOver={() => setHover("lombok timur")}
          onMouseLeave={() => setHover()}
          onClick={
            active === undefined
              ? () => detailKota("5203")
              : () => {
                  let path = "Dashboard";
                  let query = {};
                  const idKabupaten = "5203";

                  switch (activeType) {
                    case "Target Suara":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Suara Periode Lalu":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah TPS":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah DPT/DPS":
                      path = "DetailTargetDesa";
                      query = { id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah Relawan":
                      path = "Admin";
                      query = { component: "Relawan", id_kabupaten: idKabupaten };
                      break;
                    case "Jumlah Simpatisan":
                      path = "Admin";
                      query = { component: "Simpatisan", id_kabupaten: idKabupaten };
                      break;
                    case "Logistik":
                      path = "Admin";
                      query = { component: "/logistik" };

                      break;
                    case "Program":
                      path = "Admin";
                      query = { component: "/program", id_kabupaten: idKabupaten };

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
          className="flex justify-center items-center gap-2 cursor-pointer  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[1000px] top-[230px] rounded-md "
        >
          <img className="h-[24px]" src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>
              {statistic?.length !== undefined && (
                <>
                  {total === "target" && statistic[2]?.target_suara?.toLocaleString()}
                  {total === "program" && statistic[2]?.program?.toLocaleString()}
                  {total === "suara periode lalu" && statistic[2]?.suara_periode_lalu?.toLocaleString()}
                  {total === "jumlah tps" && statistic[2]?.jumlah_tps?.toLocaleString()}
                  {total === "jumlah dpt/dps" && statistic[2]?.jumlah_dpt_dps?.toLocaleString()}
                  {total === "relawan" && statistic[2]?.jumlah_relawans?.toLocaleString()}
                  {total === "simpatisan" && statistic[2]?.jumlah_simpatisans?.toLocaleString()}
                  {total === "logistik" && statistic[2]?.jumlah_logistik?.toLocaleString()}
                </>
              )}
            </p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>Kab. Lombok Timur</p>
          </div>
        </div>
      </div>

      {/* detail mataram */}
      <div className={`${data === "5271" ? "visible" : "hidden"}`}>
        <div className="flex py-2 bg-white px-[14px] fixed gap-2 left-[700px] rounded-full top-[20px] border border-[#374151] text-[#374151] font-medium">
          {active === undefined ? <p>Peta Kekuatan:</p> : <p>{active}:</p>} <span className="text-[#374151] font-bold">Kota Mataram</span>
        </div>
        {/* div popup */}
        {/* ampenan */}
        <div
          onMouseOver={() => setHover("ampenan")}
          onMouseLeave={() => setHover()}
          onClick={
            active === undefined
              ? () =>
                  router.push({
                    pathname: "./DetailKelurahan",
                    query: { id_kabupaten: "5271", id_kecamatan: "5271010" },
                  })
              : () => {
                  let path = "Dashboard";
                  let query = {};
                  const idKabupaten = "5271";
                  const idKecamatan = "5271010";

                  switch (activeType) {
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
          className="flex cursor-pointer justify-center items-center gap-2 py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[520px] top-[230px] rounded-md "
        >
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>
              {" "}
              {statisticKec?.length !== undefined && (
                <>
                  {total === "target" && statisticKec[0]?.target_suara?.toLocaleString()}
                  {total === "program" && statisticKec[0]?.program?.toLocaleString()}
                  {total === "suara periode lalu" && statisticKec[0]?.suara_periode_lalu?.toLocaleString()}
                  {total === "jumlah tps" && statisticKec[0]?.jumlah_tps?.toLocaleString()}
                  {total === "jumlah dpt/dps" && statisticKec[0]?.jumlah_dpt_dps?.toLocaleString()}
                  {total === "relawan" && statisticKec[0]?.jumlah_relawans?.toLocaleString()}
                  {total === "simpatisan" && statisticKec[0]?.jumlah_simpatisans?.toLocaleString()}
                  {total === "logistik" && statisticKec[0]?.jumlah_logistik?.toLocaleString()}
                </>
              )}
            </p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Ampenan</p>
          </div>
        </div>
        {/* sekarbela */}
        <div
          onMouseOver={() => setHover("sekarbela")}
          onMouseLeave={() => setHover()}
          onClick={
            active === undefined
              ? () =>
                  router.push({
                    pathname: "./DetailKelurahan",
                    query: { id_kabupaten: "5271", id_kecamatan: "5271011" },
                  })
              : () => {
                  let path = "Dashboard";
                  let query = {};
                  const idKabupaten = "5271";
                  const idKecamatan = "5271011";

                  switch (activeType) {
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
          className="flex cursor-pointer justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[490px] top-[420px] rounded-md "
        >
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>
              {" "}
              {statisticKec?.length !== undefined && (
                <>
                  {total === "target" && statisticKec[2]?.target_suara?.toLocaleString()}
                  {total === "program" && statisticKec[2]?.program?.toLocaleString()}
                  {total === "suara periode lalu" && statisticKec[2]?.suara_periode_lalu?.toLocaleString()}
                  {total === "jumlah tps" && statisticKec[2]?.jumlah_tps?.toLocaleString()}
                  {total === "jumlah dpt/dps" && statisticKec[2]?.jumlah_dpt_dps?.toLocaleString()}
                  {total === "relawan" && statisticKec[2]?.jumlah_relawans?.toLocaleString()}
                  {total === "simpatisan" && statisticKec[2]?.jumlah_simpatisans?.toLocaleString()}
                  {total === "logistik" && statisticKec[2]?.jumlah_logistik?.toLocaleString()}
                </>
              )}
            </p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Sekarbela</p>
          </div>
        </div>
        {/* mataram */}
        <div
          onMouseOver={() => setHover("mataram")}
          onMouseLeave={() => setHover()}
          onClick={
            active === undefined
              ? () =>
                  router.push({
                    pathname: "./DetailKelurahan",
                    query: { id_kabupaten: "5271", id_kecamatan: "5271020" },
                  })
              : () => {
                  let path = "Dashboard";
                  let query = {};
                  const idKabupaten = "5271";
                  const idKecamatan = "5271020";

                  switch (activeType) {
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
          className="flex justify-center cursor-pointer items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[700px] top-[390px] rounded-md "
        >
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>
              {" "}
              {statisticKec?.length !== undefined && (
                <>
                  {total === "target" && statisticKec[5]?.target_suara?.toLocaleString()}
                  {total === "program" && statisticKec[5]?.program?.toLocaleString()}
                  {total === "suara periode lalu" && statisticKec[5]?.suara_periode_lalu?.toLocaleString()}
                  {total === "jumlah tps" && statisticKec[5]?.jumlah_tps?.toLocaleString()}
                  {total === "jumlah dpt/dps" && statisticKec[5]?.jumlah_dpt_dps?.toLocaleString()}
                  {total === "relawan" && statisticKec[5]?.jumlah_relawans?.toLocaleString()}
                  {total === "simpatisan" && statisticKec[5]?.jumlah_simpatisans?.toLocaleString()}
                  {total === "logistik" && statisticKec[5]?.jumlah_logistik?.toLocaleString()}
                </>
              )}
            </p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Mataram</p>
          </div>
        </div>
        {/* selaparang */}
        <div
          onMouseOver={() => setHover("selaparang")}
          onMouseLeave={() => setHover()}
          onClick={
            active === undefined
              ? () =>
                  router.push({
                    pathname: "./DetailKelurahan",
                    query: { id_kabupaten: "5271", id_kecamatan: "5271021" },
                  })
              : () => {
                  let path = "Dashboard";
                  let query = {};
                  const idKabupaten = "5271";
                  const idKecamatan = "5271021";

                  switch (activeType) {
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
          className="flex cursor-pointer justify-center items-center gap-2 py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[780px] top-[220px] rounded-md "
        >
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>
              {" "}
              {statisticKec?.length !== undefined && (
                <>
                  {total === "target" && statisticKec[3]?.target_suara?.toLocaleString()}
                  {total === "program" && statisticKec[3]?.program?.toLocaleString()}
                  {total === "suara periode lalu" && statisticKec[3]?.suara_periode_lalu?.toLocaleString()}
                  {total === "jumlah tps" && statisticKec[3]?.jumlah_tps?.toLocaleString()}
                  {total === "jumlah dpt/dps" && statisticKec[3]?.jumlah_dpt_dps?.toLocaleString()}
                  {total === "relawan" && statisticKec[3]?.jumlah_relawans?.toLocaleString()}
                  {total === "simpatisan" && statisticKec[3]?.jumlah_simpatisans?.toLocaleString()}
                  {total === "logistik" && statisticKec[3]?.jumlah_logistik?.toLocaleString()}
                </>
              )}
            </p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Selaparang</p>
          </div>
        </div>
        {/* cakranegara */}
        <div
          onMouseOver={() => setHover("cakranegara")}
          onMouseLeave={() => setHover()}
          onClick={
            active === undefined
              ? () =>
                  router.push({
                    pathname: "./DetailKelurahan",
                    query: { id_kabupaten: "5271", id_kecamatan: "5271030" },
                  })
              : () => {
                  let path = "Dashboard";
                  let query = {};
                  const idKabupaten = "5271";
                  const idKecamatan = "5271030";

                  switch (activeType) {
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
          className="flex cursor-pointer justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[880px] top-[320px] rounded-md "
        >
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>
              {" "}
              {statisticKec?.length !== undefined && (
                <>
                  {total === "target" && statisticKec[4]?.target_suara?.toLocaleString()}
                  {total === "program" && statisticKec[4]?.program?.toLocaleString()}
                  {total === "suara periode lalu" && statisticKec[4]?.suara_periode_lalu?.toLocaleString()}
                  {total === "jumlah tps" && statisticKec[4]?.jumlah_tps?.toLocaleString()}
                  {total === "jumlah dpt/dps" && statisticKec[4]?.jumlah_dpt_dps?.toLocaleString()}
                  {total === "relawan" && statisticKec[4]?.jumlah_relawans?.toLocaleString()}
                  {total === "simpatisan" && statisticKec[4]?.jumlah_simpatisans?.toLocaleString()}
                  {total === "logistik" && statisticKec[4]?.jumlah_logistik?.toLocaleString()}
                </>
              )}
            </p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Cakranegara</p>
          </div>
        </div>
        {/* sandubaya */}
        <div
          onMouseOver={() => setHover("sandubaya")}
          onMouseLeave={() => setHover()}
          onClick={
            active === undefined
              ? () =>
                  router.push({
                    pathname: "./DetailKelurahan",
                    query: { id_kabupaten: "5271", id_kecamatan: "5271031" },
                  })
              : () => {
                  let path = "Dashboard";
                  let query = {};
                  const idKabupaten = "5271";
                  const idKecamatan = "5271031";

                  switch (activeType) {
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
          className="flex cursor-pointer justify-center items-center gap-2  py-2 px-[14px] border-[#FFCFB9] border bg-white fixed z-50 left-[950px] top-[400px] rounded-md "
        >
          <img className={`h-[24px] ${icon === kotaIcon ? "hidden" : "visible"}`} src={icon.src} alt="kota.png" />
          <div>
            <p className={`${icon === kotaIcon ? "hidden" : "visible"} text-[#FF5001] text-[26px] font-semibold`}>
              {" "}
              {statisticKec?.length !== undefined && (
                <>
                  {total === "target" && statisticKec[1]?.target_suara?.toLocaleString()}
                  {total === "program" && statisticKec[1]?.program?.toLocaleString()}
                  {total === "suara periode lalu" && statisticKec[1]?.suara_periode_lalu?.toLocaleString()}
                  {total === "jumlah tps" && statisticKec[1]?.jumlah_tps?.toLocaleString()}
                  {total === "jumlah dpt/dps" && statisticKec[1]?.jumlah_dpt_dps?.toLocaleString()}
                  {total === "relawan" && statisticKec[1]?.jumlah_relawans?.toLocaleString()}
                  {total === "simpatisan" && statisticKec[1]?.jumlah_simpatisans?.toLocaleString()}
                  {total === "logistik" && statisticKec[1]?.jumlah_logistik?.toLocaleString()}
                </>
              )}
            </p>
            <p className={`${icon === kotaIcon ? " text-[18px] " : "text-[14px]"} text-[#374151] font-semibold`}>kec. Sandubaya</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonPopUpInfo;
