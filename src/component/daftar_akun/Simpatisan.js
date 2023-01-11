import React, { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import useFetch from "../../API/useFetch";
import axiosFetch from "../../API/axiosFetch";
import DaftarSuccess from "./DaftarSuccess";
import DaftarFailed from "./DaftarFailed";

const Simpatisan = () => {
  const relawan = useFetch("get", "user/relawan");
  const kabupaten = useFetch("get", "user/kabupaten");
  const [errorMessage, setErrorMessage] = useState("");
  const [handleError, setHandelError] = useState(false);
  const [handleSuccess, setHandelSuccess] = useState(false);
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
      await axiosFetch("post", `user/simpatisan`, formData)
        .then((res) => {
          console.log(res, "berhasil daftar");
          setHandelSuccess(true);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setHandelError(true);
          setErrorMessage(err.response.data.message);
        });
    }
  };

  return (
    <>
      <DaftarSuccess props={handleSuccess} />
      {/* popup daftar failed */}
      <div style={handleError === false ? { visibility: "hidden" } : { background: "rgba(55, 65, 81, 0.32)", visibility: "visible" }} className="fixed w-screen h-screen top-0 left-0">
        <div className="absolute bg-white w-[609px] h-[455px] mt-[120px] ml-[416px]">
          <div onClick={() => setHandelError(false)} className="absolute cursor-pointer right-0 top-0 w-[24px] h-[24px] text-[24px] font-semibold text-[#9CA3AF]">
            X
          </div>
          <DaftarFailed error={errorMessage} popUp={handleError} title={"Daftar Simpatisan Gagal !!!"} />
        </div>
      </div>
      <form>
        <div className="pl-[67px] ">
          <div>
            <p className="text-[#D1D5DB] font-medium ">RELAWAN</p>
            <div className="flex items-center">
              <label htmlFor="pengjak" className="text-[14px] text-[#374151] pr-[72px]">
                Relawan Pengajak (Opsional)
              </label>
              <select onChange={(e) => setFormData({ ...formData, id_relawan: e.target.value })} id="pengajak" className="h-[40px] w-[363px] border text-[#374151]">
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
              <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"text"} id="nama" />
            </div>
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="NIK" className="text-[14px] text-[#374151] ">
                NIK
              </label>
              <PatternFormat onChange={(e) => setFormData({ ...formData, nik: e.target.value })} id="NIK" format="#### #### #### ###" allowEmptyFormatting className="h-[40px] w-[363px] px-2 outline-0 border text-[#374151]" />
            </div>
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="email" className="text-[14px] text-[#374151] ">
                Email
              </label>
              <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"email"} id="email" />
            </div>
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="gender" className="text-[14px] text-[#374151] ">
                Jenis Kelamin
              </label>
              <select onChange={(e) => setFormData({ ...formData, gender: e.target.value })} id="gender" className="h-[40px] w-[363px] border text-[#374151] outline-0">
                <option value="" selected disabled>
                  Pilih Jenis Kelamin
                </option>
                <option value="L">L</option>
                <option value="P">P</option>
              </select>
            </div>
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="tanggal lahir" className="text-[14px] text-[#374151] ">
                Tgl Lahir
              </label>
              <input
                onChange={(e) => setFormData({ ...formData, date_birth: e.target.value })}
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
              <PatternFormat onChange={(e) => setFormData({ ...formData, phone: e.target.value })} id="noHp" format="###-###-###-###" allowEmptyFormatting mask={""} className="h-[40px] w-[363px] px-2 outline-0 border text-[#374151]" />
            </div>
          </div>
          <div className="border-b-2 my-[30px]" />
          {/* alamat simpatisan */}
          <div className="flex flex-col gap-3">
            <p className="text-[#D1D5DB] font-medium ">IDENTITAS PRIBADI</p>
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
              <label htmlFor="desa" className="text-[14px] text-[#374151] pr-[72px]">
                Desa
              </label>
              <select onChange={(e) => setFormData({ ...formData, id_desa: e.target.value })} id="desa" className="h-[40px] w-[363px] border text-[#374151]">
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
              <input onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0" type={"text"} id="alamat" />
            </div>
          </div>
          <div
            onClick={() => {
              register();
            }}
            className="h-[42px] w-[240px] bg-[#E44700] rounded-md mt-[27px] cursor-pointer ml-[375px] text-[18px] text-white font-semibold items-center justify-center flex"
          >
            Bergabung Simpatisan
          </div>
        </div>
      </form>
    </>
  );
};

export default Simpatisan;
