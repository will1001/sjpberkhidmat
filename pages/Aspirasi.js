import React, { useEffect, useState } from "react";
import aspirasiImage from "../src/utility/img/rumah_aspirasi.png";
import backIcon from "../src/utility/icon/back_orange.png";
import { useRouter } from "next/router";
import Logo from "../src/utility/Logo";
import uploadFile from "../src/utility/icon/uploadIcon.png";

const Aspirasi = () => {
  const router = useRouter();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (image === undefined) {
      setPreview();
    } else {
      const objectUrl = URL.createObjectURL(image[0]);
      setPreview(objectUrl);
    }
  }, [image]);

  console.log(preview);

  return (
    <>
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
            <label>Nama</label>
            <input className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"text"} />
          </div>
          <div className="flex justify-between items-center">
            <label>Email</label>
            <input className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"email"} />
          </div>
          <div className="flex justify-between items-center border-b-2 pb-8">
            <label>No.HP</label>
            <input className="border h-[48px] w-[479px] px-2 outline-0 rounded-md " type={"number"} />
          </div>
          <div className="flex justify-between items-center mt-6">
            <label>Perihal</label>
            <input className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"text"} />
          </div>
          <div className="flex justify-between items-center">
            <label>Kabupaten</label>
            <select className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"text"}></select>
          </div>
          <div className="flex justify-between items-center">
            <label>Kecamatan</label>
            <select className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"text"}></select>
          </div>
          <div className="flex justify-between items-center">
            <label>Desa</label>
            <select className="border h-[48px] w-[479px] px-2 outline-0 rounded-md" type={"text"}></select>
          </div>
          <div className="flex justify-between">
            <label>Detail Aspirasi</label>
            <textarea className="border h-[179px] w-[479px] px-2 py-2 outline-0 rounded-md" type={"text"} />
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
                    // console.log(e.target.value);
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
          <div className="flex w-full justify-end mt-[37px]">
            <p className="h-[42px] bg-[#FF5001] flex items-center rounded-md px-4 cursor-pointer text-white font-medium">Sampaikan Aspirasi</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aspirasi;
