import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useFetch from "../../API/useFetch";
import NewButton from "../NewButton";

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

  console.log(getArtikel);

  return (
    <div className="ml-[59px] mt-[67px]">
      <p className="text-[32px] font-bold text-[#374151] font-serif mb-4">Program</p>
      <NewButton title={"Tambah Program"} style={style} action={() => handleTambah()} />
    </div>
  );
};

export default indexProgram;
