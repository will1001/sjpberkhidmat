import React, { useState } from "react";
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
  console.log(dataPartai);

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
      {dataCalon?.data?.length === 0 && (
        <div>
          <AlertInput />
        </div>
      )}

      {page === "partai" ? (
        <>
          {dataPartai?.data?.map((res) =>
            res === undefined ? (
              <p>Loading...</p>
            ) : (
              <div key={res._id} className="h-[69px] border">
                <p className="text-[16px] font-semibold text-[#374151]">{res?.name}</p>
              </div>
            )
          )}
        </>
      ) : (
        <>
          {dataCalon?.data.map((res) =>
            res === undefined ? (
              <p>Loading...</p>
            ) : (
              <div key={res._id} className="h-[69px] border">
                <p className="text-[16px] font-semibold text-[#374151]">{res?.name}</p>
                <p className="text-[14px]  text-[#E44700]">Fraksi {res.id_partai}</p>
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
