import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axiosFetch from "../../API/axiosFetch";
import relawan from "../../utility/peta/relawan.png";
import logistik from "../../utility/peta/logistik.png";
import simpatisan from "../../utility/peta/simpatisan.png";
import program from "../../utility/peta/program.png";
import targetSuara from "../../utility/peta/target_suara.png";
import suaraPeriodeLalu from "../../utility/peta/suara_periode_lalu.png";
import TPS from "../../utility/peta/TPS.png";
import DPTDPS from "../../utility/peta/DPT_DPS.png";

const ListKecamatan = ({ id, icon }) => {
  const [getKecamatan, setgetKecamatan] = useState();
  const [selectIcon, setSelectIcon] = useState();
  if (id !== undefined) {
    useEffect(() => {
      axiosFetch("get", `user/kecamatan/${id}`)
        .then((res) => setgetKecamatan(res))
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
    icon === undefined && setSelectIcon();
  }, [icon]);

  return (
    <div className="text-[#374151] p-2">
      <p className="text-[21px] font-semibold">Daftar Kecamatan</p>
      {getKecamatan !== undefined &&
        getKecamatan?.data?.data?.map((res) => (
          <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`} key={res._id}>
            {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
            <div className="">
              {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
              <p className="font-medium">
                {res.name
                  .toLowerCase()
                  .split("")
                  .map((word, index) => {
                    if (index === 0) {
                      return word.toUpperCase();
                    }
                    return word.charAt(0) + word.slice(1);
                  })
                  .join("")}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListKecamatan;
