import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { DeletIcon } from "../../utility/icon/icon";
import useFetch from "../../API/useFetch";
import SearchInput from "../SearchInput";
import ButtonPrimary from "../ButtonPrimary";
import EditIcon from "../../utility/icon/edit2.png";

import { setEditData, showOrHidePopUpDash } from "../../redux/panelReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
const customStyles = {
  headCells: {
    style: { backgroundColor: "#374151", color: "white" },
  },
};

const SimpatisanDash = () => {
  const token = useSelector((state) => state.user.token);
  const router = useRouter();

  const simpatisan = useFetch(
    "get",
    `user/simpatisan?page=1&limit=100${
      router.query.id_kabupaten !== undefined
        ? "&id_kabupaten=" + router.query.id_kabupaten
        : ""
    }${
      router.query.id_kecamatan !== undefined
        ? "&id_kecamatan=" + router.query.id_kecamatan
        : ""
    }`,
    token
  );
  const dispatch = useDispatch();

  const editSimpatisan = (data) => {
    delete data.aksi;
    if (data) {
      dispatch(setEditData({ editData: JSON.stringify(data) }));
      dispatch(showOrHidePopUpDash({ type: "Simpatisan" }));
    }
  };
  const hapusSimpatisan = (email) => {
    if (confirm("Hapus Simpatisan ?")) {
      axiosFetch("delete", "user/users/simpatisan", { email }, token);
      // Save it!
      // console.log('Thing was saved to the database.');
      setTimeout(function () {
        //your code to be executed after 1 second
        location.reload();
      }, 1);
    } else {
      // Do nothing!
      // console.log('Thing was not saved to the database.');
    }
  };

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
      selector: (row) => (row.gender === "L" ? "Laki-Laki" : "Perempuan"),
    },
    {
      name: "Aksi",
      selector: (row) => row.aksi,
    },
  ];

  const data = simpatisan.data ? simpatisan.data : [];
  let i = 0;
  if (data) {
    for (const res of data) {
      data[i++].aksi = (
        <div className="flex justify-between w-[55px] cursor-pointer">
          <img
            onClick={() => {
              editSimpatisan(res);
            }}
            src={EditIcon.src}
          />
          <div
            onClick={() => {
              hapusSimpatisan(res.email);
            }}
          >
            <DeletIcon />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="">
      <div className="flex justify-between items-center px-[40px] py-[10px]">
        <h1 className="text-4xl font-bold">Simpatisan</h1>
      </div>
      <div className="px-[40px] py-[10px]">
        <ButtonPrimary
          title={"Tambah Simpatisan"}
          action={() => {
            dispatch(showOrHidePopUpDash({ type: "Simpatisan" }));
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
