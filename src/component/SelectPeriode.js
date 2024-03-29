import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosFetch from "../API/axiosFetch";
import useFetch from "../API/useFetch";
import { setIdPeriode } from "../redux/panelReducer";

import DropDown from "../utility/DropDown";
import { DropDownIcon, PilihPeriodeIcon, TambahPeriodeIcon } from "../utility/icon/icon";

const SelectPeriode = ({ setPopupPeriode }) => {
  const [initialPeriode, setInitialPeriode] = useState("2019 - 2024");
  const [active, setActive] = useState(false);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [popup, setPopup] = useState(false);
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);

  const [dataPeriode, setDataPeriode] = useState();

  useEffect(() => {
    axiosFetch("get", "user/periode", {}, token).then((res) => setDataPeriode(res));
  }, [from, to]);

  const selectPeriode = (periode) => {
    setInitialPeriode !== periode && setInitialPeriode(periode);
  };

  // const postPeriode = async () => {
  //   const a = new FormData();
  //   a.append("from", from);
  //   a.append("to", to);
  //   {
  //     await axiosFetch("post", `user/periode`, a, token)
  //       .then((res) => {
  //         console.log(res);
  //         setFrom();
  //         setTo();
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };
  const dispatch = useDispatch();

  // const test = dispatch(setIdPeriode({ idPeriode: initialPeriode }));
  // dispatch(setToken({ token: res.data.access_token, roles: res.data.roles }));

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
        <div>
          <button
            className="  bg-slate-700 rounded-sm px-3 w-full py-2"
            onClick={() => {
              setPopup(!false);
              setPopupPeriode(true);
            }}
          >
            <p className="font-medium text-white text-[16px]">Periode {dataPeriode?.data?.data[0].from} - {dataPeriode?.data?.data[0].to}</p>
          </button>
          {popup === true && (
            <div className="fixed top-0 left-0 w-screen px-[21px] flex justify-center h-screen bg-[#37415152]" onClick={() => setPopup(false)}>
              <div className="absolute bg-white w-[320px] mt-[80px] px-[16px] pb-[80px] text-center">
                <p onClick={() => setPopup(false)} className="absolute right-0 pr-2 py-1 font-medium">
                  X
                </p>
                <p className="text-[21px] mt-[21px] font-bold text-[#374151] mb-[21px]">Pilih Periode</p>
                {dataPeriode?.data?.data?.map((res, i) => {
                  return (
                    <button key={i} onClick={() => dispatch(setIdPeriode({ idPeriode: `${res.from} - ${res.to}` }))}>
                      {periode === `${res.from} - ${res.to}` ? (
                        <div className="flex gap-4 mb-4">
                          <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1.00684" width="28" height="28" rx="14" stroke="#FF5001" strokeWidth="2" />
                            <rect x="8" y="8.00684" width="14" height="14" rx="7" fill="#FF5001" />
                          </svg>
                          <p className={"font-medium text-[18px] text-[#FF5001]"}>
                            {res.from} - {res.to}
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-4 mb-4">
                          <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1.00684" width="28" height="28" rx="14" stroke="#D1D5DB" strokeWidth="2" />
                          </svg>
                          <p className="font-medium text-[18px] text-[#D1D5DB]">
                            {res.from} - {res.to}
                          </p>
                        </div>
                      )}
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    // dispatch(setIdPeriode({ idPeriode: initialPeriode }));
                    setPopup(false);
                  }}
                  className="mt-16"
                >
                  <PilihPeriodeIcon />
                </button>
              </div>
            </div>
          )}
          <div className="border-[1px] my-6" />
        </div>
      ) : (
        <>
          <button
            className="  bg-slate-700 rounded-sm px-3 w-full py-2"
            onClick={() => {
              setPopup(!false);
              setPopupPeriode(true);
            }}
          >
            <p className="font-medium text-white text-[16px]">Periode {dataPeriode?.data?.data[0].from} - {dataPeriode?.data?.data[0].to}</p>
          </button>
          <div
            className="top-0 left-0 w-screen h-[1000px] fixed "
            style={{
              visibility: popup === false ? "hidden" : "visible",
              backgroundColor: "rgba(55, 65, 81, 0.32)",
            }}
          >
            <div className="absolute w-[695px] pb-12 rounded-sm left-[373px] top-[103px] bg-white z-50">
              <button
                onClick={() => {
                  setPopup(false);
                  setPopupPeriode(false);
                }}
                className="top-0 right-0 absolute pr-2 font-medium text-[21px]"
              >
                X
              </button>

              <div className="flex flex-col items-start pt-6 pl-12">
                <p className="font-bold text-[32px] text-slate-700 mb-3">Pilih Periode</p>
                {dataPeriode?.data?.data?.map((res, i) => {
                  return (
                    <button key={i} onClick={() => dispatch(setIdPeriode({ idPeriode: res._id }))}>
                      {periode === `${res.from} - ${res.to}` ? (
                        <div className="flex gap-4 mb-4">
                          <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1.00684" width="28" height="28" rx="14" stroke="#FF5001" strokeWidth="2" />
                            <rect x="8" y="8.00684" width="14" height="14" rx="7" fill="#FF5001" />
                          </svg>
                          <p className={"font-medium text-[18px] text-[#FF5001]"}>
                            {res.from} - {res.to}
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-4 mb-4">
                          <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1.00684" width="28" height="28" rx="14" stroke="#D1D5DB" strokeWidth="2" />
                          </svg>
                          <p className="font-medium text-[18px] text-[#D1D5DB]">
                            {res.from} - {res.to}
                          </p>
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* <p className="font-normal text-slate-700 text-[16px] mb-8 mt-4">Tambah Periode</p>
            <div className="flex items-center gap-6 mb-4"> */}
                {/* onp */}
                {/* <input value={from} onChange={(e) => setFrom(e.target.value)} className="p-2 outline-0 border rounded-md w-[150px]" type={"number"} />
              <p className="font-normal text-slate-700">Sampai</p>
              <input value={to} onChange={(e) => setTo(e.target.value)} className="p-2 outline-0 border rounded-md w-[150px]" type={"number"} />
              <button className="cursor-pointer" onClick={postPeriode}>
                <TambahPeriodeIcon />
              </button>
            </div> */}
                <button
                  onClick={() => {
                    // dispatch(setIdPeriode({ idPeriode: initialPeriode }));
                    setPopup(false);
                  }}
                  className="mt-16"
                >
                  <PilihPeriodeIcon />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SelectPeriode;
