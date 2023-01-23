import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useFetch from "../../API/useFetch";
import NewButton from "../NewButton";
import icon from "../../utility/icon/centerIcon.png";
import edit from "../../utility/icon/edit_icon.png";
import delet from "../../utility/icon/delet_icon.png";
import hapusImg from "../../utility/img/hapusData.png";
import axiosFetch from "../../API/axiosFetch";
import EditProgram from "./EditProgram";

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
  const getArtikel = useFetch("get", "user/articles?page=1&type=program");

  const handleTambah = () => {
    router.push("/artikel/TambahProgram");
  };
  const data = getArtikel.data;
  const [editData, setEditData] = useState();

  const [alertHapus, setAlertHapus] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const editFalse = () => setEditActive(false);

  const editHandler = (id) => {
    const res = axiosFetch("get", `user/articles/${id}`).then((res) => {
      setEditData(res?.data?.data);
      setEditActive(true);
      //   console.log(res.data.data);
    });
    console.log(editData);
    // router.push("/artikel/UbahProgram");
    // console.log(id);
  };
  const handleDelet = (id) => {
    console.log(id);

    // const res = axiosFetch("delete", `user/articles/${id}`)
    //   .then((res) => {
    //     console.log("data dihapus");
    //     setAlertHapus(false);
    //     window.location.reload(false);
    //   })
    //   .catch((err) => console.log(err));
  };

  console.log(data);
  return (
    <>
      {editActive === true ? (
        <>
          <div className=" bg-white">
            <EditProgram close={editFalse} data={editData} />
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="ml-[59px] mt-[67px]">
            <p className="text-[32px] font-bold text-[#374151]  font-serif mb-4">
              Program
            </p>
            <div className="mb-[20px]">
              <NewButton
                title={"Tambah Program"}
                style={style}
                action={() => handleTambah()}
              />
            </div>
            {data?.map((res) => {
              return (
                <div
                  key={res._id}
                  className="h-[72px] flex items-center justify-between pl-[16px] gap-2 pr-[16px] border mb-2 rounded-sm  mr-[40px] border-[#D1D5DB]"
                >
                  <div>
                    <img src={icon.src} alt="icon.png" />
                  </div>
                  <p className={`text-[18px] font-medium pl-2  w-full `}>
                    {res.title}
                  </p>
                  <div
                    className={`h-[36px] w-[108px]  rounded-sm flex items-center justify-center ${
                      res?.publication === true
                        ? "text-[#FF5001] bg-[#FFECE4]"
                        : "text-[#374151] bg-[#D1D5DB]"
                    }`}
                  >
                    <p className={`text-[14px] px-2 font-semibold `}>
                      {res?.publication === true ? "Published" : "Unpublished"}
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      editHandler(res._id);
                    }}
                    className="h-[40px] flex items-center justify-center w-[48px] cursor-pointer border-2 border-[#374151] rounded-md"
                  >
                    <img src={edit.src} alt="edit.png" />
                  </div>
                  <div
                    onClick={() => setAlertHapus(true)}
                    className="h-[40px] flex items-center justify-center w-[48px] cursor-pointer border-2 border-[#B91C1C] rounded-md"
                  >
                    <img src={delet.src} alt="delet.src" />
                  </div>
                  <div
                    style={
                      alertHapus === false
                        ? { visibility: "hidden" }
                        : {
                            visibility: "visible",
                            background: "rgba(55, 65, 81, 0.32)",
                          }
                    }
                    className="absolute top-0 left-0 w-screen h-[1200px]"
                  >
                    <div className="h-[420px] w-[610px] rounded-md absolute bg-white border border-orange-600 top-[120px] left-[416px]">
                      <div
                        onClick={() => setAlertHapus(false)}
                        className="absolute pr-2 pt-1 text-[20px] font-semibold text-[#9CA3AF] cursor-pointer top-0 right-0"
                      >
                        X
                      </div>
                      <div className="py-4 flex flex-col gap-2 mt-8">
                        <div className="flex justify-center">
                          <img src={hapusImg.src} alt="hapus.png" />
                        </div>
                        <p className="flex justify-center text-[32px] font-bold text-slate-800">
                          Hapus Data?
                        </p>
                        <p className="flex justify-center text-[18px] text-slate-800">
                          Anda akan menghapus data program
                        </p>
                        <div className="flex gap-6 justify-center">
                          <div
                            onClick={() => setAlertHapus(false)}
                            className="h-[42px] rounded-md w-[184px] bg-orange-600 text-[20px] font-semibold text-white cursor-pointer flex justify-center items-center"
                          >
                            Batalkan
                          </div>
                          <div
                            onClick={() => handleDelet(res._id)}
                            className="h-[42px] rounded-md w-[184px] bg-white border border-slate-800 cursor-pointer text-[20px] font-semibold text-slate-800 flex justify-center items-center"
                          >
                            Hapus
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default indexProgram;
