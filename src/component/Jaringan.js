import React from "react";
import ButtonPrimary from "./ButtonPrimary";
import SearchInput from "./SearchInput";
import DataTable from "react-data-table-component";
import Pagination from "./Pagination";
import { useState } from "react";
import { DeletIcon } from "../utility/icon/icon";
import EditIcon from "../utility/icon/edit2.png";
import { useSelector } from "react-redux";
import FormInputItem from "./FormInputItem";

const Jaringan = () => {
  const [currentPage, setCurrentPage] = useState("1");
  const roles = useSelector((state) => state.user.roles);
  const [popupTambah, setPopupTambah] = useState(false);

  const customStyles = {
    headCells: {
      style: { backgroundColor: "#374151", color: "white" },
    },
  };

  const data = [
    {
      nama: "test",
      ketua: "test",
      pj: "test",
      target: "test",
    },
  ];
  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i + (currentPage - 1) * 10,
      width: "50px",
    },
    {
      name: "Nama Jaringan",
      selector: (row) => row.nama,
    },
    {
      name: "Ketua",
      selector: (row) => row.ketua,
    },
    {
      name: "PJ Relawan",
      selector: (row) => row.pj,
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

  let i = 0;
  if (data) {
    for (const res of data) {
      data[i++].aksi = (
        <div className="flex justify-between w-[55px] cursor-pointer">
          <img
            onClick={() => {
              //   editSimpatisan(res);
            }}
            src={EditIcon.src}
          />
          {roles === "admin" && (
            <div
              onClick={() => {
                // hapusSimpatisan(res.email);
              }}
            >
              <DeletIcon />
            </div>
          )}
        </div>
      );
    }
  }
  return (
    <>
      {" "}
      <div className="m-10 space-y-5">
        <h1 className="text-4xl font-bold">Jaringan</h1>
        <ButtonPrimary
          title={"Tambah Jaringan"}
          action={() => setPopupTambah(true)}
        />
        <div className="flex justify-between">
          <SearchInput
            placeholder={"Cari Data"}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div>
            <span>Urutkan </span>
            <select
              // onChange={(e) => setSorting(e.target.value)}
              id="sorting"
              className="h-[40px] w-[363px] border text-[#374151] p-[5px] border-gray-400 rounded-md"
            >
              <option value="terbaru">Terbaru</option>
              <option value="terbanyak">Terbanyak Rekrut</option>
            </select>
          </div>
        </div>
        <DataTable columns={columns} data={data} customStyles={customStyles} />
        {/* <Pagination
    total={simpatisan?.metadata?.total}
    current_page={currentPage}
    setCurrentPage={setCurrentPage}
    total_page={simpatisan?.metadata?.totalPage}
  /> */}
      </div>
      <div className="fixed top-0 left-0 w-screen h-screen bg-[#37415152]">
        <div className="flex justify-center mt-[80px]">
          <div className="bg-white">
            <div
              onClick={() => setPopupTambah(false)}
              className="flex justify-end pr-2 font-medium text-[#9CA3AF] cursor-pointer"
            >
              x
            </div>
            <div className="pl-[50px] pr-[81px] pb-[50px]">
              {" "}
              <p className="text-[32px] text-[#374151] font-bold">
                Tambah Jaringan
              </p>
              <div>
                <FormInputItem
                  label={"Nama Jarigan"}
                  type="text"
                  onChange={
                    (e) => {}
                    // setFormData({ ...formData, kebutuhan: e.target.value })
                  }
                  //   value={formData.kebutuhan}
                />
                <FormInputItem
                  label={"Ketua"}
                  type="text"
                  onChange={
                    (e) => {}
                    // setFormData({ ...formData, kebutuhan: e.target.value })
                  }
                  //   value={formData.kebutuhan}
                />
                <FormInputItem
                  label={"No Hp Ketua"}
                  type="number"
                  onChange={
                    (e) => {}
                    // setFormData({ ...formData, kebutuhan: e.target.value })
                  }
                  //   value={formData.kebutuhan}
                />
                <FormInputItem
                  label={"PJ Relawan"}
                  type="text"
                  onChange={
                    (e) => {}
                    // setFormData({ ...formData, kebutuhan: e.target.value })
                  }
                  //   value={formData.kebutuhan}
                />
                <FormInputItem
                  label={"No HP PJ Relawan"}
                  type="number"
                  onChange={
                    (e) => {}
                    // setFormData({ ...formData, kebutuhan: e.target.value })
                  }
                  //   value={formData.kebutuhan}
                />
                <FormInputItem
                  label={"Target Anggota"}
                  type="text"
                  onChange={
                    (e) => {}
                    // setFormData({ ...formData, kebutuhan: e.target.value })
                  }
                  //   value={formData.kebutuhan}
                />
                <FormInputItem
                  label={"Alamat"}
                  type="text"
                  onChange={
                    (e) => {}
                    // setFormData({ ...formData, kebutuhan: e.target.value })
                  }
                  //   value={formData.kebutuhan}
                />
                <div className="flex mt-[40px] justify-end">
                  <div
                    onClick={() => {
                      //   dispatch(showOrHidePopUpDash({ type: null }));
                    }}
                    className="h-[42px] mr-3 px-4 cursor-pointer flex justify-center items-center gap-2 border border-[#374151] text-[#374151] rounded-md"
                  >
                    {/* <img src={homeIcn.src} /> */}
                    <p className="text-[18px] font-semibold">Bersihkan </p>
                  </div>
                  <div
                    onClick={() => {
                      //   postLogistic();
                    }}
                    className="h-[42px] w-[140px] bg-[#E44700] rounded-md  cursor-pointer  text-[18px] text-white font-semibold items-center justify-center gap-2 flex"
                  >
                    Tambah Data
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jaringan;
