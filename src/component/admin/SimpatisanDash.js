import React from "react";
import DataTable from "react-data-table-component";
import { DeletIcon } from "../../utility/icon/icon";

const SimpatisanDash = () => {
  const columns = [
    {
      name: "Nama",
      selector: (row) => row.name,
    },
    {
      name: "Relawan",
      selector: (row) => row.relawan,
    },
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
    {
      name: "Aksi",
      selector: (row) => row.aksi,
    },
  ];

  const data = [
    {
      id: 1,
      name: "Chandra Pradana",
      relawan: "444",
      nik: "rubensip@gmail.coms",
      email: "3485 8580 0238 751",
      gender: "Tokoh Agama",
      aksi: <DeletIcon />,
    },
    {
      id: 2,
      name: "Chandra Pradana",
      relawan: "444",
      nik: "rubensip@gmail.coms",
      email: "3485 8580 0238 751",
      gender: "Tokoh Agama",
      aksi: <DeletIcon />,
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default SimpatisanDash;
