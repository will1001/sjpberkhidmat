import React, { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { DaftarRelawanIcon, ShowPassIcon } from "../../utility/icon/icon";
import { useRouter } from "next/router";
import useFetch from "../../API/useFetch";
import axiosFetch from "../../API/axiosFetch";
import DaftarRelawanBerhasil from "./DaftarRelawanBerhasil";
import DaftarFailed from "./DaftarFailed";
import hide from "../../utility/icon/hide_password.png";
import show from "../../utility/icon/show_password.png";
import homeIcn from "../../utility/icon/home_icon.png";

const Relawan = () => {
  const router = new useRouter();
  const kabupaten = useFetch("get", "user/kabupaten");
  const pekerjaan = useFetch("get", "user/jobs");

  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  // password hide & show
  const [passwordType, setPasswordType] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [handleError, setHandelError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    email: "",
    role: "relawan",
    phone: "",
    pekerjaan: "",
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
    {
      await axiosFetch("post", `user/register`, formData)
        .then(() => setPopUp(true))
        .catch((error) => {
          setHandelError(true);
          setErrorMessage(error.response.data.message);
        });
    }
  };

  const verifikasiPass = (e) => {
    if (e !== formData.password) {
      setPasswordMatch(false);
      console.log(e);
    } else {
      setPasswordMatch(true);
    }
  };

  // console.log(formData.password);
  // console.log(passwordMatch);

  return (
    <>
      <DaftarRelawanBerhasil props={popUp} />
      {/* popup daftar failed */}
      <div style={handleError === false ? { visibility: "hidden" } : { background: "rgba(55, 65, 81, 0.32)", visibility: "visible" }} className="fixed w-screen h-screen top-0 left-0">
        <div className="absolute bg-white w-[609px] h-[455px] mt-[120px] ml-[416px]">
          <div onClick={() => setHandelError(false)} className="absolute cursor-pointer right-0 top-0 w-[24px] h-[24px] text-[24px] font-semibold text-[#9CA3AF]">
            X
          </div>
          <DaftarFailed error={errorMessage} popUp={handleError} title={"Daftar Relawan Gagal !!!"} />
        </div>
      </div>
      <div>
        <form>
          <div className="pl-[67px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[#374151] text-[32px] font-bold mb-[27px] ">Tambah Akun Relawan</p>
              {/* nama */}
              <div className="flex justify-between items-center pr-[140px]">
                <label htmlFor="nama_akun" className="text-[14px] text-[#374151] ">
                  Nama Akun
                </label>
                <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"text"} id="nama_akun" />
              </div>
              {/* email */}
              <div className="flex justify-between items-center pr-[140px]">
                <label htmlFor="email" className="text-[14px] text-[#374151] ">
                  Email
                </label>
                <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"email"} id="email" />
              </div>
              {/* contact */}
              <div className="flex justify-between items-center pr-[140px]">
                <label htmlFor="noHp" className="text-[14px] text-[#374151] ">
                  No Hp Relawan
                </label>
                <PatternFormat onChange={(e) => setFormData({ ...formData, phone: e.target.value })} id="noHp" format="### ### ### ###" allowEmptyFormatting className="h-[40px] w-[363px] px-2 outline-0 border text-[#374151]" />
              </div>
              {/* NIK */}
              <div className="flex justify-between items-center pr-[140px]">
                <label htmlFor="NIK" className="text-[14px] text-[#374151] ">
                  NIK
                </label>
                <PatternFormat onChange={(e) => setFormData({ ...formData, nik: e.target.value })} id="NIK" format="#### #### #### ###" allowEmptyFormatting className="h-[40px] w-[363px] px-2 outline-0 border text-[#374151]" />
              </div>
              {/* pekerjaan */}
              <div className="flex justify-between items-center pr-[140px]">
                <label htmlFor="pekerjaan" className="text-[14px] text-[#374151] pr-[72px]">
                  Pekerjaan
                </label>
                <select onChange={(e) => setFormData({ ...formData, pekerjaan: e.target.value })} id="pekerjaan" className="h-[40px] w-[363px] border text-[#374151]">
                  <option value="" disabled selected>
                    Pilih Pekerjaan
                  </option>
                  {pekerjaan.data?.map((res, i) => {
                    return (
                      <option key={i} value={res._id}>
                        {res.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* target desa */}
              <div className="flex justify-between items-center pr-[140px]">
                <label htmlFor="kabupaten" className="text-[14px] text-[#374151] pr-[72px]">
                  Kabupaten Kota
                </label>
                <select onChange={(e) => changeKabupaten(e.target.value)} id="kabupaten" className="h-[40px] w-[363px] border text-[#374151]">
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
                <label htmlFor="kecamatan" className="text-[14px] text-[#374151] pr-[72px]">
                  Kecamatan
                </label>
                <select onChange={(e) => changeKecamatan(e.target.value)} id="kecamatan" className="h-[40px] w-[363px] border text-[#374151]">
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
                <label htmlFor="target_desa" className="text-[14px] text-[#374151] pr-[72px]">
                  Target Desa
                </label>
                <select onChange={(e) => setFormData({ ...formData, target_desa: e.target.value })} id="target_desa" className="h-[40px] w-[363px] border outline-0 text-[#374151]">
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
                <div className={`flex items-center pr-2 h-[40px] w-[363px] border ${passwordMatch === false && "border-[#DC2626]"}`}>
                  <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full text-[#374151] px-2 outline-0" type={passwordType} id="password" />
                  {passwordType === "password" ? (
                    <img className="cursor-pointer" onClick={() => setPasswordType("text")} src={hide.src} alt="hide.png" />
                  ) : (
                    <img onClick={() => setPasswordType("password")} className="cursor-pointer" src={show.src} alt="show.png" />
                  )}
                </div>
              </div>
              {passwordMatch === false && (
                <div className="flex justify-center">
                  <p className="text-[14px] italic text-[#DC2626]">*Password Harus Sama</p>
                </div>
              )}
              <div className="flex justify-between items-center pr-[140px]">
                <label htmlFor="password" className="text-[14px] text-[#374151] ">
                  Tulis Ulang Password
                </label>
                <div className="flex items-center pr-2 h-[40px] w-[363px] border">
                  <input onChange={(e) => verifikasiPass(e.target.value)} className="w-full text-[#374151] px-2 outline-0" type={passwordType2} id="password" />
                  {passwordType2 === "password" ? (
                    <img className="cursor-pointer" onClick={() => setPasswordType2("text")} src={hide.src} alt="hide.png" />
                  ) : (
                    <img onClick={() => setPasswordType2("password")} className="cursor-pointer" src={show.src} alt="show.png" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex mt-[40px] justify-end pr-[140px] gap-3">
              <div onClick={() => router.push("HomePage")} className="h-[42px] px-4 cursor-pointer flex justify-center items-center gap-2 border border-[#374151] text-[#374151] rounded-md">
                <img src={homeIcn.src} />
                <p className="text-[18px] font-semibold">Kembali Ke Home </p>
              </div>
              <div
                onClick={() => {
                  register();
                }}
                className="h-[42px] w-[240px] bg-[#E44700] rounded-md  cursor-pointer  text-[18px] text-white font-semibold items-center justify-center gap-2 flex"
              >
                Buat Akun <DaftarRelawanIcon />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Relawan;
