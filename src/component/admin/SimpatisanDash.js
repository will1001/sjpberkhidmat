import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { DeletIcon } from "../../utility/icon/icon";
import useFetch from "../../API/useFetch";
import SearchInput from "../SearchInput";
import ButtonPrimary from "../ButtonPrimary";

import { showOrHidePopUpDash } from "../../redux/panelReducer";
import { useDispatch } from "react-redux";
const customStyles = {
  headCells: {
    style: { backgroundColor: "#374151", color: "white" },
  },
};

const SimpatisanDash = () => {
  const simpatisan = useFetch("get", "user/simpatisan?page=1");
  const dispatch = useDispatch();

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.name,
    },
    // {
    //   name: "Relawan",
    //   selector: (row) => row.relawan,
    // },
    {
      name: "NIK",
      selector: (row) => row.nik,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Jenis Kelamin",
      selector: (row) => row.simpatisan.gender,
    },
    // {
    //   name: "Aksi",
    //   selector: (row) => row.aksi,
    // },
  ];

  const data = simpatisan.data ? simpatisan.data : [];

  return (
    <div className="">
      <div className="flex justify-between items-center px-[40px] py-[10px]">
        <h1 className="text-4xl font-bold">Simpatisan</h1>
      </div>
      <div className="px-[40px] py-[10px]">
        <ButtonPrimary
          title={"Tambah Simpatisan"}
          action={() => {
            dispatch(showPopUpDashsimpatisan({}));
          }}
        />
      </div>
      <div className="flex justify-between items-center px-[40px] py-[10px]">
        <SearchInput
          placeholder={"Cari Data"}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div>
          <span>Urutkan </span>
          <select
            onChange={(e) => setSorting(e.target.value)}
            id="sorting"
            className="h-[40px] w-[363px] border text-[#374151] p-[5px] border-gray-400 rounded-md"
          >
            <option value="terbaru">Terbaru</option>
            <option value="terbanyak">Terbanyak Rekrut</option>
          </select>
        </div>
      </div>
      <div className="px-[40px] py-[10px]">
        <DataTable columns={columns} data={data} customStyles={customStyles} />
      </div>
    </div>
  );
};

export default SimpatisanDash;
