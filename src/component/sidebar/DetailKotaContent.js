import React from "react";
import { KembaliIcon } from "../../utility/icon/icon";
import Button from "../Button";

function DetailKota({ data }) {
  return (
    <div>
      <div className="">
        <Button
          title={"Kembali"}
          text={"white"}
          icon={<KembaliIcon />}
          bgColor={"rgb(51, 65, 85)"}
          w={"149px"}
          h={"53px"}
        />
        <p className="font-bold text-slate-700 text-[25px] mt-4">
          Desa Di Kota Mataram
        </p>
        <div className="mt-4">
          <p className="font-medium text-[18px] text-slate-400 mb-2">
            KEC. {data?.kecamatan[0].nama.toUpperCase()}
          </p>
          <ul className="list-inside">
            {data?.kecamatan[0].desa.map((res, i) => {
              return (
                <li className="font-medium text-[15px] text-slate-700 mb-1 px-2">
                  {res.nama}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-medium text-[18px] text-slate-400 mb-2">
            KEC. {data?.kecamatan[1].nama.toUpperCase()}
          </p>
          <ul className="list-inside">
            {data?.kecamatan[1].desa.map((res, i) => {
              return (
                <li className="font-medium text-[15px] text-slate-700 mb-1 px-2">
                  {res.nama}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-medium text-[18px] text-slate-400 mb-2">
            KEC. {data?.kecamatan[0].nama.toUpperCase()}
          </p>
          <ul className="list-inside">
            {data?.kecamatan[0].desa.map((res, i) => {
              return (
                <li className="font-medium text-[15px] text-slate-700 mb-1 px-2">
                  {res.nama}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailKota;
