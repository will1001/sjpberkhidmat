import React, { useEffect, useState } from "react";
import RealCountPenduduk from "./realcount/RealCountPenduduk";
import ProgresBar from "../../utility/ProgresBar";
import AlertInput from "./realcount/AlertInput";
import { useRouter } from "next/router";
import useFetch from "../../API/useFetch";
import inputIcon from "../../utility/icon/input_realcount.png";
import alertMobile from "../../utility/img/alert_plano_mobile.png";
import alertInput from "../../utility/img/alert_realcount.png";
import uploadIcon from "../../utility/icon/uploadIcon.png";
import axiosFetch from "../../API/axiosFetch";
import { useSelector } from "react-redux";
import { DataRealcountIcon, ImportGambarIcon, KameraIcon } from "../../utility/icon/icon";
import Camera from "../Camera";

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
  const roles = useSelector((state) => state.user.roles);
  const dataCalon = useFetch("get", "user/real_count/calon");
  const dataPartai = useFetch("get", "user/real_count/partai");
  const [popup, setPopup] = useState(false);
  const [plano, setPlano] = useState();
  const [suaraMasuk, setSuaraMasuk] = useState(0);
  const [openCamera, setOpenCamera] = useState(false);
  const [uploadPlano, setUploadPlano] = useState();
  const getPlano = useFetch("get", "user/real_count/plano?page=1  ");
  const id_kabupaten = useSelector((state) => state.user.id_kabupaten);

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

    axiosFetch("get", `user/real_count/total_suara_masuk${id_kabupaten !== null ? "?id_kabupaten=" + id_kabupaten : ""}`, {}, token)
      .then((res) => {
        setSuaraMasuk(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(suaraMasuk);
  return (
    <>
      {screenSize.width >= 350 && screenSize.width <= 950 ? (
        <>
          {" "}
          {popup === true && (
            <div className="fixed px-[16px] bg-[#37415152] top-0 left-0 h-screen w-screen z-50">
              <div className="bg-white w-full px-[16px] pb-[50px] mt-[80px]">
                <div onClick={() => setPopup(false)} className="flex justify-end text-[18px] font-semibold">
                  X
                </div>
                <p className="text-[26px] text-center text-[#374151] font-bold">Upload Foto C1 Plano</p>
                <div className="flex justify-center bg-[#FFECE480] mt-[25px]">
                  <img src={alertMobile.src} />
                </div>
                <p className="text-[#374151] font-medium mt-[25px]">Upload File</p>
                {uploadPlano === undefined ? (
                  <label htmlFor="input" className="flex flex-col items-center border py-4 rounded-md cursor-pointer">
                    <img src={uploadIcon.src} alt="uploadIcon.png" />

                    <p className="text-[12px] text-[#E44700] font-semibold">
                      Upload a file <span className="text-black">of drag and drop</span>
                    </p>
                    <p className="text-[12px]">PNG, JPG, PDF upto 5MB</p>
                  </label>
                ) : (
                  <div>{uploadPlano !== undefined && <img className="w-[300px] h-[150px]" src={URL.createObjectURL(uploadPlano)} />}</div>
                )}
                <div onClick={() => setOpenCamera(true)} className="flex mt-[25px] bg-[#E44700] justify-center gap-3 py-2 rounded-sm items-center">
                  <KameraIcon />
                  <p className="text-white font-medium">Ambil Foto</p>
                </div>
                <div onClick={postPlano} className="border stroke-[#E44700] flex justify-center gap-3 items-center border-[#E44700] text-[#E44700] font-semibold py-2 px-4 mt-3 rounded-sm">
                  <ImportGambarIcon /> Upload Sekarang
                </div>
                {openCamera === true && (
                  <div className="absolute top-0 left-0 h-screen w-screen bg-[#374151] z-50">
                    <Camera setUploadPlano={setPlano} screenSize={screenSize} setOpenCamera={setOpenCamera} />
                  </div>
                )}
              </div>
              <input onChange={(e) => setUploadPlano(e.target.files[0])} id="input" className="hidden" type={"file"} />
            </div>
          )}
          <div className="pt-[20px] px-[16px] pb-[77px] text-[#374151]">
            <p className="text-[24px] font-bold">Real Count DPR RI Dapil II Prov. NTB</p>
            <div className="flex items-center gap-2 mt-[21px]">
              <div className="w-full bg-[#FFECE4] h-[16px]">
                <div style={{ width: `${suaraMasuk}%` }} className={`bg-gradient-to-r from-[#FF5001] to-[#FF50016E] h-[15px]`}></div>
              </div>
              <p className="text-[19px] text-[#FF5001] font-bold">{suaraMasuk}%</p>
            </div>
            <RealCountPenduduk mobile={true} />
            <div className={`${roles === "koordinator" && "hidden"} bg-[#E44700] cursor-pointer flex justify-center items-center gap-2 py-3 mt-[18px] rounded-sm`}>
              <img src={inputIcon.src} alt="icon_input.png" />
              <p onClick={() => setPopup(true)} className="text-white font-medium">
                Input Data
              </p>
            </div>
            <div onClick={() => router.push("./History")} className={`${user === "koordinator" && "hidden"} py-3 mt-2 text-center px-4 rounded-sm cursor-pointer text-[#374151] font-medium border border-[#374151]`}>
              Histori Upload
            </div>
            <p className="mt-[50px] text-[18px] text-[#374151] font-bold">Perolehan Suara Sementara</p>
            <div className="flex gap-4 mt-3">
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
            <div className="w-screen overflow-scroll scrollbar-thin scrollbar-thumb-[#374151] mt-[27px] h-full">
              {page === "partai" ? (
                <>
                  <div className={`${dataPartai?.data?.length === 0 ? "visible" : "hidden"} mb-4`}>
                    <AlertInput />
                  </div>
                  <div className="border-b-[0.5px]">
                    {dataPartai?.data?.map((res, i) =>
                      res === undefined ? (
                        <p>Loading...</p>
                      ) : (
                        <div key={res._id} className={`${i === 0 && "border-[#FF5001] border-[0.5px]"} h-[69px] border-t-[0.5px] flex justify-between px-[21px] items-center`}>
                          <div className="flex gap-3">
                            <img className="h-[50px] w-[40px]" src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo}`} />
                            <p className="text-[16px] w-[400px] flex items-center font-semibold text-[#374151]">{res?.name}</p>
                          </div>

                          <p className={`${i === 0 && "text-[#FF5001]"} text-[21px] font-semibold text-[#374151] flex items-center`}>{res.persantase_suara.toFixed(1)}%</p>
                        </div>
                      )
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className={`${dataCalon?.data?.length === 0 ? "visible" : "hidden"} mb-4`}>
                    <AlertInput />
                  </div>
                  <div className="border-b-[0.5px]">
                    {dataCalon?.data.map((res, i) =>
                      res === undefined ? (
                        <p>Loading...</p>
                      ) : (
                        <div key={res._id} className={`flex w-[700px] items-center ${i === 0 && "border-[0.5px] border-[#FF5001]"} py-1 border-t-[0.5px]`}>
                          <div className={`w-[80px] text-center text-[21px] ${i === 0 ? "text-[#FF5001]" : "text-[#374151]"} font-bold`}>{res.persantase_suara.toFixed(0)} %</div>
                          <div>
                            <img className="h-[57px] w-[47px]" src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo}`} />
                          </div>
                          <div className="ml-2 w-[350px]">
                            <p className="text-[14px] text-[#374151] font-semibold">{res?.name}</p>
                            <p className={`text-[14px] ${i === 0 ? "text-[#E44700]" : "text-[#9CA3AF]"}`}>Fraksi {res.partai?.name}</p>
                          </div>
                          <div>
                            <p className="text-[14px] text-[#6B7280]">Total Suara</p>
                            <p className="text-[14px] text-[#374151] font-bold">{res.suara}</p>
                          </div>
                        </div>
                        // <div key={res._id} className={`${i === 0 && "border-[0.5px] border-[#FF5001]"} h-[69px] border-t-[0.5px] `}>
                        //   <div className="flex items-center justify-between px-[12px] gap-3 py-2">
                        //     <div className="flex gap-3 ">
                        //       <div className="flex items-center">
                        //         <img className="h-[50px] w-[50px]" src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo}`} />
                        //       </div>
                        //       <div className="w-[400px]">
                        //         <p className="text-[16px] font-semibold text-[#374151]">{res?.name}</p>
                        //         <p className={`text-[14px]  ${i === 0 ? "text-[#E44700]" : "text-[#9CA3AF]"} `}>Fraksi {res.partai?.name}</p>
                        //       </div>
                        //     </div>
                        //     <div className="flex justify-between items-center ">
                        //       <div className="flex flex-col justify-center">
                        //         <p className="text-[14px] text-[#6B7280]">Total Suara</p>
                        //         <p className="text-[16px] text-[#374151] font-bold">{res.suara}</p>
                        //       </div>
                        //       <p className={`${i === 0 ? "text-[#E44700]" : "text-[#374151] "} text-[18px] font-semibold`}>{res.persantase_suara.toFixed(1)} %</p>
                        //     </div>
                        //   </div>
                        // </div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          {user === "Relawan" ? (
            <>
              <div className={`${popup === false ? "hidden" : "visible"} fixed left-0 w-screen h-screen bg-[#37415152]`}>
                <div className="absolute bg-white py-12 rounded-sm px-12 left-[380px] top-[100px]">
                  <p onClick={() => setPopup(false)} className="absolute pr-2 text-[18px] font-medium text-[#374151] cursor-pointer top-0 right-0">
                    X
                  </p>
                  <p className="text-[#374151] text-[32px] font-bold">Upload Foto C1 Plano</p>
                  <div className="bg-[#FFECE480] mt-3">
                    <img src={alertInput.src} alt="alert_input.png" />
                  </div>
                  <div className="flex justify-between mt-3">
                    <p className="text-[#374151]">Upload Foto C Plano</p>
                    {plano === undefined ? (
                      <label htmlFor="input" className="flex flex-col items-center border py-4 px-16 rounded-md cursor-pointer">
                        <img src={uploadIcon.src} alt="uploadIcon.png" />

                        <p className="text-[12px] text-[#E44700] font-semibold">
                          Upload a file <span className="text-black">of drag and drop</span>
                        </p>
                        <p className="text-[12px]">PNG, JPG, PDF upto 5MB</p>
                      </label>
                    ) : (
                      <div>{plano !== undefined && <img className="w-[300px] h-[150px]" src={URL.createObjectURL(plano)} />}</div>
                    )}

                    <input onChange={(e) => setPlano(e.target.files[0])} id="input" className="hidden" type={"file"} />
                  </div>
                  <div className="flex justify-end">
                    <div onClick={postPlano} className="bg-[#E44700] text-white font-semibold py-2 px-4 mt-3 rounded-md cursor-pointer">
                      Upload Sekarang
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 ml-2">
                <p className="text-[32px] font-bold text-slate-700">Real Count DPR RI Dapil II Prov. NTB</p>
                <RealCountPenduduk />
                <div className="flex">
                  <div className="w-full">
                    <ProgresBar bgcolor={"#E44700"} progress={suaraMasuk} title={"Jumlah Suara Masuk"} />
                  </div>
                  Jumlah Suara Masuk
                </div>
                {roles === "admin" ||
                  (roles === "relawan" && (
                    <div className={` flex my-4 gap-3 `}>
                      <div className="bg-[#E44700] cursor-pointer flex items-center gap-2 py-2 px-4 rounded-sm">
                        <img src={inputIcon.src} alt="icon_input.png" />
                        <p onClick={() => setPopup(true)} className="text-white font-medium">
                          Input Data
                        </p>
                      </div>
                      <div onClick={() => router.push("./History")} className="py-2 px-4 rounded-sm cursor-pointer text-[#374151] font-medium border border-[#374151]">
                        Histori Upload
                      </div>
                    </div>
                  ))}
                <div>
                  <p className="font-bold text-slate-700 text-[18px]">Perolehan Suara Sementara</p>
                </div>

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
                    <div className="border-b-[0.5px]">
                      {dataPartai?.data?.map((res, i) =>
                        res === undefined ? (
                          <p>Loading...</p>
                        ) : (
                          <div key={res._id} className={`${i === 0 && "border-[#FF5001] border-[0.5px]"} h-[69px] border-t-[0.5px] flex justify-between px-[21px] items-center`}>
                            <div className="flex gap-3">
                              <img className="h-[50px] w-[40px]" src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo}`} />
                              <p className="text-[16px] w-[650px] flex items-center font-semibold text-[#374151]">{res?.name}</p>
                            </div>

                            <p className={`${i === 0 && "text-[#FF5001]"} text-[21px] font-semibold text-[#374151] flex items-center`}>{res.persantase_suara.toFixed(1)} %</p>
                          </div>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`${dataCalon?.data?.length === 0 ? "visible" : "hidden"} mb-4`}>
                      <AlertInput />
                    </div>
                    <div className="border-b-[0.5px]">
                      {dataCalon?.data.map((res, i) =>
                        res === undefined ? (
                          <p>Loading...</p>
                        ) : (
                          <div key={res._id} className={`${i === 0 && "border-[0.5px] border-[#FF5001]"} h-[69px] border-t-[0.5px]`}>
                            <div className="flex items-center justify-between px-[12px] gap-3 py-2">
                              <div className="flex gap-3">
                                <div className="flex items-center">
                                  <img className="h-[50px] w-[50px]" src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo}`} />
                                </div>
                                <div className="w-[500px]">
                                  <p className="text-[16px] font-semibold text-[#374151]">{res?.name}</p>
                                  <p className={`text-[14px]  ${i === 0 ? "text-[#E44700]" : "text-[#9CA3AF]"} `}>Fraksi {res.partai?.name}</p>
                                </div>
                              </div>
                              <div className="flex justify-between items-center w-[300px]">
                                <div className="flex flex-col justify-center">
                                  <p className="text-[14px] text-[#6B7280]">Total Suara</p>
                                  <p className="text-[16px] text-[#374151] font-bold">{res.suara}</p>
                                </div>
                                <p className={`${i === 0 ? "text-[#E44700]" : "text-[#374151] "} text-[21px] font-semibold`}>{res.persantase_suara.toFixed(1)} %</p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="p-8 ml-2">
              <p className="text-[32px] font-bold text-slate-700">Real Count DPR RI Dapil II Prov. NTB</p>
              <RealCountPenduduk />
              <ProgresBar bgcolor={"#E44700"} progress={suaraMasuk} title={"Jumlah Suara Masuk"} />
              <div className="flex">
                <div className="flex gap-3 items-center bg-[#FFECE4] px-4 py-2 rounded-md">
                  <DataRealcountIcon />
                  <p>Ada 18+ foto baru belum diinput</p>
                  <div onClick={() => router.push("relawan/History")} className="text-white font-medium py-2 px-4 rounded-md bg-[#E44700] cursor-pointer">
                    Lihat Detail
                  </div>
                </div>
              </div>
              <p className="font-bold text-slate-700 text-[18px] mt-[24px]">Perolehan Suara Sementara</p>
              <div className="flex gap-4 p-4">
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
                  <div className="border-b-[0.5px]">
                    {dataPartai?.data?.map((res, i) =>
                      res === undefined ? (
                        <p>Loading...</p>
                      ) : (
                        <div key={res._id} className={`${i === 0 && "border-[#FF5001] border-[0.5px]"} h-[69px] border-t-[0.5px] flex justify-between px-[21px] items-center`}>
                          <div className="flex gap-3">
                            <img className="h-[50px] w-[40px]" src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo}`} />
                            <p className="text-[16px] w-[650px] flex items-center font-semibold text-[#374151]">{res?.name}</p>
                          </div>

                          <p className={`${i === 0 && "text-[#FF5001]"} text-[21px] font-semibold text-[#374151] flex items-center`}>{res.persantase_suara.toFixed(1)} %</p>
                        </div>
                      )
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className={`${dataCalon?.data?.length === 0 ? "visible" : "hidden"} mb-4`}>
                    <AlertInput />
                  </div>
                  <div className="border-b-[0.5px]">
                    {dataCalon?.data.map((res, i) =>
                      res === undefined ? (
                        <p>Loading...</p>
                      ) : (
                        <div key={res._id} className={`${i === 0 && "border-[0.5px] border-[#FF5001]"} h-[69px] border-t-[0.5px]`}>
                          <div className="flex items-center justify-between px-[12px] gap-3 py-2">
                            <div className="flex gap-3">
                              <div className="flex items-center">
                                <img className="h-[50px] w-[50px]" src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo}`} />
                              </div>
                              <div className="w-[500px]">
                                <p className="text-[16px] font-semibold text-[#374151]">{res?.name}</p>
                                <p className={`text-[14px]  ${i === 0 ? "text-[#E44700]" : "text-[#9CA3AF]"} `}>Fraksi {res.partai?.name}</p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center w-[300px]">
                              <div className="flex flex-col justify-center">
                                <p className="text-[14px] text-[#6B7280]">Total Suara</p>
                                <p className="text-[16px] text-[#374151] font-bold">{res.suara}</p>
                              </div>
                              <p className={`${i === 0 ? "text-[#E44700]" : "text-[#374151] "} text-[21px] font-semibold`}>{res.persantase_suara.toFixed(1)} %</p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              <button onClick={() => router.push("RealCountAdmn")} className="mt-12 w-[220px] h-[42px] bg-[#E44700] text-white text-[18px] font-semibold rounded-md">
                Input Calon & Partai
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RealCount;
