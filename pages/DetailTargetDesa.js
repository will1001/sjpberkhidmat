import React, { useEffect, useState } from "react";
import Logo from "../src/utility/Logo";
import DataTable from "react-data-table-component";
import axiosFetch from "../src/API/axiosFetch";
import { useSelector } from "react-redux";

function DetailTargetDesa() {
  const customStyles = {
    headCells: {
      style: { backgroundColor: "#374151", color: "white" },
    },
  };
  const [detailTarget, setDetailTarget] = useState([]);

  let data = detailTarget.data ? detailTarget.data : [];
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    axiosFetch("get", `user/target/details?page=${1}&limit=50`, {}, token)
      .then((res) => setDetailTarget(res.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      name: "Desa / Kelurahan",
      selector: (row) => row.name,
    },
    {
      name: "Kecamatan",
      selector: (row) => row.kecamatan.name,
    },
    // {
    //   name: "Jml DPT/DPS",
    //   selector: (row) => row.email,
    // },
    {
      name: "Simpatisan",
      selector: (row) => row.jumlah_simpatisans,
    },
    {
      name: "Target",
      selector: (row) => row.targets?.target,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Edit",
      selector: (row) => row.aksi,
    },
  ];
  return (
    <>
      <div className="flex items-center">
        <Logo />
        <span className="ml-[50px] text-3xl font-bold">
          Detail Target Simpatisan Per Desa
        </span>
      </div>
      {/* <div className="">
        Kembali
      </div> */}
      <div className="px-[40px] py-[10px]">
        <DataTable columns={columns} data={data} customStyles={customStyles} />
      </div>
    </>
  );
}

export default DetailTargetDesa;
