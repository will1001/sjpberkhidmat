import React, { useEffect, useState } from "react";
import RealCountPenduduk from "./realcount/RealCountPenduduk";
import ProgresBar from "../../utility/ProgresBar";
import AlertInput from "./realcount/AlertInput";
import { useRouter } from "next/router";
import useFetch from "../../API/useFetch";

const RealCount = () => {
  const [page, setPage] = useState("partai");
  const activhandle = (button) => {
    if (page !== button) {
      setPage(button);
    }
  };

  const router = useRouter();
  const dataCalon = useFetch("get", "user/real_count/calon");
  const dataPartai = useFetch("get", "user/real_count/partai");
  console.log(dataPartai.data);

  return (
    <div className="p-8 ml-2">
      <p className="text-[32px] font-bold text-slate-700">Real Count DPR RI Dapil II Prov. NTB</p>
      <RealCountPenduduk />
      <ProgresBar bgcolor={"#E44700"} progress={0} title={"Jumlah Suara Masuk"} />
      <p className="font-bold text-slate-700 text-[18px]">Perolehan Suara Sementara</p>
      <div className="flex gap-4 pt-4 pb-4">
        <button
          onClick={() => activhandle("partai")}
          className={page === "partai" ? `border border-orange-600 bg-[#FFECE4] font-semibold text-orange-600 p-2 rounded-3xl` : `border border-slate-700 bg-white font-semibold text-slate-700 p-2 rounded-3xl`}
        >
          Partai
        </button>
        <button
          onClick={() => activhandle("calon")}
          className={page === "calon" ? `border border-orange-600 bg-[#FFECE4] font-semibold text-orange-600 p-2 rounded-3xl` : `border border-slate-700 bg-white font-semibold text-slate-700 p-2 rounded-3xl`}
        >
          Calon DPR RI
        </button>
      </div>

      {page === "partai" ? (
        <>
          <div className={`${dataPartai?.data?.length === 0 ? "visible" : "hidden"} mb-4`}>
            <AlertInput />
          </div>
          {dataPartai?.data?.map((res) =>
            res === undefined ? (
              <p>Loading...</p>
            ) : (
              <div key={res._id} className="h-[69px] border-[0.5px] flex px-[21px] gap-3">
                <p className="text-[21px] font-medium text-[#374151] flex items-center">18%</p>
                <div className="flex items-center">
                  <img className="h-[50px] w-[40px]" src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo}`} />
                </div>

                <p className="text-[16px] flex items-center font-semibold text-[#374151]">{res?.name}</p>
              </div>
            )
          )}
        </>
      ) : (
        <>
          <div className={`${dataCalon?.data?.length === 0 ? "visible" : "hidden"} mb-4`}>
            <AlertInput />
          </div>
          {dataCalon?.data.map((res) =>
            res === undefined ? (
              <p>Loading...</p>
            ) : (
              <div key={res._id} className="h-[69px] border">
                <div className="flex items-center px-[12px] gap-3 py-2">
                  <p className="text-[#374151] text-[26px] font-semibold">55%</p>
                  <div className="flex flex-col justify-center">
                    <p className="text-[14px] text-[#6B7280]">Total Suara</p>
                    <p className="text-[16px] text-[#374151] font-bold">57.135</p>
                  </div>

                  <div className="flex items-center">
                    <img className="h-[50px] w-[50px]" src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo}`} />
                  </div>

                  <div>
                    <p className="text-[16px] font-semibold text-[#374151]">{res?.name}</p>
                    <p className="text-[14px]  text-[#E44700]">Fraksi {res.id_partai}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      )}

      <button onClick={() => router.push("RealCountAdmn")} className="mt-4 w-[220px] h-[42px] bg-[#E44700] text-white text-[18px] font-semibold rounded-md">
        Input Calon & Partai
      </button>
    </div>
  );
};

export default RealCount;
