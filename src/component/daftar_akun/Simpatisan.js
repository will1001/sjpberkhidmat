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

const Simpatisan = () => {
  const router = useRouter();
  const relawan = useFetch("get", "user/relawan");
  const kabupaten = useFetch("get", "user/kabupaten?lombok");
  const pekerjaan = useFetch("get", "user/jobs");
  const [errorMessage, setErrorMessage] = useState("");
  const [handleError, setHandelError] = useState(false);
  const [handleSuccess, setHandelSuccess] = useState(false);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [nikRes, setNikRes] = useState();
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
    id_kabupaten: "",
    id_kecamatan: "",
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
        setNikRes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
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
    if (nikRes?.id_kabupaten !== undefined) {
      axiosFetch("get", `user/kecamatan/${nikRes.id_kabupaten}`).then((res) =>
        setKecamatan(res.data)
      );
    }
    if (nikRes?.id_kecamatan !== undefined) {
      axiosFetch("get", `user/kelurahan/${nikRes.id_kecamatan}`).then((res) =>
        setKelurahan(res.data)
      );
    }
  }, [nikRes?.id_kabupaten, nikRes?.id_kecamatan]);

  useEffect(() => {
    nikRes !== undefined &&
      setFormData({
        ...formData,
        name: nikRes.name !== undefined && nikRes.name,
        id_relawan: null,
        id_periode: idPeriode,
        nik: nikRes.nik !== undefined && nikRes.nik,
        email: nikRes.email !== undefined && nikRes.email,
        place_birth: nikRes.place_birth !== undefined && nikRes.place_birth,
        date_birth:
          nikRes.date_birth !== undefined &&
          nikRes.date_birth?.split("T").shift(),
        gender: nikRes.gender !== undefined && nikRes.gender,
        phone: nikRes.phone !== undefined && nikRes.phone,
        id_kabupaten: nikRes.id_kabupaten !== undefined && nikRes.id_kabupaten,
        id_kecamatan: nikRes.id_kecamatan !== undefined && nikRes.id_kecamatan,
        pekerjaan: nikRes.pekerjaan !== undefined && nikRes.pekerjaan,
        address: nikRes.address !== undefined && nikRes.address,
        target_desa: nikRes.target_desa !== undefined && nikRes.target_desa,
      });
  }, [nikRes]);

  console.log(nikRes, "sdasdsad");
  console.log(kelurahan);

  return (
    <>
      <DaftarSuccess props={handleSuccess} />
      {/* popup daftar failed */}
      <div
        style={
          handleError === false
            ? { visibility: "hidden" }
            : { background: "rgba(55, 65, 81, 0.32)", visibility: "visible" }
        }
        className="fixed w-screen h-screen top-0 left-0"
      >
        <div className="absolute bg-white w-[609px] h-[455px] mt-[120px] ml-[416px]">
          <div
            onClick={() => setHandelError(false)}
            className="absolute cursor-pointer right-0 top-0 w-[24px] h-[24px] text-[24px] font-semibold text-[#9CA3AF]"
          >
            X
          </div>
          <DaftarFailed
            error={errorMessage}
            popUp={handleError}
            title={"Daftar Simpatisan Gagal !!!"}
          />
        </div>
      </div>
      <form>
        <div className="pl-[67px] ">
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
              <label htmlFor="NIK" className="text-[14px] text-[#374151] ">
                NIK
              </label>
              <div className="flex justify-between w-[363px]">
                <PatternFormat
                  value={formData.nik}
                  onChange={(e) =>
                    setFormData({ ...formData, nik: e.target.value })
                  }
                  id="NIK"
                  format="#### #### #### ###"
                  allowEmptyFormatting
                  className="h-[40px] w-[235px]  px-2 outline-0 border text-[#374151]"
                />
                <div
                  onClick={() => cekNik(formData.nik)}
                  className="flex cursor-pointer justify-center gap-2 items-center w-[116px] border border-[#E44700] rounded-sm"
                  type={"text"}
                >
                  <img src={cekNikIcon.src} />
                  <p className="text-[16px] text-[#E44700] font-semibold">
                    Cek NIK
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pr-[140px]">
              <label htmlFor="nama" className="text-[14px] text-[#374151] ">
                Nama
              </label>
              <input
                disabled={nikRes === undefined ? true : false}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                disabled={nikRes === undefined ? true : false}
                value={formData.email}
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
                disabled={nikRes === undefined ? true : false}
                value={formData.gender}
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
                Tempat & Tgl Lahir
              </label>
              <div className="h-[40px] w-[363px] border text-[#374151] flex justify-between">
                <input
                  disabled={nikRes === undefined ? true : false}
                  value={formData.place_birth}
                  onChange={(e) =>
                    setFormData({ ...formData, place_birth: e.target.value })
                  }
                  className="px-2 outline-0"
                  type={"text"}
                />
                <input
                  disabled={nikRes === undefined ? true : false}
                  value={formData.date_birth}
                  onChange={(e) =>
                    setFormData({ ...formData, date_birth: e.target.value })
                  }
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
                disabled={nikRes === undefined ? true : false}
                value={formData.phone}
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
            <div className="flex justify-between items-center pr-[140px]">
              <label
                htmlFor="pekerjaan"
                className="text-[14px] text-[#374151] pr-[72px]"
              >
                Pekerjaan
              </label>
              <select
                disabled={nikRes === undefined ? true : false}
                value={formData.pekerjaan}
                id="pekerjaan"
                className="h-[40px] w-[363px] border text-[#374151]"
                onChange={(e) =>
                  setFormData({ ...formData, pekerjaan: e.target.value })
                }
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
              <label
                htmlFor="kabupaten"
                className="text-[14px] text-[#374151] pr-[72px]"
              >
                Kabupaten Kota
              </label>
              <select
                disabled={nikRes === undefined ? true : false}
                value={formData.id_kabupaten}
                onChange={(e) => changeKabupaten(e.target.value)}
                id="kabupaten"
                className="h-[40px] w-[363px] border text-[#374151]"
              >
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
              <label
                htmlFor="kecamatan"
                className="text-[14px] text-[#374151] pr-[72px]"
              >
                Kecamatan
              </label>
              <select
                disabled={nikRes === undefined ? true : false}
                value={formData.id_kecamatan}
                onChange={(e) => changeKecamatan(e.target.value)}
                id="kecamatan"
                className="h-[40px] w-[363px] border text-[#374151]"
              >
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
              <label
                htmlFor="desa"
                className="text-[14px] text-[#374151] pr-[72px]"
              >
                Desa
              </label>
              <select
                disabled={nikRes === undefined ? true : false}
                value={formData.target_desa}
                onChange={(e) =>
                  setFormData({ ...formData, target_desa: e.target.value })
                }
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
                disabled={nikRes === undefined ? true : false}
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="h-[40px] w-[363px] border text-[#374151] px-2 outline-0"
                type={"text"}
                id="alamat"
              />
            </div>
          </div>
          <div className="flex justify-end mr-[140px] gap-3">
            <div className=" bg-white rounded-md mt-[27px] cursor-pointer  text-[18px] text-[#374151] font-semibold items-center justify-center flex">
              <div
                onClick={() => router.push("HomePage")}
                className="h-[42px] px-4 cursor-pointer flex justify-center items-center gap-2 border border-[#374151] rounded-md"
              >
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
  );
};

export default Simpatisan;
