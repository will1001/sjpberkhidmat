import React from "react";
import DataTable from "react-data-table-component";
import { DeletIcon } from "../../utility/icon/icon";

const RelawanDash = () => {
  const columns = [
    {
      name: "Nama Relawan",
      selector: (row) => row.nama,
    },
    {
      name: "Jumlah Rekrut",
      selector: (row) => row.rekrut,
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "No Hp",
      selector: (row) => row.noHp,
    },
    {
      name: "Jabatan",
      selector: (row) => row.jabatan,
    },
    {
      name: "Target",
      selector: (row) => row.target,
    },
    {
      name: "Aksi",
      selector: (row) => row.aksi,
    },
  ];

  const data = [
    {
      id: 1,
      nama: "Chandra Pradana",
      rekrut: "444",
      email: "rubensip@gmail.coms",
      noHp: "3485 8580 0238 751",
      jabatan: "Tokoh Agama",
      target: "Barabali, Beber",
      aksi: <DeletIcon />,
    },
    {
      id: 2,
      nama: "Beetlejuice",
      rekrut: "1988",
      email: "1988",
      noHp: "1988",
      jabatan: "1988",
      target: "1988",
      aksi: <DeletIcon />,
    },
  ];
  return (
    <div>
      Relawan
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default RelawanDash;
