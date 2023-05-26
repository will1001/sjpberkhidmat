import React, { useEffect } from "react";
import ButtonPrimary from "../src/component/ButtonPrimary";
import SearchInput from "../src/component/SearchInput";
import DataTable from "react-data-table-component";
import Pagination from "../src/component/Pagination";
import { useState } from "react";
import { DeletIcon, KembaliIcon } from "../src/utility/icon/icon";
import EditIcon from "../src/utility/icon/edit2.png";
import { useDispatch, useSelector } from "react-redux";
import FormInputItem from "../src/component/FormInputItem";
import Button from "../src/component/Button";
import { useRouter, withRouter } from "next/router";
import axiosFetch from "../src/API/axiosFetch";
import Moment from "moment";
import "moment/locale/id";
import { setIdJaringan } from "../src/redux/userReducer";

const AnggotaJaringan = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id_jaringan = useSelector((state) => state.user.id_jaringan);
  const [currentPage, setCurrentPage] = useState("1");
  const roles = useSelector((state) => state.user.roles);
  const [popupTambah, setPopupTambah] = useState(false);
  const [anggotaJaringan, setAnggotaJaringan] = useState(null);
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);
  const [keyword, setKeyword] = useState(null);
  const [form, setForm] = useState({
    id_periode: periode,
    id_jaringan,
  });

  const postAnggota = () => {
    axiosFetch("post", "user/jaringan/member", form, token)
      .then((res) => {
        setPopupTambah(false);
        setForm({
          id_periode: periode,
          id_jaringan,
        });
      })
      .catch((err) => console.log(err));
    window.location.reload(false);
  };

  const customStyles = {
    headCells: {
      style: { backgroundColor: "#374151", color: "white" },
    },
  };

  const gender = [
    {
      id: 0,
      name: "Laki-Laki",
    },
    {
      id: 1,
      name: "Perempuan",
    },
  ];

  const data = anggotaJaringan?.data ? anggotaJaringan?.data : [];

  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i + (currentPage - 1) * 10,
      width: "50px",
    },
    {
      name: "Nama Anggota",
      selector: (row) => row.nama,
    },
    {
      name: "No KK",
      selector: (row) => row.no_kk,
    },
    {
      name: "NIK",
      selector: (row) => row.nik,
    },
    {
      name: "Jenis Kelamin",
      selector: (row) => row.gender,
    },
    {
      name: "Tempat Lahir",
      selector: (row) => row.tmpt_lahir,
    },
    {
      name: "Tanggal Lahir",
      selector: (row) => Moment(row.tgl_lahir).format("DD-MMMM-YYYY"),
    },
    {
      name: "Alamat",
      selector: (row) => row.alamat,
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

  useEffect(() => {
    if (router.query.id) {
      dispatch(setIdJaringan({ id_jaringan: router.query.id }));
    }

    axiosFetch(
      "get",
      `user/jaringan/member?page=${currentPage}&id_jaringan=${
        id_jaringan ? id_jaringan : router.query.id
      }&limit=10`,
      {},
      token
    ).then((res) => setAnggotaJaringan(res.data));
  }, [currentPage, keyword, router.query.id_kabupaten]);
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
        <h1 className="text-4xl font-bold">{router.query.nama}</h1>
        <div className="flex space-x-20">
          <div className="flex space-x-3">
            <div>
              <p>Jaringan</p> <p>PJ Relawan</p>
            </div>
            <div>
              <p>: {router.query.nama}</p> <p>: {router.query.pj_relawan}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <div>
              <p>Target Anggota</p>
              <p>Alamat</p>
            </div>
            <div>
              <p>
                : 91/{" "}
                <span className="text-orange-400">{router.query.target}</span>
              </p>
              <p>: {router.query.alamat}</p>
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
                    onChange={(e) => {
                      setForm({ ...form, no_kk: e.target.value });
                    }}
                    value={form.no_kk}
                  />
                  <FormInputItem
                    label={"NIK"}
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, nik: e.target.value });
                    }}
                    value={form.nik}
                  />
                  <FormInputItem
                    label={"Nama"}
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, nama: e.target.value });
                    }}
                    value={form.nama}
                  />
                  <FormInputItem
                    label={"Tempat Lahir"}
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, tmpt_lahir: e.target.value });
                    }}
                    value={form.tmpt_lahir}
                  />
                  <div className="flex justify-between">
                    <p className="text-[16px] my-2 text-[#6B7280]">
                      Tanggal Lahir
                    </p>

                    <input
                      value={form.tgl_lahir?.split("T")[0]}
                      onChange={(e) =>
                        setForm({ ...form, tgl_lahir: e.target.value })
                      }
                      className=" outline-0 border w-[51%] p-1"
                      type="date"
                      id="tanggal lahir"
                      name="trip-start"
                      defaultValue=""
                      min="1945-01-01"
                      max="2024-12-31"
                    />
                  </div>
                  {/* <FormInputItem
                    label={"Jenis Kelamin"}
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, gender: e.target.value });
                    }}
                    value={form.gender}
                  /> */}
                  <div className="flex items-center">
                    <span className="w-[50%]">Jenis Kelamin</span>
                    <select
                      value={form.gender}
                      onChange={(e) =>
                        setForm({ ...form, gender: e.target.value })
                      }
                      className="border p-2 rounded-md outline-none w-[52%]"
                      type="text"
                    >
                      <option selected disabled>
                        Pilih Opsi
                      </option>
                      {gender.map((res) => (
                        <option key={res.id} value={res.name}>
                          {res.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <FormInputItem
                    label={"Alamat"}
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, alamat: e.target.value });
                    }}
                    value={form.alamat}
                  />
                  <div className="flex mt-[40px] justify-end">
                    <div
                      onClick={() => {
                        setForm({});
                      }}
                      className="h-[42px] mr-3 px-4 cursor-pointer flex justify-center items-center gap-2 border border-[#374151] text-[#374151] rounded-md"
                    >
                      <p className="text-[18px] font-semibold">Bersihkan </p>
                    </div>
                    <div
                      onClick={() => {
                        postAnggota();
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

export default withRouter(AnggotaJaringan);
