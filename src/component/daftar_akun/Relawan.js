import React, { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { DaftarRelawanIcon } from "../../utility/icon/icon";
import axios from "axios";
import { useRouter } from "next/router";

const Relawan = () => {
  const router = new useRouter();
  const base_url = "https://api.sjpberkhidmat.id/";
  const [kelurahan, setKelurahan] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "relawan",
    phone: "",
    jabatan: "",
    target_desa: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(base_url + "user/kelurahans")
      .then((res) => setKelurahan(res.data));
  }, []);

  const daftarRelawan = () => {
    axios.post(base_url + `user/register`, formData).then((res) => {
      console.log(res.data);
      alert("Pendaftaran Berhasil!");
      router.push({
        pathname: "/",
        query: { component: "Simpatisan" },
      });
    });
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
                type={"password"}
                id="password"
              />
            </div>
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="password" className="text-[14px] text-[#374151] ">
                Set Ulang Password
              </label>
              <input
                className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0"
                type={"password"}
                id="password"
              />
            </div>
          </div>

          <div
            onClick={() => {
              daftarRelawan();
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
