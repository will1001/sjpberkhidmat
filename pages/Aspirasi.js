import React, { useEffect, useState } from "react";
import aspirasiImage from "../src/utility/img/rumah_aspirasi.png";
import backIcon from "../src/utility/icon/back_orange.png";
import { useRouter } from "next/router";
import Logo from "../src/utility/Logo";
import uploadFile from "../src/utility/icon/uploadIcon.png";
import useFetch from "../src/API/useFetch";
import axiosFetch from "../src/API/axiosFetch";
import { useSelector } from "react-redux";
import berhasilPost from "../src/utility/img/berhasiPost.png";
import { GagalPost } from "../src/utility/icon/icon";

const Aspirasi = () => {
  const router = useRouter();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const kabupaten = useFetch("get", "user/kabupaten?filter=lombok");
  const [kecamatan, setKecamatan] = useState();
  const [desa, setDesa] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const idPeriode = useSelector((state) => state.panel.idPeriode);

  const [form, setForm] = useState({
    id_kabupaten: "",
    id_kecamatan: "",
    id_periode: idPeriode,
    id_desa: "",
    perihal: "",
    detail: "",
    image: [],
    nama: "",
    email: "",
    noHp: "",
  });

  const changeKecamatan = async (idKabupaten) => {
    const res = await axiosFetch("get", `user/kecamatan/${idKabupaten}`);
    setKecamatan(res.data);
    setForm({ ...form, id_kabupaten: idKabupaten });
  };

  const changeDesa = async (idKecamatan) => {
    const res = await axiosFetch("get", `user/kelurahan/${idKecamatan}`);
    setDesa(res.data);
    setForm({ ...form, id_kecamatan: idKecamatan });
  };

  useEffect(() => {
    if (image === undefined) {
      setPreview();
    } else {
      const objectUrl = URL.createObjectURL(image[0]);
      setPreview(objectUrl);
    }
  }, [image]);

  useEffect(() => {
    setError(false);
  }, [form]);

  const postAspirasi = async () => {
    const a = new FormData();
    a.append("id_kabupaten", form.id_kabupaten);
    a.append("id_kecamatan", form.id_kecamatan);
    a.append("id_kelurahan", form.id_desa);
    a.append("email", form.email);
    a.append("name", form.nama);
    a.append("phone", form.noHp);
    a.append("perihal", form.perihal);
    a.append("detail", form.detail);
    a.append("id_periode", idPeriode);
    if (form.image.length !== 0) {
      a.append("image", form.image);
    }

    {
      await axiosFetch("post", `user/aspirasi`, a)
        .then((res) => {
          console.log(res);
          setForm({
            id_kabupaten: "",
            id_kecamatan: "",
            id_desa: "",
            perihal: "",
            detail: "",
            image: [],
            nama: "",
            email: "",
            noHp: "",
          });
          setPreview();
          setSuccess(true);
        })
        .catch((error) => {
          //   console.log(error.response.data.message);
          setError(true);
          setErrorMessage(error.response.data.message);
        });
    }
  };

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

  console.log(errorMessage);

  return (
    <>
      {screenSize.width >= 350 && screenSize.width <= 450 ? (
        <div className="px-[16px] pt-[24px] pb-[62px]">
          <Logo />
          <p className="text-[21px] font-bold text-[#374151] pr-16">
            Sampaikan aspirasi Anda, bersama <span className="text-[#FF5001]">SJP Berkhidmat</span> untuk Indonesia
          </p>
          <p className="mt-2 text-[#374151] text-[18px] font-semibold">Rumah Aspirasi</p>
          <div>
            <label className="text-[#6B7280] flex mt-[21px]" htmlFor="nama">
              Nama
            </label>
            <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="border w-full px-3 mt-2 border-[#D1D5DB] py-2 rounded-md text-[#374151] font-semibold" type={"text"} id="nama" />
          </div>
          <div>
            <label className="text-[#6B7280] flex mt-2">Email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border w-full px-3 mt-2 border-[#D1D5DB] py-2 rounded-md text-[#374151] font-semibold" type={"email"} />
          </div>
          <div>
            <label className="text-[#6B7280] flex mt-2">No. Hp</label>
            <input value={form.noHp} onChange={(e) => setForm({ ...form, noHp: e.target.value })} className="border w-full px-3 mt-2 border-[#D1D5DB] py-2 rounded-md text-[#374151] font-semibold" type={"number"} />
          </div>
          <div>
            <label className="text-[#6B7280] flex mt-2">Perihal</label>
            <input value={form.perihal} onChange={(e) => setForm({ ...form, perihal: e.target.value })} className="border w-full px-3 mt-2 border-[#D1D5DB] py-2 rounded-md text-[#374151] font-semibold" type={"text"} />
          </div>
          <div>
            <label className="text-[#6B7280] flex mt-2">Kabupaten / Kota</label>
            <select value={form.id_kabupaten} onChange={(e) => changeKecamatan(e.target.value)} className="border w-full px-3 mt-2 border-[#D1D5DB] py-2 rounded-md text-[#374151] font-semibold">
              <option selected={"disable"}></option>
              {kabupaten?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[#6B7280] flex mt-2">Kecamatan</label>
            <select value={form.id_kecamatan} onChange={(e) => changeDesa(e.target.value)} className="border w-full px-3 mt-2 border-[#D1D5DB] py-2 rounded-md text-[#374151] font-semibold">
              <option selected={"disabled"}></option>
              {kecamatan?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[#6B7280] flex mt-2">Kelurahan / Desa</label>
            <select value={form.id_desa} onChange={(e) => setForm({ ...form, id_desa: e.target.value })} className="border w-full px-3 mt-2 border-[#D1D5DB] py-2 rounded-md text-[#374151] font-semibold">
              <option selected={"disabled"}></option>
              {desa?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[#6B7280] flex mt-2">Detail Aspirasi</label>
            <textarea value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} className="border w-full h-[195px] px-3 mt-2 border-[#D1D5DB] py-2 rounded-md text-[#374151] font-semibold" type={"text"} />
          </div>
          <div className="">
            <p className="text-[#6B7280] flex mt-2">Foto (Opsional)</p>
            {preview === undefined ? (
              <label htmlFor="file_upload" className="border rounded-md border-[#D1D5DB] cursor-pointer">
                <div className="flex flex-col items-center py-6 border">
                  <img src={uploadFile.src} alt="upload here" />
                  <p className="text-[12px] text-[#000000] font-semibold">
                    <span className="text-[#FF5001]">Upload a file </span>of drag and drop{" "}
                  </p>
                  <p className="text-[12px] font-normal">PNG, JPG, JPEG upto 32MB</p>
                </div>
                <input
                  onChange={(e) => {
                    setForm({ ...form, image: e.target.files[0] });
                    setImage([e.target.files[0]]);
                  }}
                  id="file_upload"
                  type="file"
                  className="hidden"
                />
              </label>
            ) : (
              <>
                <div className="flex justify-center mt-4 ">
                  <div>
                    <div className="flex justify-center items-center my-4 ">
                      <p onClick={() => setPreview()} className="h-[42px] cursor-pointer bg-[#FF5001] rounded-md flex px-4 text-white font-medium items-center">
                        ReUpload
                      </p>
                    </div>
                    <img className="rounded-md border" src={preview} />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex">
            <div onClick={postAspirasi} className="bg-[#E44700] px-2 py-1 rounded-sm text-[18px] text-white font-semibold">
              Sampaikan Aspirasi
            </div>
          </div>
          {/* popup */}
          {success === true && (
            <div className="fixed bg-[#37415152] h-screen w-screen top-0 left-0">
              {/* berhasil */}
              <div className="absolute bg-white py-4 px-12 rounded-sm top-[25%] w-full">
                <div className="flex justify-center">
                  <img src={berhasilPost.src} />
                </div>
                <p className="font-medium text-[#374151] mt-3">Berhasil Menyampaikan Aspirasi</p>
                <div className="flex justify-center mt-3">
                  <div onClick={() => setSuccess(false)} className="bg-[#E44700] text-white font-medium py-2 px-6 rounded-md">
                    Ok
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* error */}
          {error === true && (
            <div className="fixed bg-[#37415152] h-screen w-screen top-0 left-0">
              <div className="absolute bg-white py-4 px-12 rounded-sm top-[25%] w-full">
                <div className="flex justify-center">
                  <GagalPost />
                </div>
                <p className="font-medium text-[#374151] mt-3 text-center">Terjadi Kesalahan</p>
                <p className="font-medium text-[#E44700] mt-3 text-center">{errorMessage}</p>
                <div className="flex justify-center mt-3">
                  <div onClick={() => setError(false)} className="bg-[#E44700] text-white font-medium py-2 px-6 rounded-md">
                    Ok
                  </div>
                </div>
              </div>
            </div>
          )}

          {/*end popup */}
        </div>
      ) : (
        <div>
          {" "}
          <img className="w-[463px] h-[1024px] fixed right-0" src={aspirasiImage.src} alt="rumah_aspirasi.png" />
          <div className="pl-[100px] mr-[550px] pt-[65px] pb-[150px]">
            <div className="flex ">
              <div onClick={() => router.back()} className="flex h-[32px] gap-2  items-center px-4 rounded-sm cursor-pointer border border-[#E44700]">
                <img src={backIcon.src} />
                <p className="text-[14px] text-[#E44700] font-medium">Kembali</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-[45px]">
              <Logo />
              <p className="text-[#374151] text-[26px] font-bold">
                Sampaikan aspirasi Anda, bersama
                <br /> <span className="text-[#E44700]">SJP Berkhidmat</span> untuk Indonesia
              </p>
            </div>
            <div className="mt-[58px] flex flex-col gap-2 text-[#374151] pb-[150px]">
              <p className=" text-[21px] font-bold">Rumah Aspirasi</p>
              <div className="flex justify-between items-center">
                <label id="nama">Nama</label>
                <input value={form.nama} id="nama" onChange={(e) => setForm({ ...form, nama: e.target.value })} className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"text"} />
              </div>

              <div className="flex justify-between items-center">
                <label>Email</label>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"email"} />
              </div>
              <div className="flex justify-between items-center border-b-2 pb-8">
                <label>No.HP</label>
                <input value={form.noHp} onChange={(e) => setForm({ ...form, noHp: e.target.value })} className="border h-[48px] w-[479px] px-2 outline-0 rounded-md " type={"number"} />
              </div>
              <div className="flex justify-between items-center mt-6">
                <label>Perihal</label>
                <input value={form.perihal} onChange={(e) => setForm({ ...form, perihal: e.target.value })} className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"text"} />
              </div>
              <div className="flex justify-between items-center">
                <label>Kabupaten</label>
                <select defaultValue={""} onChange={(e) => changeKecamatan(e.target.value)} className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"text"}>
                  <option value={form.id_kabupaten}></option>
                  {kabupaten?.data?.map((res) => (
                    <option key={res._id} value={res._id}>
                      {res.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label>Kecamatan</label>
                <select onChange={(e) => changeDesa(e.target.value)} className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"text"}>
                  <option value={form.id_kecamatan}></option>
                  {kecamatan?.data?.map((res) => (
                    <option key={res._id} value={res._id}>
                      {res.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label>Desa</label>
                <select onChange={(e) => setForm({ ...form, id_desa: e.target.value })} className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"text"}>
                  <option value={form.id_desa}></option>
                  {desa?.data?.map((res) => (
                    <option key={res._id} value={res._id}>
                      {res.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <label>Detail Aspirasi</label>
                <textarea value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} className="border h-[179px] w-[479px] px-2 py-2 outline-0 rounded-md" type={"text"} />
              </div>
              <div className="flex gap-[110px]">
                <p>Foto (Opsional)</p>
                {preview === undefined ? (
                  <label htmlFor="file_upload" className="h-[112px] border rounded-md border-[#D1D5DB] cursor-pointer">
                    <div className="flex flex-col items-center pt-4 px-[60px] ">
                      <img src={uploadFile.src} alt="upload here" />
                      <p className="text-[12px] text-[#000000] font-semibold">
                        <span className="text-[#FF5001]">Upload a file </span>of drag and drop{" "}
                      </p>
                      <p className="text-[12px] font-normal">PNG, JPG, MP4 upto 32MB</p>
                    </div>
                    <input
                      onChange={(e) => {
                        setForm({ ...form, image: e.target.files[0] });
                        setImage([e.target.files[0]]);
                      }}
                      id="file_upload"
                      type="file"
                      className="hidden"
                    />
                  </label>
                ) : (
                  <>
                    <div className="flex justify-center mt-4 ">
                      <div>
                        <div className="flex justify-center items-center my-4 ">
                          <p onClick={() => setPreview()} className="h-[42px] cursor-pointer bg-[#FF5001] rounded-md flex px-4 text-white font-medium items-center">
                            ReUpload
                          </p>
                        </div>
                        <img className="rounded-md border" src={preview} />
                      </div>
                    </div>
                  </>
                )}
              </div>
              {error === true && (
                <div className={`w-full flex  justify-center`}>
                  <p className={` text-[18px] flex items-center font-medium border border-[#B91C1C] h-[42px] px-4 rounded-sm text-[#B91C1C]`}>{errorMessage}</p>
                </div>
              )}
              {success === true && (
                <div className="w-full flex justify-center ">
                  <p className="flex flex-col items-center text-[18px] bg-[#FF5001] p-4 rounded-md text-white font-medium">
                    Berhasil Menyampaikan Aspirasi
                    <span className="text-[16px] italic font-normal underline cursor-pointer" onClick={() => setSuccess(false)}>
                      Close
                    </span>
                  </p>
                </div>
              )}

              <div className="flex w-full justify-end  mt-[37px]">
                <p onClick={postAspirasi} className="h-[42px] bg-[#FF5001] flex items-center rounded-md px-4 cursor-pointer text-white font-medium">
                  Sampaikan Aspirasi
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Aspirasi;
