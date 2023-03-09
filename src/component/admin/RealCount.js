import React, { useEffect, useState } from "react";
import RealCountPenduduk from "./realcount/RealCountPenduduk";
import ProgresBar from "../../utility/ProgresBar";
import AlertInput from "./realcount/AlertInput";
import { useRouter } from "next/router";
import useFetch from "../../API/useFetch";
import inputIcon from "../../utility/icon/input_realcount.png";
import alertInput from "../../utility/img/alert_realcount.png";
import uploadIcon from "../../utility/icon/uploadIcon.png";
import axiosFetch from "../../API/axiosFetch";
import { useSelector } from "react-redux";
import { DataRealcountIcon } from "../../utility/icon/icon";

const RealCount = ({ user }) => {
  const [page, setPage] = useState("partai");
  const activhandle = (button) => {
    if (page !== button) {
      setPage(button);
    }
  };

  const router = useRouter();
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);
  const roles = useSelector((state) => state.user.roles)
  const dataCalon = useFetch("get", "user/real_count/calon");
  const dataPartai = useFetch("get", "user/real_count/partai");
  const [popup, setPopup] = useState(false);
  const [plano, setPlano] = useState();
  const getPlano = useFetch("get", "user/real_count/plano?page=1  ");

  const postPlano = async () => {
    const a = new FormData();
    a.append("image", plano);
    a.append("id_periode", periode);
    {
      await axiosFetch("post", `user/real_count/plano`, a, token)
        .then((res) => {
          console.log(res);
          setPlano();
          setPopup(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log(getPlano);

  return (
    <>
      {user === "Relawan" ? (
        <>
          <div
            className={`${
              popup === false ? "hidden" : "visible"
            } fixed left-0 w-screen h-screen bg-[#37415152]`}
          >
            <div className="absolute bg-white py-12 rounded-sm px-12 left-[380px] top-[100px]">
              <p
                onClick={() => setPopup(false)}
                className="absolute pr-2 text-[18px] font-medium text-[#374151] cursor-pointer top-0 right-0"
              >
                X
              </p>
              <p className="text-[#374151] text-[32px] font-bold">
                Upload Foto C1 Plano
              </p>
              <div className="bg-[#FFECE480] mt-3">
                <img src={alertInput.src} alt="alert_input.png" />
              </div>
              <div className="flex justify-between mt-3">
                <p className="text-[#374151]">Upload Foto C Plano</p>
                {plano === undefined ? (
                  <label
                    htmlFor="input"
                    className="flex flex-col items-center border py-4 px-16 rounded-md cursor-pointer"
                  >
                    <img src={uploadIcon.src} alt="uploadIcon.png" />

                    <p className="text-[12px] text-[#E44700] font-semibold">
                      Upload a file{" "}
                      <span className="text-black">of drag and drop</span>
                    </p>
                    <p className="text-[12px]">PNG, JPG, PDF upto 5MB</p>
                  </label>
                ) : (
                  <div>
                    {plano !== undefined && (
                      <img
                        className="w-[300px] h-[150px]"
                        src={URL.createObjectURL(plano)}
                      />
                    )}
                  </div>
                )}

                <input
                  onChange={(e) => setPlano(e.target.files[0])}
                  id="input"
                  className="hidden"
                  type={"file"}
                />
              </div>
              <div className="flex justify-end">
                <div
                  onClick={postPlano}
                  className="bg-[#E44700] text-white font-semibold py-2 px-4 mt-3 rounded-md cursor-pointer"
                >
                  Upload Sekarang
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 ml-2">
            <p className="text-[32px] font-bold text-slate-700">
              Real Count DPR RI Dapil II Prov. NTB
            </p>
            <RealCountPenduduk />
            <div className="flex">
              <div className="w-full">
                <ProgresBar
                  bgcolor={"#E44700"}
                  progress={0}
                  title={"Jumlah Suara Masuk"}
                />
              </div>
              Jumlah Suara Masuk
            </div>
            <div className={`${roles === "koordinator" && "hidden"} flex my-4 gap-3 `}>
              <div className="bg-[#E44700] cursor-pointer flex items-center gap-2 py-2 px-4 rounded-sm">
                <img src={inputIcon.src} alt="icon_input.png" />
                <p
                  onClick={() => setPopup(true)}
                  className="text-white font-medium"
                >
                  Input Data
                </p>
              </div>
              <div
                onClick={() => router.push("./History")}
                className="py-2 px-4 rounded-sm cursor-pointer text-[#374151] font-medium border border-[#374151]"
              >
                Histori Upload
              </div>
            </div>
            <div>
              <p className="font-bold text-slate-700 text-[18px]">
                Perolehan Suara Sementara
              </p>
            </div>

            <div className="flex gap-4 pt-4 pb-4">
              <button
                onClick={() => activhandle("partai")}
                className={
                  page === "partai"
                    ? `border border-orange-600 bg-[#FFECE4] font-semibold text-orange-600 p-2 rounded-3xl`
                    : `border border-slate-700 bg-white font-semibold text-slate-700 p-2 rounded-3xl`
                }
              >
                Partai
              </button>
              <button
                onClick={() => activhandle("calon")}
                className={
                  page === "calon"
                    ? `border border-orange-600 bg-[#FFECE4] font-semibold text-orange-600 p-2 rounded-3xl`
                    : `border border-slate-700 bg-white font-semibold text-slate-700 p-2 rounded-3xl`
                }
              >
                Calon DPR RI
              </button>
            </div>

            {page === "partai" ? (
              <>
                <div
                  className={`${
                    dataPartai?.data?.length === 0 ? "visible" : "hidden"
                  } mb-4`}
                >
                  <AlertInput />
                </div>
                {dataPartai?.data?.map((res) =>
                  res === undefined ? (
                    <p>Loading...</p>
                  ) : (
                    <div
                      key={res._id}
                      className="h-[69px] border-[0.5px] flex px-[21px] gap-3"
                    >
                      <p className="text-[21px] font-medium text-[#374151] flex items-center">
                        {res.persantase_suara.toFixed(1)} %
                      </p>
                      <div className="flex items-center">
                        <img
                          className="h-[50px] w-[40px]"
                          src={`${
                            process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo
                          }`}
                        />
                      </div>

                      <p className="text-[16px] flex items-center font-semibold text-[#374151]">
                        {res?.name}
                      </p>
                    </div>
                  )
                )}
              </>
            ) : (
              <>
                <div
                  className={`${
                    dataCalon?.data?.length === 0 ? "visible" : "hidden"
                  } mb-4`}
                >
                  <AlertInput />
                </div>
                {dataCalon?.data.map((res) =>
                  res === undefined ? (
                    <p>Loading...</p>
                  ) : (
                    <div key={res._id} className="h-[69px] border">
                      <div className="flex items-center px-[12px] gap-3 py-2">
                        <p className="text-[#374151] text-[26px] font-semibold">
                          {res.persantase_suara.toFixed(1)} %
                        </p>
                        <div className="flex flex-col justify-center">
                          <p className="text-[14px] text-[#6B7280]">
                            Total Suara
                          </p>
                          <p className="text-[16px] text-[#374151] font-bold">
                            {res.suara}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <img
                            className="h-[50px] w-[50px]"
                            src={`${
                              process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo
                            }`}
                          />
                        </div>

                        <div>
                          <p className="text-[16px] font-semibold text-[#374151]">
                            {res?.name}
                          </p>
                          <p className="text-[14px]  text-[#E44700]">
                            Fraksi {res.id_partai}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <div className="p-8 ml-2">
          <p className="text-[32px] font-bold text-slate-700">
            Real Count DPR RI Dapil II Prov. NTB
          </p>
          <RealCountPenduduk />
          <ProgresBar
            bgcolor={"#E44700"}
            progress={0}
            title={"Jumlah Suara Masuk"}
          />
          <div className="flex">
            <div className="flex gap-3 items-center bg-[#FFECE4] px-4 py-2 rounded-md">
              <DataRealcountIcon />
              <p>Ada 18+ foto baru belum diinput</p>
              <div
                onClick={() => router.push("relawan/History")}
                className="text-white font-medium py-2 px-4 rounded-md bg-[#E44700] cursor-pointer"
              >
               Lihat Detail
              </div>
            </div>
          </div>
          <p className="font-bold text-slate-700 text-[18px]">
            Perolehan Suara Sementara
          </p>
          <div className="flex gap-4 pt-4 pb-4">
            <button
              onClick={() => activhandle("partai")}
              className={
                page === "partai"
                  ? `border border-orange-600 bg-[#FFECE4] font-semibold text-orange-600 p-2 rounded-3xl`
                  : `border border-slate-700 bg-white font-semibold text-slate-700 p-2 rounded-3xl`
              }
            >
              Partai
            </button>
            <button
              onClick={() => activhandle("calon")}
              className={
                page === "calon"
                  ? `border border-orange-600 bg-[#FFECE4] font-semibold text-orange-600 p-2 rounded-3xl`
                  : `border border-slate-700 bg-white font-semibold text-slate-700 p-2 rounded-3xl`
              }
            >
              Calon DPR RI
            </button>
          </div>

          {page === "partai" ? (
            <>
              <div
                className={`${
                  dataPartai?.data?.length === 0 ? "visible" : "hidden"
                } mb-4`}
              >
                <AlertInput />
              </div>
              {dataPartai?.data?.map((res) =>
                res === undefined ? (
                  <p>Loading...</p>
                ) : (
                  <div
                    key={res._id}
                    className="h-[69px] border-[0.5px] flex px-[21px] gap-3"
                  >
                    <p className="text-[21px] font-medium text-[#374151] flex items-center">
                      {res.persantase_suara.toFixed(1)} %
                    </p>
                    <div className="flex items-center">
                      <img
                        className="h-[50px] w-[40px]"
                        src={`${
                          process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo
                        }`}
                      />
                    </div>

                    <p className="text-[16px] flex items-center font-semibold text-[#374151]">
                      {res?.name}
                    </p>
                  </div>
                )
              )}
            </>
          ) : (
            <>
              <div
                className={`${
                  dataCalon?.data?.length === 0 ? "visible" : "hidden"
                } mb-4`}
              >
                <AlertInput />
              </div>
              {dataCalon?.data.map((res) =>
                res === undefined ? (
                  <p>Loading...</p>
                ) : (
                  <div key={res._id} className="h-[69px] border">
                    <div className="flex items-center px-[12px] gap-3 py-2">
                      <p className="text-[#374151] text-[26px] font-semibold">
                        {res.persantase_suara.toFixed(1)} %
                      </p>
                      <div className="flex flex-col justify-center">
                        <p className="text-[14px] text-[#6B7280]">
                          Total Suara
                        </p>
                        <p className="text-[16px] text-[#374151] font-bold">
                          {res.suara}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <img
                          className="h-[50px] w-[50px]"
                          src={`${
                            process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo
                          }`}
                        />
                      </div>

                      <div>
                        <p className="text-[16px] font-semibold text-[#374151]">
                          {res?.name}
                        </p>
                        <p className="text-[14px]  text-[#E44700]">
                          Fraksi {res.id_partai}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </>
          )}

          <button
            onClick={() => router.push("RealCountAdmn")}
            className="mt-4 w-[220px] h-[42px] bg-[#E44700] text-white text-[18px] font-semibold rounded-md"
          >
            Input Calon & Partai
          </button>
        </div>
      )}
    </>
  );
};

export default RealCount;
