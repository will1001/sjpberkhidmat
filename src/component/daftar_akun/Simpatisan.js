import React, { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import axios from "axios";
import { useRouter } from "next/router";

const Simpatisan = () => {
  const router = new useRouter();
  const base_url = "https://api.sjpberkhidmat.id/";

  const [relawan, setRelawan] = useState([]);

  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    id_relawan: "",
    nik: "",
    email: "",
    date_birth: "",
    gender: "",
    phone: "",
    id_kabupaten: "",
    id_kecamatan: "",
    id_desa: "",
    address: "",
  });

  useEffect(() => {
    axios.get(base_url + "user/relawan").then((res) => setRelawan(res.data));
    axios
      .get(base_url + "user/kabupaten")
      .then((res) => setKabupaten(res.data));
  }, [kabupaten, kecamatan, kelurahan]);

  const changeKabupaten = (idKabupaten) => {
    setFormData({ ...formData, id_kabupaten: idKabupaten });
    axios.get(base_url + `user/kecamatan/${idKabupaten}`).then((res) => {
      setKecamatan(res.data);
    });
  };

  const changeKecamatan = (idKecamatan) => {
    setFormData({ ...formData, id_kecamatan: idKecamatan });
    axios.get(base_url + `user/kelurahan/${idKecamatan}`).then((res) => {
      setKelurahan(res.data);
    });
  };

  const daftarSimpatisan = () => {
    axios.post(base_url + `user/simpatisan`, formData).then((res) => {
      alert("Pendaftaran Berhasil!");
      router.push({
        pathname: "/Admin",
        query: { component: "Simpatisan" },
      });
      console.log(res.data);
    });
  };

  return (
    <form>
      <div className="pl-[67px] ">
        {/* relawan pengajak */}
        <div>
          <p className="text-[#D1D5DB] font-medium ">RELAWAN</p>
          <div className="flex items-center">
            <label
              htmlFor="pengjak"
              className="text-[14px] text-[#374151] pr-[72px]"
            >
              Relawan Pengajak (Opsional)
            </label>
            <select
              onChange={(e) =>
                setFormData({ ...formData, id_relawan: e.target.value })
              }
              id="pengajak"
              className="h-[40px] w-[363px] border text-[#374151]"
            >
              <option value="" disabled selected>
                Pilih Relawan
              </option>
              {relawan.data?.map((res, i) => {
                return (
                  <option key={i} value={res._id}>
                    {res.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="border-b-2 my-[30px]" />
        {/* identitas pribadi    */}
        <div className="flex flex-col gap-3">
          <p className="text-[#D1D5DB] font-medium ">IDENTITAS PRIBADI</p>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="nama" className="text-[14px] text-[#374151] ">
              Nama
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0"
              type={"text"}
              id="nama"
            />
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="NIK" className="text-[14px] text-[#374151] ">
              NIK
            </label>
            <PatternFormat
              onChange={(e) =>
                setFormData({ ...formData, nik: e.target.value })
              }
              id="NIK"
              format="#### #### #### ###"
              allowEmptyFormatting
              className="h-[40px] w-[363px] px-2 outline-0 border text-[#374151]"
            />
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="email" className="text-[14px] text-[#374151] ">
              Email
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0"
              type={"email"}
              id="email"
            />
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="gender" className="text-[14px] text-[#374151] ">
              Jenis Kelamin
            </label>
            <select
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              id="gender"
              className="h-[40px] w-[363px] border text-[#374151] outline-0"
            >
              <option value="" selected disabled>
                Pilih Jenis Kelamin
              </option>
              <option value="L">L</option>
              <option value="P">P</option>
            </select>
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label
              htmlFor="tanggal lahir"
              className="text-[14px] text-[#374151] "
            >
              Tgl Lahir
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, date_birth: e.target.value })
              }
              className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0"
              type="date"
              id="tanggal lahir"
              name="trip-start"
              defaultValue=""
              min="1945-01-01"
              max="2024-12-31"
            ></input>
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="noHP" className="text-[14px] text-[#374151] ">
              NO HP
            </label>
            <PatternFormat
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              id="noHp"
              format="###-###-###-###"
              allowEmptyFormatting
              mask={""}
              className="h-[40px] w-[363px] px-2 outline-0 border text-[#374151]"
            />
          </div>
        </div>
        <div className="border-b-2 my-[30px]" />
        {/* alamat simpatisan */}
        <div className="flex flex-col gap-3">
          <p className="text-[#D1D5DB] font-medium ">IDENTITAS PRIBADI</p>
          <div className="flex justify-between items-center pr-[140px]">
            <label
              htmlFor="kabupaten"
              className="text-[14px] text-[#374151] pr-[72px]"
            >
              Kabupaten Kota
            </label>
            <select
              onChange={(e) => changeKabupaten(e.target.value)}
              id="kabupaten"
              className="h-[40px] w-[363px] border text-[#374151]"
            >
              <option value="" disabled selected>
                Pilih Kabupaten
              </option>
              {kabupaten.data?.map((res, i) => {
                return (
                  <option key={i} value={res._id}>
                    {res.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label
              htmlFor="kecamatan"
              className="text-[14px] text-[#374151] pr-[72px]"
            >
              Kecamatan
            </label>
            <select
              onChange={(e) => changeKecamatan(e.target.value)}
              id="kecamatan"
              className="h-[40px] w-[363px] border text-[#374151]"
            >
              <option value="" disabled selected>
                Pilih Kecamatan
              </option>
              {kecamatan.data?.map((res, i) => {
                return (
                  <option key={i} value={res._id}>
                    {res.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label
              htmlFor="desa"
              className="text-[14px] text-[#374151] pr-[72px]"
            >
              Desa
            </label>
            <select
              onChange={(e) =>
                setFormData({ ...formData, id_desa: e.target.value })
              }
              id="desa"
              className="h-[40px] w-[363px] border text-[#374151]"
            >
              <option value="" disabled selected>
                Pilih Desa
              </option>
              {kelurahan.data?.map((res, i) => {
                return (
                  <option key={i} value={res._id}>
                    {res.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-between items-center pr-[140px]">
            <label htmlFor="alamat" className="text-[14px] text-[#374151] ">
              Alamat
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0"
              type={"text"}
              id="alamat"
            />
          </div>
        </div>
        <div
          onClick={() => {
            daftarSimpatisan();
          }}
          className="h-[42px] w-[240px] bg-[#E44700] rounded-md mt-[27px] cursor-pointer ml-[375px] text-[18px] text-white font-semibold items-center justify-center flex"
        >
          Bergabung Simpatisan
        </div>
      </div>
    </form>
  );
};

export default Simpatisan;
