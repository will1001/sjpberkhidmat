import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { DeletIcon } from "../../utility/icon/icon";
import useFetch from "../../API/useFetch";

const SimpatisanDash = () => {
  const simpatisan = useFetch("get", "user/simpatisan?page=1");

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
      selector: (row) => row.gender,
    },
    // {
    //   name: "Aksi",
    //   selector: (row) => row.aksi,
    // },
  ];

  const data = simpatisan.data ? simpatisan.data.data : [];

  return (
    <div>
      Simpatisan
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default SimpatisanDash;
