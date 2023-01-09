import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DeletIcon } from "../../utility/icon/icon";
import axios from "axios";

const RelawanDash = () => {
  const base_url = "https://api.sjpberkhidmat.id/";

  const [relawan, setRelawan] = useState([]);

  useEffect(() => {
    axios.get(base_url + "user/relawan").then((res) => setRelawan(res.data));
  }, []);

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
      name: "Jabatan",
      selector: (row) => row.jabatan,
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
  //   const data2 = (relawan.data[0].aksi = <DeletIcon />);
  let data = relawan.data;
  let i = 0;
  if (data) {
    for (const res of data) {
      data[i++].aksi = <DeletIcon />;
    }
  }

  // const data = [
  //   {
  //     id: 1,
  //     nama: "Chandra Pradana",
  //     rekrut: "444",
  //     email: "rubensip@gmail.coms",
  //     noHp: "3485 8580 0238 751",
  //     jabatan: "Tokoh Agama",
  //     target: "Barabali, Beber",
  //     aksi: <DeletIcon />,
  //   },
  //   {
  //     id: 2,
  //     nama: "Beetlejuice",
  //     rekrut: "1988",
  //     email: "1988",
  //     noHp: "1988",
  //     jabatan: "1988",
  //     target: "1988",
  //     aksi: <DeletIcon />,
  //   },
  // ];
  return (
    <div>
      Relawan
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default RelawanDash;
