import React, { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import useFetch from "../../API/useFetch";
import axiosFetch from "../../API/axiosFetch";
import DaftarSuccess from "./DaftarSuccess";
import DaftarFailed from "./DaftarFailed";
import cekNikIcon from "../../utility/icon/cek_nik.png";
import homeIcn from "../../utility/icon/home_icon.png";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import DaftarBerhasil from "../../utility/img/pop_up_success.png";
import { GagalPost } from "../../utility/icon/icon";

const Simpatisan = () => {
  const router = useRouter();
  const relawan = useFetch("get", "user/relawan?page=1");
  const kabupaten = useFetch("get", "user/kabupaten?lombok");
  const pekerjaan = useFetch("get", "user/jobs");
  const [errorMessage, setErrorMessage] = useState("");
  const [handleError, setHandelError] = useState(false);
  const [handleSuccess, setHandelSuccess] = useState(false);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [nikRes, setNikRes] = useState();
  const [disableForm, setDisableForm] = useState(true);
  const idPeriode = useSelector((state) => state.panel.idPeriode);
  const token = useSelector((state) => state.user.token);

  const [formData, setFormData] = useState({
    name: "",
    id_relawan: null,
    id_periode: idPeriode,
    nik: "",
    email: "",
    place_birth: "",
    date_birth: "",
    gender: "",
    phone: "",
    id_kabupaten: undefined,
    id_kecamatan: undefined,
    pekerjaan: "",
    address: "",
    target_desa: "",
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

  const cekNik = async (nik) => {
    const res = await axiosFetch("get", `user/check/nik?nik=${nik}`)
      .then((res) => {
        setDisableForm(false);
        setFormData({
          name: res.data.data.name !== undefined ? res?.data?.data?.name : "",
          id_periode: idPeriode,
          nik: res.data.data.nik !== undefined ? res?.data?.data?.nik : "",
          email: res.data.data.email !== undefined ? res?.data?.data?.email : "",
          // role: res.data.data.role !== undefined ? res?.data?.data?.role : "",
          phone: res.data.data.phone !== undefined ? res?.data?.data?.phone : "",
          pekerjaan: res.data.data.pekerjaan !== undefined ? res?.data?.data?.pekerjaan : "",
          id_kabupaten: res.data.data.id_kabupaten !== undefined ? res?.data?.data?.id_kabupaten : "",
          id_kecamatan: res.data.data.id_kecamatan !== undefined ? res?.data?.data?.id_kecamatan : "",
          target_desa: res.data.data.target_desa !== undefined ? res?.data?.data?.target_desa : "",
          // password: "",
          date_birth: res.data.data.date_birth !== undefined ? res?.data?.data?.date_birth?.split("T").shift() : "",
          place_birth: res.data.data.place_birth !== undefined ? res?.data?.data?.place_birth : "",
          gender: res.data.data.gender !== undefined ? res?.data?.data?.gender : "",
          address: res.data.data.address !== undefined ? res?.data?.data?.address : "",
        });
      })
      .catch((err) => {
        console.log(err);
        setDisableForm(false);
        err?.response?.data?.message === undefined ? alert("Nik Belum Terdaftar") : alert(err?.response?.data?.message);
      });
  };

  const register = async () => {
    console.log(formData);
    {
      await axiosFetch("post", `user/simpatisan`, formData)
        .then((res) => {
          console.log(res, "berhasil daftar");
          setHandelSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setHandelError(true);
          setErrorMessage(err.response.data.message);
        });
    }
  };

  useEffect(() => {
    if (formData?.id_kabupaten !== undefined) {
      axiosFetch("get", `user/kecamatan/${formData.id_kabupaten}`).then((res) => setKecamatan(res.data));
    }
    if (formData?.id_kecamatan !== undefined) {
      axiosFetch("get", `user/kelurahan/${formData.id_kecamatan}`).then((res) => setKelurahan(res.data));
    }
  }, [formData?.id_kabupaten, formData?.id_kecamatan]);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {screenSize.width >= 350 && screenSize.width <= 450 ? (
        <div>
          {handleError === true && (
            <div className="fixed top-0 left-0 bg-[#37415152] w-screen h-screen z-50">
              <div className="w-full px-[16px] flex">
                <div className=" w-full bg-white mt-[80px] rounded-sm pb-[50px]">
                  <div className="flex justify-center w-full my-[38px]">
                    <GagalPost />
                  </div>
                  <p className="text-center text-[26px] text-[#374151] font-bold">Terjadi Kesalahan</p>
                  <p className="text-center text-[26px] text-[#374151] font-bold">Daftar Simpatisan Gagal</p>
                  <div className="mt-3">
                    <p className="text-[#374151] text-center">{errorMessage}</p>
                  </div>
                  <div className="flex justify-center mt-[45px]">
                    <div onClick={() => setHandelError(false)} className="bg-[#E44700] text-[18px] text-white font-semibold px-[79px] py-[13px]">
                      Ok
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {handleSuccess === true && (
            <div className="fixed top-0 left-0 bg-[#37415152] w-screen h-screen z-50">
              <div className="w-full px-[16px] flex">
                <div className=" w-full bg-white mt-[80px] rounded-sm pb-[50px]">
                  <div className="flex justify-center w-full my-[38px]">
                    <img src={DaftarBerhasil.src} />
                  </div>
                  <p className="text-center text-[26px] text-[#374151] font-bold">Daftar Simpatisan</p>
                  <p className="text-center text-[26px] text-[#374151] font-bold">Berhasil</p>
                  <div className="mt-3">
                    <p className="text-[#374151] text-center">Selamat bergabung bersama SJP </p>
                    <p className="text-[#374151] text-center">Berkhidmat. Mari bersama </p>
                    <p className="text-[#374151] text-center">menjadi bagian perubahan</p>
                    <p className="text-[#374151] text-center">Pulau Lombok yang lebih baik.</p>
                  </div>
                  <div className="flex justify-center mt-[45px]">
                    <div onClick={() => router.push("Login")} className="bg-[#E44700] text-[18px] text-white font-semibold px-[79px] py-[13px]">
                      Ok
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="text-[#D1D5DB] font-medium mb-4">RELAWAN</p>
          <p className="text-[#6B7280]">Relawan Pengajak (Opsional)</p>
          <select onChange={(e) => setFormData({ ...formData, id_relawan: e.target.value })} id="pengajak" className="py-2 w-full border text-[#374151]">
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
          <div className="border-[1px] w-full my-[24px]" />
          <p className="text-[#D1D5DB] font-medium mb-4">IDENTITAS PRIBADI</p>
          <p className="text-[#6B7280]">Nik</p>
          <div className="flex gap-2 w-full">
            <PatternFormat
              value={formData.nik}
              onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
              id="NIK"
              format="#### #### #### ####"
              allowEmptyFormatting
              className="h-[40px] w-full px-2 outline-0 border text-[#374151]"
            />
            <div onClick={() => cekNik(formData.nik)} className="flex cursor-pointer justify-center gap-2 items-center w-[150px] border border-[#E44700] rounded-sm" type={"text"}>
              <img src={cekNikIcon.src} />
              <p className="text-[16px] text-[#E44700] font-semibold">Cek NIK</p>
            </div>
          </div>
          <p className="text-[#6B7280] mt-2">Nama</p>
          <input
            disabled={disableForm === true ? true : false}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-[40px] w-full border text-[#374151] px-2 outline-0"
            type={"text"}
            id="nama"
          />
          <p className="text-[#6B7280] mt-2">Email</p>
          <input
            disabled={disableForm === true ? true : false}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-[40px] w-full border text-[#374151] px-2 outline-0"
            type={"email"}
            id="email"
          />
          <p className="text-[#6B7280] mt-2">Jenis Kelamin</p>
          <select disabled={disableForm === true ? true : false} value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} id="gender" className="h-[40px] w-full border text-[#374151] outline-0">
            <option value="" selected disabled>
              Pilih Jenis Kelamin
            </option>
            <option value="L">L</option>
            <option value="P">P</option>
          </select>
          <p className="text-[#6B7280] mt-2">Tempat & Tgl Lahir</p>
          <div className="h-[40px] w-full border text-[#374151] flex justify-between">
            <input disabled={disableForm === true ? true : false} value={formData.place_birth} onChange={(e) => setFormData({ ...formData, place_birth: e.target.value })} className="px-2 outline-0" type={"text"} />
            <input
              disabled={disableForm === true ? true : false}
              value={formData.date_birth.split("T")[0]}
              onChange={(e) => setFormData({ ...formData, date_birth: e.target.value })}
              className=" outline-0"
              type="date"
              id="tanggal lahir"
              name="trip-start"
              defaultValue=""
              min="1945-01-01"
              max="2024-12-31"
            ></input>
          </div>
          <p className="text-[#6B7280] mt-2">No. Hp</p>
          <PatternFormat
            disabled={disableForm === true ? true : false}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            id="noHp"
            format="###-###-###-###"
            allowEmptyFormatting
            mask={""}
            className="h-[40px] w-full px-2 outline-0 border text-[#374151]"
          />
          <p className="text-[#6B7280] mt-2">Pekerjaan</p>
          <select disabled={disableForm === true ? true : false} value={formData.pekerjaan} id="pekerjaan" className="h-[40px] w-full border text-[#374151]" onChange={(e) => setFormData({ ...formData, pekerjaan: e.target.value })}>
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
          <div className="border-[1px] w-full my-[24px]" />
          <p className="text-[#D1D5DB] font-medium mb-4">AlAMAT SIMPATISAN</p>
          <p className="text-[#6B7280] mt-2">Kabupaten / Kota</p>
          <select disabled={disableForm === true ? true : false} value={formData.id_kabupaten} onChange={(e) => changeKabupaten(e.target.value)} id="kabupaten" className="h-[40px] w-full border text-[#374151]">
            <option value="" disabled selected hidden>
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
          <p className="text-[#6B7280] mt-2">Kecamatan</p>
          <select disabled={disableForm === true ? true : false} value={formData.id_kecamatan} onChange={(e) => changeKecamatan(e.target.value)} id="kecamatan" className="h-[40px] w-full border text-[#374151]">
            <option value="" disabled selected hidden>
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
          <p className="text-[#6B7280] mt-2">Desa / Kelurahan</p>
          <select disabled={disableForm === true ? true : false} value={formData.target_desa} onChange={(e) => setFormData({ ...formData, target_desa: e.target.value })} id="desa" className="h-[40px] w-full border text-[#374151]">
            <option value="" disabled selected hidden>
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
          <p className="text-[#6B7280] mt-2">Alamat</p>
          <input
            disabled={disableForm === true ? true : false}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="h-[40px] w-full border text-[#374151] px-2 outline-0"
            type={"text"}
            id="alamat"
          />
          <div
            onClick={() => {
              register();
            }}
            className="flex justify-center bg-[#E44700] text-white font-medium rounded-sm mt-4 py-2"
          >
            Bergabung Simpatisan
          </div>
          <div onClick={() => router.push("HomePage")} className="flex justify-center items-center gap-3 text-[#374151] mt-2 border-[1px] border-[#374151] rounded-sm py-2 font-medium">
            <img src={homeIcn.src} />
            Kembali ke Homepage
          </div>
        </div>
      ) : (
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
                  <label htmlFor="NIK" className="text-[14px] text-[#374151] ">
                    NIK
                  </label>
                  <div className="flex justify-between w-[363px]">
                    <PatternFormat
                      value={formData.nik}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                      id="NIK"
                      format="#### #### #### ####"
                      allowEmptyFormatting
                      className="h-[40px] w-[235px]  px-2 outline-0 border text-[#374151]"
                    />
                    <div onClick={() => cekNik(formData.nik)} className="flex cursor-pointer justify-center gap-2 items-center w-[116px] border border-[#E44700] rounded-sm" type={"text"}>
                      <img src={cekNikIcon.src} />
                      <p className="text-[16px] text-[#E44700] font-semibold">Cek NIK</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pr-[140px]">
                  <label htmlFor="nama" className="text-[14px] text-[#374151] ">
                    Nama
                  </label>
                  <input
                    disabled={disableForm === true ? true : false}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0"
                    type={"text"}
                    id="nama"
                  />
                </div>

                <div className="flex justify-between items-center pr-[140px]">
                  <label htmlFor="email" className="text-[14px] text-[#374151] ">
                    Email
                  </label>
                  <input
                    disabled={disableForm === true ? true : false}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    disabled={disableForm === true ? true : false}
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
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
                  <label htmlFor="tanggal lahir" className="text-[14px] text-[#374151] ">
                    Tempat & Tgl Lahir
                  </label>
                  <div className="h-[40px] w-[363px] border text-[#374151] flex justify-between">
                    <input disabled={disableForm === true ? true : false} value={formData.place_birth} onChange={(e) => setFormData({ ...formData, place_birth: e.target.value })} className="px-2 outline-0" type={"text"} />
                    <input
                      disabled={disableForm === true ? true : false}
                      value={formData.date_birth.split("T")[0]}
                      onChange={(e) => setFormData({ ...formData, date_birth: e.target.value })}
                      className=" outline-0"
                      type="date"
                      id="tanggal lahir"
                      name="trip-start"
                      defaultValue=""
                      min="1945-01-01"
                      max="2024-12-31"
                    ></input>
                  </div>
                </div>
                <div className="flex justify-between items-center pr-[140px]">
                  <label htmlFor="noHP" className="text-[14px] text-[#374151] ">
                    NO HP
                  </label>
                  <PatternFormat
                    disabled={disableForm === true ? true : false}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    id="noHp"
                    format="###-###-###-###"
                    allowEmptyFormatting
                    mask={""}
                    className="h-[40px] w-[363px] px-2 outline-0 border text-[#374151]"
                  />
                </div>
                <div className="flex justify-between items-center pr-[140px]">
                  <label htmlFor="pekerjaan" className="text-[14px] text-[#374151] pr-[72px]">
                    Pekerjaan
                  </label>
                  <select
                    disabled={disableForm === true ? true : false}
                    value={formData.pekerjaan}
                    id="pekerjaan"
                    className="h-[40px] w-[363px] border text-[#374151]"
                    onChange={(e) => setFormData({ ...formData, pekerjaan: e.target.value })}
                  >
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
              </div>

              <div className="border-b-2 my-[30px]" />
              {/* alamat simpatisan */}
              <div className="flex flex-col gap-3">
                <p className="text-[#D1D5DB] font-medium ">ALAMAT SIMPATISAN</p>
                <div className="flex justify-between items-center pr-[140px]"></div>
                <div className="flex justify-between items-center pr-[140px]">
                  <label htmlFor="kabupaten" className="text-[14px] text-[#374151] pr-[72px]">
                    Kabupaten Kota
                  </label>
                  <select disabled={disableForm === true ? true : false} value={formData.id_kabupaten} onChange={(e) => changeKabupaten(e.target.value)} id="kabupaten" className="h-[40px] w-[363px] border text-[#374151]">
                    <option value="" disabled selected hidden>
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
                  <select disabled={disableForm === true ? true : false} value={formData.id_kecamatan} onChange={(e) => changeKecamatan(e.target.value)} id="kecamatan" className="h-[40px] w-[363px] border text-[#374151]">
                    <option value="" disabled selected hidden>
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
                  <select
                    disabled={disableForm === true ? true : false}
                    value={formData.target_desa}
                    onChange={(e) => setFormData({ ...formData, target_desa: e.target.value })}
                    id="desa"
                    className="h-[40px] w-[363px] border text-[#374151]"
                  >
                    <option value="" disabled selected hidden>
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
                    disabled={disableForm === true ? true : false}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0"
                    type={"text"}
                    id="alamat"
                  />
                </div>
              </div>
              <div className="flex justify-end mr-[140px] gap-3">
                <div className=" bg-white rounded-md mt-[27px] cursor-pointer  text-[18px] text-[#374151] font-semibold items-center justify-center flex">
                  <div onClick={() => router.push("HomePage")} className="h-[42px] px-4 cursor-pointer flex justify-center items-center gap-2 border border-[#374151] rounded-md">
                    <img src={homeIcn.src} />
                    <p>Kembali Ke Home </p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    register();
                  }}
                  className="h-[42px] px-4 bg-[#E44700] rounded-md mt-[27px] cursor-pointer  text-[18px] text-white font-semibold items-center justify-center flex"
                >
                  Bergabung Simpatisan
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Simpatisan;
