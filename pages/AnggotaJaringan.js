import React from "react";
import ButtonPrimary from "../src/component/ButtonPrimary";
import SearchInput from "../src/component/SearchInput";
import DataTable from "react-data-table-component";
import Pagination from "../src/component/Pagination";
import { useState } from "react";
import { DeletIcon, KembaliIcon } from "../src/utility/icon/icon";
import EditIcon from "../src/utility/icon/edit2.png";
import { useSelector } from "react-redux";
import FormInputItem from "../src/component/FormInputItem";
import Button from "../src/component/Button";

const AnggotaJaringan = () => {
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
        <div onClick={() => router.back()}>
          <Button
            title={"Kembali"}
            icon={<KembaliIcon />}
            text={"white"}
            w={"149px"}
            h={"53px"}
            bgColor={"rgb(51, 65, 85)"}
          />
        </div>
        <h1 className="text-4xl font-bold">
          Himpunan Pengusaha Muda Indonesia
        </h1>
        <div className="flex space-x-20">
          <div className="flex space-x-3">
            <div>
              <p>Ketua</p> <p>PJ Relawan</p>
            </div>
            <div>
              <p>: Digdaya Firgantoro</p> <p>: Marsudi Rajasa</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <div>
              <p>Target Anggota</p>
              <p>Alamat</p>
            </div>
            <div>
              <p>
                : 91/ <span className="text-orange-400">100</span>
              </p>
              <p>: Kotaraja, Kec. Sikur, Lombok Tmur</p>
            </div>
          </div>
        </div>
        <ButtonPrimary
          title={"Tambah Anggota"}
          action={() => setPopupTambah(true)}
        />
        <div className="flex justify-between">
          <SearchInput
            placeholder={"Cari Data"}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <DataTable columns={columns} data={data} customStyles={customStyles} />
        {/* <Pagination
    total={simpatisan?.metadata?.total}
    current_page={currentPage}
    setCurrentPage={setCurrentPage}
    total_page={simpatisan?.metadata?.totalPage}
  /> */}
      </div>
      {popupTambah && (
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
                  Tambah Anggota Jaringan
                </p>
                <p className="text-[16px] text-[#374151] font-bold">
                  Himpunan Pengusaha Muda Indonesia
                </p>
                <div>
                  <FormInputItem
                    label={"No KK"}
                    type="text"
                    onChange={
                      (e) => {}
                      // setFormData({ ...formData, kebutuhan: e.target.value })
                    }
                    //   value={formData.kebutuhan}
                  />
                  <FormInputItem
                    label={"NIK"}
                    type="text"
                    onChange={
                      (e) => {}
                      // setFormData({ ...formData, kebutuhan: e.target.value })
                    }
                    //   value={formData.kebutuhan}
                  />
                  <FormInputItem
                    label={"Nama"}
                    type="number"
                    onChange={
                      (e) => {}
                      // setFormData({ ...formData, kebutuhan: e.target.value })
                    }
                    //   value={formData.kebutuhan}
                  />
                  <FormInputItem
                    label={"Tempat Lahir"}
                    type="text"
                    onChange={
                      (e) => {}
                      // setFormData({ ...formData, kebutuhan: e.target.value })
                    }
                    //   value={formData.kebutuhan}
                  />
                  {/* <FormInputItem
                  label={"Tanggal Lahir"}
                  type="number"
                  onChange={
                    (e) => {}
                    // setFormData({ ...formData, kebutuhan: e.target.value })
                  }
                  //   value={formData.kebutuhan}
                /> */}
                  <div className="flex justify-between">
                    <p className="text-[16px] my-2 text-[#6B7280]">
                      Tanggal Lahir
                    </p>

                    <input
                      // disabled={disableForm === true ? true : false}
                      // value={formData.date_birth.split("T")[0]}
                      // onChange={(e) => setFormData({ ...formData, date_birth: e.target.value })}
                      className=" outline-0 border w-[51%] p-1"
                      type="date"
                      id="tanggal lahir"
                      name="trip-start"
                      defaultValue=""
                      min="1945-01-01"
                      max="2024-12-31"
                    />
                  </div>
                  <FormInputItem
                    label={"Jenis Kelamin"}
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
                      Input Anggota
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnggotaJaringan;
