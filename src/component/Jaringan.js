import React, { useEffect } from "react";
import ButtonPrimary from "./ButtonPrimary";
import SearchInput from "./SearchInput";
import DataTable from "react-data-table-component";
import Pagination from "./Pagination";
import { useState } from "react";
import { DeletIcon, DetailIcon } from "../utility/icon/icon";
import EditIcon from "../utility/icon/edit2.png";
import { useSelector } from "react-redux";
import FormInputItem from "./FormInputItem";
import axiosFetch from "../API/axiosFetch";
import useFetch from "../API/useFetch";
import { useRouter } from "next/router";

const Jaringan = () => {
  const [currentPage, setCurrentPage] = useState("1");
  const roles = useSelector((state) => state.user.roles);
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);
  const [popupTambah, setPopupTambah] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [jaringan, setJaringan] = useState(null);
  const relawan = useFetch("get", "user/relawan?page=1&limit=100");
  const [form, setForm] = useState({
    id_periode: periode,
  });

  const router = useRouter();

  const postJaringan = () => {
    axiosFetch("post", "user/jaringan", form, token)
      .then((res) => {
        setPopupTambah(false);
        setForm({
          id_periode: periode,
        });
      })
      .catch((err) => console.log(err));
    window.location.reload(false);
  };
  const deleteJaringan = (id) => {
    if (confirm("Hapus Jaringan ?")) {
      axiosFetch("delete", `user/jaringan/${id}`, {}, token)
        .then((res) => {
          setPopupTambah(false);
        })
        .catch((err) => console.log(err));
      window.location.reload(false);
    } else {
      // Do nothing!
      // console.log('Thing was not saved to the database.');
    }
  };

  const customStyles = {
    headCells: {
      style: { backgroundColor: "#374151", color: "white" },
    },
  };

  const tipe_jaringan = [
    {
      id: 0,
      name: "Ketua",
    },
    {
      id: 1,
      name: "Kepala Desa",
    },
    {
      id: 2,
      name: "Tokoh Pemuda",
    },
    {
      id: 3,
      name: "Tokoh Agama",
    },
    {
      id: 4,
      name: "Tokoh Adat",
    },
  ];

  const data = jaringan?.data ? jaringan?.data : [];
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
      name: "No HP",
      selector: (row) => row.no_hp_ketua,
    },
    {
      name: "PJ Relawan",
      selector: (row) => row.relawan.name,
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
        <div className="flex justify-between w-[75px] cursor-pointer items-center">
          <img
            onClick={() => {
              //   editSimpatisan(res);
            }}
            src={EditIcon.src}
          />
          {roles === "admin" && (
            <div
              onClick={() => {
                deleteJaringan(res._id);
              }}
            >
              <DeletIcon />
            </div>
          )}
          <div
            onClick={() => {
              router.push({
                pathname: "/AnggotaJaringan",
                query: {
                  nama: res.nama,
                  pj_relawan: res.relawan.name,
                  id: res._id,
                  target: res.target,
                  alamat: res.alamat,
                },
              });
            }}
          >
            <DetailIcon />
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    axiosFetch(
      "get",
      `user/jaringan?page=${currentPage}&limit=10`,
      {},
      token
    ).then((res) => setJaringan(res.data));
  }, [currentPage, keyword]);
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
          {/* <div>
            <span>Urutkan </span>
            <select
              // onChange={(e) => setSorting(e.target.value)}
              id="sorting"
              className="h-[40px] w-[363px] border text-[#374151] p-[5px] border-gray-400 rounded-md"
            >
              <option value="terbaru">Terbaru</option>
              <option value="terbanyak">Terbanyak Rekrut</option>
            </select>
          </div> */}
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
                  Tambah Jaringan
                </p>
                <div>
                  <div className="flex items-center">
                    <span className="w-[50%]">Nama Jaringan</span>
                    <select
                      value={form.nama}
                      onChange={(e) =>
                        setForm({ ...form, nama: e.target.value })
                      }
                      className="border p-2 rounded-md outline-none w-[52%]"
                      type="text"
                    >
                      <option selected disabled>
                        Pilih Opsi
                      </option>
                      {tipe_jaringan.map((res) => (
                        <option key={res.id} value={res.name}>
                          {res.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <FormInputItem
                    label={"No Hp Ketua"}
                    type="number"
                    onChange={(e) => {
                      setForm({ ...form, no_hp_ketua: e.target.value });
                    }}
                    // value={form.kebutuhan}
                  />

                  <div className="flex items-center">
                    <span className="w-[50%]">PJ Relawan</span>
                    <select
                      //    value={formAPK.id_relawan}

                      onChange={(e) => {
                        setForm({ ...form, id_relawan: e.target.value });
                      }}
                      className="border p-2 rounded-md outline-none w-[52%]"
                      type="text"
                    >
                      <option selected disabled>
                        Pilih Opsi
                      </option>
                      {relawan?.data?.map((res) => (
                        <option key={res._id} value={res._id}>
                          {res.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <FormInputItem
                    label={"No HP PJ Relawan"}
                    type="number"
                    onChange={(e) => {
                      setForm({ ...form, no_hp_relawan: e.target.value });
                    }}
                    //   value={formData.kebutuhan}
                  />
                  <FormInputItem
                    label={"Target Anggota"}
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, target: e.target.value });
                    }}
                    //   value={formData.kebutuhan}
                  />
                  <FormInputItem
                    label={"Alamat"}
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, alamat: e.target.value });
                    }}
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
                        postJaringan();
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
      )}
    </>
  );
};

export default Jaringan;
