import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DeletIcon } from "../../utility/icon/icon";
import PeopleIcon from "../../utility/icon/people.png";
import axios from "axios";
import SearchInput from "../searchInput";
import useFetch from "../../API/useFetch";
import ButtonPrimary from "../ButtonPrimary";

const RelawanDash = () => {
  const relawan = useFetch("get", "user/relawan?page=1");
  const pekerjaan = useFetch("get", "user/jobs");

  const columns = [
    {
      name: "Nama Relawan",
      selector: (row) => row.name,
    },
    {
      name: "Jumlah Rekrut",
      selector: (row) => row.jumlah_simpatisans,
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "No Hp",
      selector: (row) => row.phone,
    },
    {
      name: "pekerjaan",
      selector: (row) => row.pekerjaan,
    },
    {
      name: "Target Desa",
      selector: (row) => row.target_desa.name,
    },
    {
      name: "Aksi",
      selector: (row) => row.aksi,
    },
  ];
  let data = relawan.data ? relawan.data : [];
  let i = 0;
  if (data) {
    for (const res of data) {
      data[i++].aksi = <DeletIcon />;
    }
  }

  return (
    <div className="">
      <div className="flex justify-between items-center px-[40px] py-[10px]">
        <h1 className="text-4xl font-bold">Relawan</h1>
        <div className="flex items-center border border-orange-400 p-[5px] rounded-lg">
          <img src={PeopleIcon.src} className="h-[36px] m-[5px]" />
          <div>
            <p className="text-orange-500 text-2xl">{relawan.metaData?.total}</p>
            <p className="text-xl">Relawan</p>
          </div>
        </div>
      </div>
      <div className="px-[40px] py-[10px]">
        <ButtonPrimary title={"Tambah Akun Relawan"} action={() => {}} />
      </div>
      <div className="flex justify-between items-center px-[40px] py-[10px]">
        <SearchInput placeholder={"Cari Data"} />
        <select
          // onChange={(e) =>
          //   setFormData({ ...formData, pekerjaan: e.target.value })
          // }
          id="pekerjaan"
          className="h-[40px] w-[363px] border text-[#374151]"
        >
          <option value="" disabled selected>
            Pilih Pekerjaan
          </option>
          {pekerjaan.data?.map((res, i) => {
            return (
              <option key={i} value={res._id}>
                {res.name}
              </option>
            );
          })}
        </select>
        <div>
          <span>Urutkan </span>
          <select
            // onChange={(e) =>
            //   setFormData({ ...formData, pekerjaan: e.target.value })
            // }
            id="pekerjaan"
            className="h-[40px] w-[363px] border text-[#374151] p-[5px] border-gray-400 rounded-md"
          >
            <option value="terbaru">Terbaru</option>
            <option value="terbanyak">Terbanyak Rekrut</option>
          </select>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default RelawanDash;
