import React, { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { DaftarRelawanIcon, ShowPassIcon } from "../../utility/icon/icon";
import { useRouter } from "next/router";
import useFetch from "../../API/useFetch";
import axiosFetch from "../../API/axiosFetch";

const Relawan = () => {
  const router = new useRouter();
  const kabupaten = useFetch("get", "user/kabupaten");

  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  // password hide & show
  const [passwordType, setPasswordType] = useState("password");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "relawan",
    phone: "",
    jabatan: "",
    id_kabupaten: "",
    id_kecamatan: "",
    target_desa: "",
    password: "",
  });

  const changeKabupaten = async (idKabupaten) => {
    setFormData({ ...formData, id_kabupaten: idKabupaten });
    const res = await axiosFetch("get", `user/kecamatan/${idKabupaten}`);
    setKecamatan(res.data);
  };

  const changeKecamatan = async (idKecamatan) => {
    setFormData({ ...formData, id_kecamatan: idKecamatan });
    const res = await axiosFetch("get", `user/kelurahan/${idKecamatan}`);
    setKelurahan(res.data);
  };

  const register = async () => {
    const res = await axiosFetch("post", `user/register`, formData);
  };

  return (
    <div>
      <form>
        <div className="pl-[67px] ">
          <div className="flex flex-col gap-3">
            <p className="text-[#374151] text-[32px] font-bold mb-[27px] ">
              Tambah Akun Relawan
            </p>
            {/* nama */}
            <div className="flex justify-between items-center pr-[140px]">
              <label
                htmlFor="nama_akun"
                className="text-[14px] text-[#374151] "
              >
                Nama Akun
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0"
                type={"text"}
                id="nama_akun"
              />
            </div>
            {/* email */}
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
            {/* contact */}
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="noHp" className="text-[14px] text-[#374151] ">
                No Hp Relawan
              </label>
              <PatternFormat
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                id="noHp"
                format="### ### ### ###"
                allowEmptyFormatting
                className="h-[40px] w-[363px] px-2 outline-0 border text-[#374151]"
              />
            </div>
            {/* NIK */}
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
            {/* jabatan */}
            <div className="flex justify-between items-center pr-[140px]">
              <label
                htmlFor="jabatan"
                className="text-[14px] text-[#374151] pr-[72px]"
              >
                Jabatan
              </label>
              <select
                onChange={(e) =>
                  setFormData({ ...formData, jabatan: e.target.value })
                }
                id="jabatan"
                className="h-[40px] w-[363px] border outline-0 text-[#374151]"
              >
                <option value="" selected disabled>
                  Pilih Jabatan
                </option>
                <option value="Tokoh Masyarakat">Tokoh Masyarakat</option>
                <option value="Tokoh Agama">Tokoh Agama</option>
              </select>
            </div>
            {/* target desa */}
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
                htmlFor="target_desa"
                className="text-[14px] text-[#374151] pr-[72px]"
              >
                Target Desa
              </label>
              <select
                onChange={(e) =>
                  setFormData({ ...formData, target_desa: e.target.value })
                }
                id="target_desa"
                className="h-[40px] w-[363px] border outline-0 text-[#374151]"
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
          </div>
          <div className="border-b-2 my-[30px]" />

          {/* password */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="password" className="text-[14px] text-[#374151] ">
                Set Password
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0"
                type={passwordType}
                id="password"
              />
            </div>
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="password" className="text-[14px] text-[#374151] ">
                Set Ulang Password
              </label>
              <input
                className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0"
                type={passwordType}
                id="password"
              />
            </div>
          </div>

          <div
            onClick={() => {
              register();
            }}
            className="h-[42px] w-[240px] bg-[#E44700] rounded-md mt-[48px] cursor-pointer ml-[375px] text-[18px] text-white font-semibold items-center justify-center gap-2 flex"
          >
            Buat Akun <DaftarRelawanIcon />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Relawan;
