import React, { useState } from "react";
import useFetch from "../API/useFetch";

import DropDown from "../utility/DropDown";
import {
  DropDownIcon,
  PilihPeriodeIcon,
  TambahPeriodeIcon,
} from "../utility/icon/icon";

const SelectPeriode = () => {
  const [initialPeriode, setInitialPeriode] = useState("2019-2024");
  const [Periode, setPeriode] = useState(false);

  const ListPeriode = useFetch("get", "user/periode");

  const cekListHandler = () => {
    setInitialPeriode("2024-2029");
  };
  const cekListHandler2 = () => {
    setInitialPeriode("2019-2024");
  };

  return (
    <>
      <button
        onClick={() => {
          setPeriode(!false);
        }}
      >
        <div className="w-[260px] h-[48px] bg-slate-700 rounded-sm flex justify-center gap-4 items-center">
          <p className="font-medium text-white text-[16px]">
            Periode 2019-2024
          </p>{" "}
          <DropDownIcon />
        </div>
      </button>
      <div
        className="top-0 left-0 bottom-0 w-screen h-[1000px] absolute z-50"
        style={{
          visibility: Periode === false ? "hidden" : "visible",
          backgroundColor: "rgba(55, 65, 81, 0.32)",
        }}
      >
        <div className="absolute w-[695px] h-[484px] left-[373px] top-[103px] bg-white z-50">
          <button
            onClick={() => {
              setPeriode(false);
            }}
            className="top-0 right-0 absolute"
          >
            <svg
              width="38"
              height="39"
              viewBox="0 0 38 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 32.5L18 20.5M6 20.5L18 32.5"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex flex-col items-start pt-6 pl-12">
            <p className="font-bold text-[32px] text-slate-700">
              Pilih Periode
            </p>
            {ListPeriode.data?.map((res, i) => {
              return (
                <button onClick={cekListHandler2}>
                  {initialPeriode === "2019-2024" ? (
                    <div className="flex gap-4 mb-4">
                      <svg
                        width="30"
                        height="31"
                        viewBox="0 0 30 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1"
                          y="1.00684"
                          width="28"
                          height="28"
                          rx="14"
                          stroke="#FF5001"
                          strokeWidth="2"
                        />
                        <rect
                          x="8"
                          y="8.00684"
                          width="14"
                          height="14"
                          rx="7"
                          fill="#FF5001"
                        />
                      </svg>
                      <p className="font-medium text-[18px] text-[#FF5001]">
                        {res.from}- {res.to}
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-4 mb-4">
                      <svg
                        width="30"
                        height="31"
                        viewBox="0 0 30 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1"
                          y="1.00684"
                          width="28"
                          height="28"
                          rx="14"
                          stroke="#D1D5DB"
                          strokeWidth="2"
                        />
                      </svg>
                      <p className="font-medium text-[18px] text-slate-700">
                        2019-2024
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
            <div className="mt-8">
              {/* <button onClick={cekListHandler2}>
                {initialPeriode === "2019-2024" ? (
                  <div className="flex gap-4 mb-4">
                    <svg
                      width="30"
                      height="31"
                      viewBox="0 0 30 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1.00684"
                        width="28"
                        height="28"
                        rx="14"
                        stroke="#FF5001"
                        strokeWidth="2"
                      />
                      <rect
                        x="8"
                        y="8.00684"
                        width="14"
                        height="14"
                        rx="7"
                        fill="#FF5001"
                      />
                    </svg>
                    <p className="font-medium text-[18px] text-[#FF5001]">
                      2019-2024
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-4 mb-4">
                    <svg
                      width="30"
                      height="31"
                      viewBox="0 0 30 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1.00684"
                        width="28"
                        height="28"
                        rx="14"
                        stroke="#D1D5DB"
                        strokeWidth="2"
                      />
                    </svg>
                    <p className="font-medium text-[18px] text-slate-700">
                      2019-2024
                    </p>
                  </div>
                )}
              </button> */}
            </div>

            {/* <button onClick={cekListHandler}>
              {initialPeriode === "2024-2029" ? (
                <div className="flex gap-4 mb-4">
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="1.00684"
                      width="28"
                      height="28"
                      rx="14"
                      stroke="#FF5001"
                      strokeWidth="2"
                    />
                    <rect
                      x="8"
                      y="8.00684"
                      width="14"
                      height="14"
                      rx="7"
                      fill="#FF5001"
                    />
                  </svg>
                  <p className="font-medium text-[18px] text-[#FF5001]">
                    2019-2024
                  </p>
                </div>
              ) : (
                <div className="flex gap-4 mb-4">
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="1.00684"
                      width="28"
                      height="28"
                      rx="14"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                    />
                  </svg>
                  <p className="font-medium text-[18px] text-slate-700">
                    2019-2024
                  </p>
                </div>
              )}
            </button> */}
            <p className="font-normal text-slate-700 text-[16px] mb-8 mt-4">
              Tambah Periode
            </p>
            <div className="flex items-center gap-6 mb-4">
              <DropDown />
              <p className="font-normal text-slate-700">Sampai</p>
              <DropDown />
              <button>
                <TambahPeriodeIcon />
              </button>
            </div>
            <button className="mt-16">
              <PilihPeriodeIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectPeriode;
