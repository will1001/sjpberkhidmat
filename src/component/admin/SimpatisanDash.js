import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { DeletIcon } from "../../utility/icon/icon";
import axios from "axios";

const SimpatisanDash = () => {
  const base_url = "https://api.sjpberkhidmat.id/";

  const [simpatisan, setSimpatisan] = useState([]);

  useEffect(() => {
    axios.get(base_url + "user/simpatisan").then((res) => setSimpatisan(res.data));
  }, []);

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

  const data = simpatisan.data;

  // const data = [
  //   {
  //     id: 1,
  //     name: "Chandra Pradana",
  //     simpatisan: "444",
  //     nik: "rubensip@gmail.coms",
  //     email: "3485 8580 0238 751",
  //     gender: "Tokoh Agama",
  //     aksi: <DeletIcon />,
  //   },
  //   {
  //     id: 2,
  //     name: "Chandra Pradana",
  //     simpatisan: "444",
  //     nik: "rubensip@gmail.coms",
  //     email: "3485 8580 0238 751",
  //     gender: "Tokoh Agama",
  //     aksi: <DeletIcon />,
  //   },
  // ];
  return (
    <div>
      Simpatisan
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default SimpatisanDash;
