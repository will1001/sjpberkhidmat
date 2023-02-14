import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosFetch from "../API/axiosFetch";
import useFetch from "../API/useFetch";
import { setIdPeriode } from "../redux/panelReducer";

import DropDown from "../utility/DropDown";
import { DropDownIcon, PilihPeriodeIcon, TambahPeriodeIcon } from "../utility/icon/icon";

const SelectPeriode = () => {
  const [initialPeriode, setInitialPeriode] = useState("2019-2024");
  const [active, setActive] = useState(false);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [popup, setPopup] = useState(false);
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);

  const ListPeriode = useFetch("get", "user/periode");
  const [dataPeriode, setDataPeriode] = useState();

  useEffect(() => {
    axiosFetch("get", "user/periode", {}, token).then((res) => setDataPeriode(res));
  }, [from, to]);

  const selectPeriode = (periode) => {
    setInitialPeriode !== periode && setInitialPeriode(periode);
  };

  const postPeriode = async () => {
    const a = new FormData();
    a.append("from", from);
    a.append("to", to);
    {
      await axiosFetch("post", `user/periode`, a, token)
        .then((res) => {
          console.log(res);
          setFrom();
          setTo();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const dispatch = useDispatch();

  // const test = dispatch(setIdPeriode({ idPeriode: initialPeriode }));
  // dispatch(setToken({ token: res.data.access_token, roles: res.data.roles }));

  // console.log(dataPeriode);

  return (
    <>
      <button
        className="  bg-slate-700 rounded-sm px-3 w-full py-2"
        onClick={() => {
          setPopup(!false);
        }}
      >
        <p className="font-medium text-white text-[16px]">Periode {periode}</p>
      </button>
      <div
        className="top-0 left-0 bottom-0 w-screen h-[1000px] absolute z-50"
        style={{
          visibility: popup === false ? "hidden" : "visible",
          backgroundColor: "rgba(55, 65, 81, 0.32)",
        }}
      >
        <div className="absolute w-[695px] pb-12 rounded-sm left-[373px] top-[103px] bg-white z-50">
          <button
            onClick={() => {
              setPopup(false);
            }}
            className="top-0 right-0 absolute"
          ></button>

          <div className="flex flex-col items-start pt-6 pl-12">
            <p className="font-bold text-[32px] text-slate-700 mb-3">Pilih Periode</p>
            {dataPeriode?.data?.data?.map((res, i) => {
              return (
                <button key={i} onClick={() => selectPeriode(`${res.from} - ${res.to}`)}>
                  {initialPeriode === `${res.from} - ${res.to}` ? (
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

            <p className="font-normal text-slate-700 text-[16px] mb-8 mt-4">Tambah Periode</p>
            <div className="flex items-center gap-6 mb-4">
              {/* onp */}
              <input value={from} onChange={(e) => setFrom(e.target.value)} className="p-2 outline-0 border rounded-md w-[150px]" type={"number"} />
              <p className="font-normal text-slate-700">Sampai</p>
              <input value={to} onChange={(e) => setTo(e.target.value)} className="p-2 outline-0 border rounded-md w-[150px]" type={"number"} />
              <button className="cursor-pointer" onClick={postPeriode}>
                <TambahPeriodeIcon />
              </button>
            </div>
            <button
              onClick={() => {
                dispatch(setIdPeriode({ idPeriode: initialPeriode }));
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
  );
};

export default SelectPeriode;
