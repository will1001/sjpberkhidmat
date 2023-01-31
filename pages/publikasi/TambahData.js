import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import NewButton from "../../src/component/NewButton";
import { DeletIcon } from "../../src/utility/icon/icon";
import Logo from "../../src/utility/Logo";
import uploadFile from "../../src/utility/icon/uploadIcon.png";
import PopupBerhasil from "../../src/component/publikasi/PopupBerhasil";
const DynamicHeader = dynamic(() => import("../../src/component/program/TextEditor"), {
  ssr: false,
});

const TambahData = () => {
  const publikasiStyle = {
    width: "155px",
    height: "42px",
    background: "#E44700",
    borderRadius: "4px",
    fontFamily: "Work Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "120%",
    textAlign: "center",
    color: "#FFFFFF",
  };

  const categoryProgram = [
    {
      id: 1,
      name: "Bantuan Sosial",
    },
    {
      id: 2,
      name: "Infrastruktur",
    },
    { id: 3, name: "Pendidikan" },
    { id: 4, name: "Lapangan Kerja" },
    {
      name: "Peraturan Daerah",
    },
    { id: 5, name: "Ormas & Keagamaan" },
    {
      id: 6,
      name: "Kesehatan",
    },
    {
      id: 7,
      name: "Politik & Pemerintahan",
    },
    {
      id: 8,
      name: "Ekonomi & Bisnis",
    },
  ];

  const [selectCategory, setSelecCategory] = useState();
  const [popUp, setPopUp] = useState(false);
  const [berhasil, setBerhasil] = useState(false);
  const [formProgram, setFormProgram] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    publication: true,
  });
  //   text editor variabel
  const callTextEditor = (setFormProgram, value, formProgram) => {
    return <DynamicHeader value={value} setFormProgram={setFormProgram} formProgram={formProgram} />;
  };

  console.log(formProgram);
  return (
    <>
      <PopupBerhasil popUp={popUp} setPopUp={setPopUp} berhasil={berhasil} setBerhasil={setBerhasil} />
      <div className="flex pl-[42px] mt-[32px] gap-4 border-b-2">
        <div className="flex justify-between w-full pr-[40px]">
          <Logo />
          {/* button publikasian */}
          <div className="flex items-center gap-3">
            <div onClick={() => setPopUp(true)}>
              <NewButton title={"Publikasikan"} style={publikasiStyle} />
            </div>
            {/* tombol simpan draft */}
            <div onClick={() => setFormProgram({ ...formProgram, publication: false })} className="flex cursor-pointer py-[7px] px-4 items-center border border-[#374151] rounded-md text-[#374151] text-[18px] font-semibold">
              Simpan Draft
            </div>
            {/* <div className="flex border border-[#B91C1C] rounded-md w-[44px] h-[42px] justify-center items-center">
              <DeletIcon />
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex pb-[96px]">
        <div className="basis-8/12 bg-[#F9FAFB] pl-[42px] pt-[44px] pr-[60px]">
          <div className="flex flex-col gap-2">
            {/* Judul  */}
            <label id="title" className="text-[#6B7280] text-[16px] font-serif">
              Judul Program
            </label>
            <input
              onChange={(e) => setFormProgram({ ...formProgram, title: e.target.value })}
              className="border border-[#D1D5DB] h-[48px] outline-0 rounded-md p-[12px] text-[#374151] font-medium"
              value={formProgram.title}
              type={"text"}
              id="title"
            />

            {/* description  */}
            <label id="title" className="text-[#6B7280] text-[16px] font-serif pt-[60px]">
              detail Program
            </label>
            <div className="w-[790px]">{callTextEditor(setFormProgram, formProgram.description, formProgram)}</div>
          </div>
        </div>
        <div className="basis-4/12  pt-[34px] pl-[50px] pr-[41px] border-l-2">
          <div className="flex flex-col gap-2">
            <p className="text-[18px] text-[#374151] font-bold ">Kategory Program</p>
            {categoryProgram.map((res, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelecCategory(res.name);
                    setFormProgram({ ...formProgram, category: res?.name });
                  }}
                  value={selectCategory}
                  className="flex items-center gap-4"
                >
                  <div className={`h-[30px] w-[30px] rounded-full cursor-pointer ${res.name === selectCategory ? "bg-[#FF5001]" : "border-2 border-[#D1D5DB]"}  `} />
                  <p className={`text-[16px] font-medium ${res.name === selectCategory ? "text-[#FF5001]" : "text-[#374151]"}`}>{res.name}</p>
                </div>
              );
            })}
            <p className="text-[18px] text-[#374151] font-bold pt-[30px]">Thumbnail Artikel</p>
            <label htmlFor="file_upload" className="h-[112px] border border-[#D1D5DB] cursor-pointer">
              {/* <div className={`${formProgram.image && "visible"}`}>
                <div className={`${videoPreview === undefined ? "hidden" : "visible"}`}> {videoPlay === undefined ? <p>Loading....</p> : videoPlay}</div>
                <div className={`${imagePreview === undefined ? "hidden" : "visible"}`}>
                  <img src={imagePreview} alt="preview" />
                </div>
              </div> */}

              <div className="flex flex-col items-center pt-4">
                <img src={uploadFile.src} alt="upload here" />
                <p className="text-[12px] text-[#000000] font-semibold">
                  <span className="text-[#FF5001]">Upload a file </span>of drag and drop{" "}
                </p>
                <p className="text-[12px] font-normal">PNG, JPG, JPEG upto 5MB</p>
              </div>
              <input
                // onChange={(e) => {
                //   console.log(e.target.files);
                //   setFormProgram({
                //     ...formProgram,
                //     image: e.target.files[0],
                //   });
                // }}
                id="file_upload"
                type="file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default TambahData;
