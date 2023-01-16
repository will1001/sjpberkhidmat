import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useFetch from "../../API/useFetch";
import NewButton from "../NewButton";
import icon from "../../utility/icon/centerIcon.png";

const indexProgram = () => {
  const router = useRouter();
  const style = {
    padding: "9px 21px",
    gap: "8px",
    width: "192px",
    height: "42px",
    background: "#E44700",
    borderRadius: "4px",
    fontFamily: "Work Sans",
    fontWeight: 600,
    fontSize: "18px",
    textAlign: "center",
    color: "#FFFFFF",
  };

  const getArtikel = useFetch("get", "user/articles?page=1");

  const handleTambah = () => {
    router.push("/artikel/TambahProgram");
  };
  const data = getArtikel.data;
  console.log(data);

  return (
    <div className="ml-[59px] mt-[67px]">
      <p className="text-[32px] font-bold text-[#374151] font-serif mb-4">Program</p>
      <NewButton title={"Tambah Program"} style={style} action={() => handleTambah()} />
      <div className="h-[72px] flex items-center justify-between gap-2 pr-[40px]">
        <div>
          <img src={icon.src} alt="icon.png" />
        </div>
        <p className="text-[#374151] text-[21px] font-medium pl-2  w-full">Sem enim aenean id aliquam eget feugiat.</p>
        <div className="h-[36px] w-[108px] bg-[#FFECE4] rounded-sm flex items-center justify-center">
          <p className="text-[#FF5001] text-[14px] font-semibold">Published</p>
        </div>
        <div className="h-[40px] w-[42px] border-2 border-[#374151] rounded-md"></div>
        <div className="h-[40px] w-[42px] border-2 border-[#374151] rounded-md"></div>
      </div>
    </div>
  );
};

export default indexProgram;
