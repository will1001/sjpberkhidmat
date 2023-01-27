import { useRouter } from "next/router";
import React, { useState } from "react";
import Logo from "../../src/utility/Logo";
import homeIcon from "../../src/utility/icon/home_putih.png";
import deletIcon from "../../src/utility/icon/delet_icon.png";
import axiosFetch from "../../src/API/axiosFetch";

const DetailAspirasi = () => {
  const router = useRouter();
  const [alertHapus, setAlertHapus] = useState(false);
  console.log(router.query);

  const deleteAspirasi = async (id) => {
    console.log(id);

    const res = await axiosFetch("delete", `user/aspirasi/${id}`)
      .then((res) => {
        console.log(res);
        setAlertHapus(false);
        router.back();
      })
      .catch((err) => console.log(err));
    return res;
  };
  return (
    <>
      <div style={{ visibility: alertHapus === true ? "visible" : "hidden" }} className="fixed h-screen w-screen bg-[#374151] bg-opacity-30">
        <div className="absolute rounded-sm shadow-lg left-[40%] top-[20%] py-[20px] px-[50px] bg-white">
          <p className="mb-2 text-[#374151] text-[21px] font-bold">Hapus Aspirasi?</p>
          <div className="flex justify-center items-center gap-3">
            <p onClick={() => setAlertHapus(false)} className="border bg-[#E44700] text-white font-medium px-4 py-1 rounded-md cursor-pointer">
              Batal
            </p>
            <p onClick={() => deleteAspirasi(router.query.id)} className="border border-[#DC2626] text-[#DC2626] font-medium px-4 py-1 rounded-md cursor-pointer">
              Hapus
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-[42px] pt-[29px] border-b-2">
        <div className="flex gap-[46px]">
          <Logo />
          <p className="text-[26px] font-bold text-[#374151]">Detail Aspirasi</p>
        </div>
        <div className="flex gap-2">
          <div onClick={() => router.back()} className="flex bg-[#E44700] px-4 items-center py-2 gap-2 rounded-md cursor-pointer">
            <img src={homeIcon.src} alt="ke aspirasi" />
            <div className=" text-white text-[14px] font-semibold">Kembali Ke Aspirasi</div>
          </div>
          <div onClick={() => setAlertHapus(true)} className="flex border-[#DC2626] border px-4 items-center py-2 gap-2 rounded-md cursor-pointer">
            <img src={deletIcon.src} alt="ke aspirasi" />
            <div className=" text-[#DC2626] text-[14px] font-semibold">Hapus Data</div>
          </div>
        </div>
      </div>
      <div className="w-screen pt-[40px] pl-[208px] pr-[231px] pb-[50px] bg-slate-50">
        <div className="bg-white px-[58px] py-[40px] rounded-sm">
          <p className="text-[#6B7280]">Nama</p>
          <div className="flex items-center border px-3 py-2 rounded-sm mt-2">
            <p className="text-[#374151] font-medium">{router.query.nama}</p>
          </div>
          <div className="flex items-center gap-[44px] mt-2">
            <div className="w-full">
              <p className="text-[#6B7280]">Email</p>
              <div className="flex items-center border px-3 py-2 rounded-sm mt-2">
                <p className="text-[#374151] font-medium">{router.query.email}</p>
              </div>
            </div>
            <div className="w-full">
              <p className="text-[#6B7280]">No. HP</p>
              <div className="flex items-center border px-3 py-2 rounded-sm mt-2">
                <p className="text-[#374151] font-medium">{router.query.phone}</p>
              </div>
            </div>
          </div>
          <p className="text-[#6B7280] mt-2">Perihal</p>
          <div className="flex items-center border px-3 py-2 rounded-sm mt-2">
            <p className="text-[#374151] font-medium">{router.query.perihal}</p>
          </div>
          <div className="flex items-center gap-[44px] mt-2">
            <div className="w-full">
              <p className="text-[#6B7280]">Kabupaten</p>
              <div className="flex items-center border px-3 py-2 rounded-sm mt-2">
                <p className="text-[#374151] font-medium">{router.query.kabupaten}</p>
              </div>
            </div>
            <div className="w-full">
              <p className="text-[#6B7280]">Kecamatan</p>
              <div className="flex items-center border px-3 py-2 rounded-sm mt-2">
                <p className="text-[#374151] font-medium">{router.query.kecamatan}</p>
              </div>
            </div>
            <div className="w-full">
              <p className="text-[#6B7280]">Desa / Kelurahan</p>
              <div className="flex items-center border px-3 py-2 rounded-sm mt-2">
                <p className="text-[#374151] font-medium">{router.query.kelurahan}</p>
              </div>
            </div>
          </div>
          <p className="text-[#6B7280] mt-2">Detail Aspirasi</p>
          <div className="flex items-center border px-3 py-2 rounded-sm mt-2">
            <p className="text-[#374151] font-normal">{router.query.detail}</p>
          </div>
          <div className="flex justify-center"> {router.query.image && <img src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + router.query.image} />}</div>
        </div>
      </div>
    </>
  );
};

export default DetailAspirasi;
