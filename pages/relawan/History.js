import { useRouter } from "next/router";
import React from "react";
import Logo from "../../src/utility/Logo";
import backIcon from "../../src/utility/icon/Back_Icon.png";

import uploadIcon from "../../src/utility/icon/upload_plano.png";
import deleteIcon from "../../src/utility/icon/delet_icon.png";
import editIcon from "../../src/utility/icon/edit_icon.png";
import useFetch from "../../src/API/useFetch";
import { useState } from "react";
import { useEffect } from "react";
import axiosFetch from "../../src/API/axiosFetch";
import { useSelector } from "react-redux";
import { SearchIcon } from "../../src/utility/icon/icon";

const History = () => {
  const token = useSelector((state) => state.user.token);
  const roles = useSelector((state) => state.user.roles);
  const router = useRouter();
  const getPlano = useFetch("get", "user/real_count/plano?page=1");
  const [planao, setPlano] = useState();

  useEffect(() => {
    axiosFetch("get", "user/real_count/plano?page=1", {}, token)
      .then((res) => setPlano(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(planao);
  return (
    <>
      <div className="text-[#374151] p-6">
        <div className="flex gap-12 border-b-2">
          <Logo />
          <p className="text-[26px] font-semibold">Histori Upload C1 Plano</p>
        </div>

        <div onClick={() => router.back()} className="p-2 flex items-center w-[149px] justify-center gap-2 rounded-sm mt-[40px] cursor-pointer bg-[#374151]">
          <img src={backIcon.src} alt="back_icon.png" />
          <p className="text-white text-[21px] font-semibold">Kembali</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center w-[220px] border rounded-sm mt-3 py-1 px-2 stroke-black">
            <input className="outline-0" type={"text"} id={"search"} placeholder="Cari Data" />
            <div className="h-[15px] w-[15px] flex items-center">
              <SearchIcon />
            </div>
          </div>
          <div className="flex bg-[#E44700] items-center  justify-center gap-2 py-2 px-3 rounded-sm cursor-pointer">
            <img src={uploadIcon.src} alt="upload_plano.png" />
            <p className="text-white font-semibold">Upload Foto C1 Plano</p>
          </div>
        </div>
        <div className="flex bg-[#374151] text-white gap-3 p-2 mt-3 rounded-t-sm">
          <p className="w-[100px]">Thumbnail</p>
          <p className="w-[570px]">Nama File</p>
          <p className="w-[200px]">Waktu Upload</p>
          <p className="w-[200px]">Relawan</p>
          <p className="w-[150px]">Status</p>
          <p className="w-[120px]">Aksi</p>
        </div>
        {getPlano?.data?.map((res, i) => (
          <div style={(i + 1) % 2 !== 0 ? { background: "#F9FAFB" } : { background: "white" }} className="flex py-[20px] items-center gap-3" key={res._id}>
            <div className="w-[100px] justify-center flex">{res.image && <img className="w-[80px] h-[80px]" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image} />}</div>
            <p className="w-[570px]">{res.image}</p>
            <p className="w-[200px]">
              {res?.createdAt?.split("T").pop().split(".").shift().split(":")[0]}:{res?.createdAt?.split("T").pop().split(".").shift().split(":")[1]} | {res?.createdAt?.split("T").shift().split("-").reverse().join("-")}
            </p>
            <p className="w-[200px]">{res.id_relawan}</p>
            <p className="w-[150px]">{res.status}</p>
            <div className="w-[120px] flex gap-2 items-center">
              <img
                onClick={() =>
                  router.push({
                    pathname: "./InputData",
                    query: { plano: res.image },
                  })
                }
                className="cursor-pointer"
                src={editIcon.src}
              />
              <img className="cursor-pointer" src={deleteIcon.src} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default History;
