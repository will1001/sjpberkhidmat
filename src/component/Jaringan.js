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
import FormSelect from "./FormSelect";
import ProgressBar from "../utility/ProgresBar";

const Jaringan = () => {
  const [currentPage, setCurrentPage] = useState("1");
  const roles = useSelector((state) => state.user.roles);
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);
  const [popupTambah, setPopupTambah] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [jaringan, setJaringan] = useState(null);
  const relawan = useFetch("get", "user/relawan?page=1&limit=100");
  // const totalAnggota = useFetch("get", "user/jaringan/member/total");
  const kabupaten = useFetch("get", "user/kabupaten");
  const kategoriJaringan = useFetch("get", "user/jaringan/kategori");
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [subKategoriJaringan, setSubKategoriJaringan] = useState([]);
  const [tipeForm, setTipeForm] = useState("post");
  const [idJaringan, setIdJaringan] = useState(null);

  const [form, setForm] = useState({
    id_periode: periode,
  });

  const router = useRouter();

  const getTotalAnggotaJaringan = (id_jaringan) => {
    const res = useFetch(
      "get",
      `user/jaringan/member/total?id_jaringan=${id_jaringan}`
    );
    return res.data;
  };
  const postJaringan = () => {
    if (tipeForm === "post") {
      axiosFetch("post", "user/jaringan", form, token)
        .then((res) => {
          setPopupTambah(false);
          setForm({
            id_periode: periode,
          });
        })
        .catch((err) => console.log(err));
    } else {
      axiosFetch("put", `user/jaringan/${idJaringan}`, form, token)
        .then((res) => {
          setPopupTambah(false);
        })
        .catch((err) => console.log(err));
    }
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
  const editJaringan = (res) => {
    setPopupTambah(true);
    setTipeForm("put");
    setIdJaringan(res._id);
    setForm({
      id_periode: periode,
      nama: res.nama,
      tokoh: res.tokoh,
      nama_tokoh: res.nama_tokoh,
      no_hp_tokoh: res.no_hp_tokoh,
      no_hp_relawan: res.no_hp_relawan,
      id_kabupaten: res.id_kabupaten,
      id_kecamatan: res.id_kecamatan,
      id_kelurahan: res.id_kelurahan,
      id_relawan: res.id_relawan,
      target: res.target,
      alamat: res.alamat,
    });
  };

  const changeKategoriJaringan = async (idKategoriJaringan) => {
    setForm({ ...form, kategori: idKategoriJaringan });
    const res = await axiosFetch(
      "get",
      `user/jaringan/sub-kategori?id_kategori=${idKategoriJaringan}`,
      {},
      token
    );
    setSubKategoriJaringan(res.data);
  };
  const filterJaringan = async (idKategori) => {
    axiosFetch(
      "get",
      `user/jaringan?page=${currentPage}&limit=10&id_kategori=${idKategori}`,
      {},
      token
    ).then((res) => setJaringan(res.data));
  };
  const changeKabupaten = async (idKabupaten) => {
    setForm({ ...form, id_kabupaten: idKabupaten });
    const res = await axiosFetch("get", `user/kecamatan/${idKabupaten}`);
    setKecamatan(res.data);
  };

  const changeKecamatan = async (idKecamatan) => {
    setForm({ ...form, id_kecamatan: idKecamatan });
    const res = await axiosFetch("get", `user/kelurahan/${idKecamatan}`);
    setKelurahan(res.data);
  };
  const customStyles = {
    headCells: {
      style: { backgroundColor: "#374151", color: "white" },
    },
  };

  const data = jaringan?.data ? jaringan?.data : [];
  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i + (currentPage - 1) * 10,
      width: "50px",
    },
    {
      name: "kategori Jaringan",
      selector: (row) => row.kategori_jaringan?.name,
    },
    {
      name: "Nama Jaringan",
      selector: (row) => row.sub_kategori?.name,
    },
    {
      name: "ketua",
      selector: (row) => row.nama_ketua,
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
      name: "No Hp PJ Relawan",
      selector: (row) => row.no_hp_relawan,
    },
    {
      name: "Target",
      selector: (row) => row.target,
    },
    {
      name: "Progres Target",
      selector: (row) => (
        <ProgressBar
          progress={Math.floor(
            (Number(getTotalAnggotaJaringan(row._id)) / row.target) * 100
          )}
          bgcolor={"#FF5001"}
          height={"24px"}
        />
      ),
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
              editJaringan(res);
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
                  kategori: res.kategori_jaringan?.name,
                  nama: res.sub_kategori?.name,
                  nama_ketua: res.nama_ketua,
                  no_hp_ketua: res.no_hp_ketua,
                  pj_relawan: res.relawan.name,
                  no_hp_relawan: res.no_hp_relawan,
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
  }, [currentPage, keyword, form]);
  return (
    <>
      {" "}
      <div className="m-10 space-y-5">
        <h1 className="text-4xl font-bold">Jaringan</h1>
        <ButtonPrimary
          title={"Tambah Jaringan"}
          action={() => {
            setTipeForm("post");
            setForm({
              id_periode: periode,
            });
            setPopupTambah(true);
          }}
        />
        <div className="flex justify-between items-center">
          <FormSelect
            label={"Filter "}
            onChange={(e) => filterJaringan(e.target.value)}
            options={kategoriJaringan}
            value={form.kategori}
          />
          <span
            className="cursor-pointer"
            onClick={() => {
              window.location.reload(false);
            }}
          >
            Reset Filter
          </span>
          {/* <SearchInput
            placeholder={"Cari Data"}
            onChange={(e) => setKeyword(e.target.value)}
          /> */}
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
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#37415152] overflow-scroll">
          <div className="flex justify-center mt-[50px] ">
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
                  <FormSelect
                    label={"Kategori Jaringan"}
                    onChange={(e) => changeKategoriJaringan(e.target.value)}
                    options={kategoriJaringan}
                    value={form.kategori}
                  />
                  {form.kategori === "3" ||
                  form.kategori === "6" ||
                  form.kategori === "7" ? (
                    <FormInputItem
                      label={"Nama Jaringan"}
                      type="text"
                      onChange={(e) => {
                        setForm({ ...form, nama: e.target.value });
                      }}
                      value={form.nama}
                    />
                  ) : (
                    <FormSelect
                      label={"Nama Jaringan"}
                      onChange={(e) => {
                        setForm({ ...form, nama: e.target.value });
                      }}
                      options={subKategoriJaringan}
                      value={form.nama}
                    />
                  )}

                  <div className="flex items-center">
                    {/* <span className="w-[33%]"></span> */}
                    {/* <select
                      value={form.tokoh}
                      onChange={(e) =>
                        setForm({ ...form, tokoh: e.target.value })
                      }
                      className="border p-2 rounded-md outline-none w-[31%] mr-1"
                      type="text"
                    >
                      <option selected disabled>
                        Pilih Tokoh
                      </option>
                      {tipe_jaringan.map((res) => (
                        <option key={res.id} value={res.name}>
                          {res.name}
                        </option>
                      ))}
                    </select> */}
                  </div>
                  <FormInputItem
                    label={"Ketua"}
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, nama_ketua: e.target.value });
                    }}
                    value={form.tokoh}
                  />
                  <FormInputItem
                    label={"No Hp"}
                    type="number"
                    onChange={(e) => {
                      setForm({ ...form, no_hp_ketua: e.target.value });
                    }}
                    value={form.no_hp_ketua}
                  />
                  <FormSelect
                    label={"Kabupaten"}
                    type="text"
                    onChange={(e) => changeKabupaten(e.target.value)}
                    options={kabupaten}
                    value={form.id_kabupaten}
                  />
                  <FormSelect
                    label={"Kecamatan"}
                    type="text"
                    onChange={(e) => changeKecamatan(e.target.value)}
                    options={kecamatan}
                    value={form.id_kecamatan}
                  />
                  <FormSelect
                    label={"Desa / Kelurahan"}
                    type="text"
                    onChange={(e) =>
                      setForm({ ...form, id_kelurahan: e.target.value })
                    }
                    options={kelurahan}
                    value={form.id_kelurahan}
                  />

                  <FormInputItem
                    label={"Alamat"}
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, alamat: e.target.value });
                    }}
                    value={form.alamat}
                  />

                  <div className="flex items-center">
                    <span className="w-[33%]">PJ Relawan</span>
                    <select
                      value={form.id_relawan}
                      onChange={(e) => {
                        setForm({ ...form, id_relawan: e.target.value });
                      }}
                      className="border p-2 rounded-md outline-none w-[67%]"
                      type="text"
                    >
                      <option selected disabled>
                        Pilih Relawan
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
                    value={form.no_hp_relawan}
                  />
                  <FormInputItem
                    label={"Target Anggota"}
                    type="number"
                    onChange={(e) => {
                      setForm({ ...form, target: e.target.value });
                    }}
                    value={form.target}
                  />

                  <div className="flex mt-[40px] justify-end">
                    {/* <div
                      onClick={() => {
                      }}
                      className="h-[42px] mr-3 px-4 cursor-pointer flex justify-center items-center gap-2 border border-[#374151] text-[#374151] rounded-md"
                    >
                      <p className="text-[18px] font-semibold">Bersihkan </p>
                    </div> */}
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
