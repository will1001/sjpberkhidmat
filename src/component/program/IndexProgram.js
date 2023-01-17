import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useFetch from "../../API/useFetch";
import NewButton from "../NewButton";
import icon from "../../utility/icon/centerIcon.png";
import edit from "../../utility/icon/edit_icon.png";
import delet from "../../utility/icon/delet_icon.png";
import axiosFetch from "../../API/axiosFetch";
import { useDispatch, useSelector } from "react-redux";
import { editArtikel } from "../../redux/artikel/getIdArtikel";

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
  const dispatch = useDispatch();
  const getArtikel = useFetch("get", "user/articles?page=1");

  const handleTambah = () => {
    router.push("/artikel/TambahProgram");
  };
  const data = getArtikel.data;

  const editHandler = (id) => {
    const res = axiosFetch("get", `user/articles/${id}`).then((res) => {
      dispatch(editArtikel({ data: res?.data }));
      //   console.log(res.data);
    });

    // console.log(id);
    router.push("/artikel/UbahProgram");
  };

  const handleDelet = (id) => {
    const res = axiosFetch("delete", `user/articles/${id}`)
      .then((res) => {
        console.log("berhasil hapus");
      })
      .catch((err) => console.log(err));
  };

  console.log(data);

  return (
    <div className="ml-[59px] mt-[67px]">
      <p className="text-[32px] font-bold text-[#374151]  font-serif mb-4">Program</p>
      <div className="mb-[20px]">
        <NewButton title={"Tambah Program"} style={style} action={() => handleTambah()} />
      </div>

      {data?.map((res) => {
        return (
          <div key={res.id} className="h-[72px] flex items-center justify-between pl-[16px] gap-2 pr-[16px] border mb-2 rounded-sm  mr-[40px] border-[#D1D5DB]">
            <div>
              <img src={icon.src} alt="icon.png" />
            </div>
            <p className="text-[#374151] text-[18px] font-medium pl-2  w-full">{res.title}</p>
            <div className="h-[36px] w-[108px] bg-[#FFECE4] rounded-sm flex items-center justify-center">
              <p className="text-[#FF5001] text-[14px] font-semibold">{res?.publication === true ? "Published" : "Unpublished"}</p>
            </div>
            <div
              onClick={() => {
                editHandler(res._id);
              }}
              className="h-[40px] flex items-center justify-center w-[48px] cursor-pointer border-2 border-[#374151] rounded-md"
            >
              <img src={edit.src} alt="edit.png" />
            </div>
            <div onClick={() => handleDelet(res._id)} className="h-[40px] flex items-center justify-center w-[48px] cursor-pointer border-2 border-[#B91C1C] rounded-md">
              <img src={delet.src} alt="delet.src" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default indexProgram;
