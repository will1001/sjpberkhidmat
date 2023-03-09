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
import alertInput from "../../src/utility/img/alert_realcount.png";

const History = () => {
  const token = useSelector((state) => state.user.token);
  const roles = useSelector((state) => state.user.roles);
  const periode = useSelector((state) => state.panel.idPeriode);
  const router = useRouter();
  // const getPlano = useFetch("get", "user/real_count/plano?page=1");
  const [planao, setPlano] = useState();
  const [alert, setalert] = useState(false);
  const [popup, setPopup] = useState(false);
  const [uploadPlano, setUploadPlano] = useState();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (keyword !== "" && keyword.length >= 3) {
      axiosFetch(
        "get",
        `user/real_count/plano?page=1&keyword=${keyword}`,
        {},
        token
      )
        .then((res) => setPlano(res))
        .catch((err) => console.log(err));
    } else {
      axiosFetch("get", "user/real_count/plano?page=1&limit=100", {}, token)
        .then((res) => setPlano(res))
        .catch((err) => console.log(err));
    }
  }, [keyword]);

  const hapusPlano = (id) =>
    axiosFetch("delete", `user/real_count/plano/${id}`, {}, token)
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));

  const postPlano = async () => {
    const a = new FormData();
    a.append("image", uploadPlano);
    a.append("id_periode", periode);
    {
      await axiosFetch("post", `user/real_count/plano`, a, token)
        .then((res) => {
          console.log(res);
          setUploadPlano();
          setPopup(false);
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  console.log(roles);
  return (
    <>
      <div
        className={`${
          popup === false ? "hidden" : "visible"
        } fixed left-0 w-screen h-screen bg-[#37415152]`}
      >
        <div className="absolute bg-white py-12 rounded-sm px-12 left-[380px] top-[100px]">
          <p
            onClick={() => setPopup(false)}
            className="absolute pr-2 text-[18px] font-medium text-[#374151] cursor-pointer top-0 right-0"
          >
            X
          </p>
          <p className="text-[#374151] text-[32px] font-bold">
            Upload Foto C1 Plano
          </p>
          <div className="bg-[#FFECE480] mt-3">
            <img src={alertInput.src} alt="alert_input.png" />
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-[#374151]">Upload Foto C Plano</p>
            {uploadPlano === undefined ? (
              <label
                htmlFor="input"
                className="flex flex-col items-center border py-4 px-16 rounded-md cursor-pointer"
              >
                <img src={uploadIcon.src} alt="uploadIcon.png" />

                <p className="text-[12px] text-[#E44700] font-semibold">
                  Upload a file{" "}
                  <span className="text-black">of drag and drop</span>
                </p>
                <p className="text-[12px]">PNG, JPG, PDF upto 5MB</p>
              </label>
            ) : (
              <div>
                {uploadPlano !== undefined && (
                  <img
                    className="w-[300px] h-[150px]"
                    src={URL.createObjectURL(uploadPlano)}
                  />
                )}
              </div>
            )}

            <input
              onChange={(e) => setUploadPlano(e.target.files[0])}
              id="input"
              className="hidden"
              type={"file"}
            />
          </div>
          <div className="flex justify-end">
            <div
              onClick={postPlano}
              className="bg-[#E44700] text-white font-semibold py-2 px-4 mt-3 rounded-md cursor-pointer"
            >
              Upload Sekarang
            </div>
          </div>
        </div>
      </div>
      <div className="text-[#374151] p-6">
        <div className="flex gap-12 border-b-2">
          <Logo />
          <p className="text-[26px] font-semibold">
            {" "}
            {roles === "relawan"
              ? "History Upload C1 Plano"
              : "Foto C Plano (Diupload Relawan)"}
          </p>
        </div>

        <div
          onClick={() => router.back()}
          className="p-2 flex items-center w-[149px] justify-center gap-2 rounded-sm mt-[40px] cursor-pointer bg-[#374151]"
        >
          <img src={backIcon.src} alt="back_icon.png" />
          <p className="text-white text-[21px] font-semibold">Kembali</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center w-[220px] border rounded-sm mt-3 py-1 px-2 stroke-black">
            <input
              onChange={(e) => setKeyword(e.target.value)}
              className="outline-0"
              type={"text"}
              id={"search"}
              placeholder="Cari Data"
            />
            <div className="h-[15px] w-[15px] flex items-center">
              <SearchIcon />
            </div>
          </div>
          {roles === "relawan" && (
            <div
              onClick={() => setPopup(true)}
              className="flex bg-[#E44700] items-center  justify-center gap-2 py-2 px-3 rounded-sm cursor-pointer"
            >
              <img src={uploadIcon.src} alt="upload_plano.png" />
              <p className="text-white font-semibold">Upload Foto C1 Plano</p>
            </div>
          )}
        </div>
        <div className="">
          <div className="flex items-center bg-[#374151] text-white gap-3 p-2 mt-3 rounded-t-sm mr-[50px] w-screen h-[50px]">
            <p className="w-[100px]">Thumbnail</p>
            <p className="w-[450px]">Nama File</p>
            <p className="w-[180px]">Waktu Upload</p>
            <p className="w-[200px]">Relawan</p>
            <p className="w-[150px]">Status</p>
            <p className="w-[200px] text-center">Aksi</p>
          </div>
          {planao?.data?.data?.map((res, i) => (
            <div
              style={
                (i + 1) % 2 !== 0
                  ? { background: "#F9FAFB" }
                  : { background: "white" }
              }
              className="flex py-[20px] items-center gap-3 p-2 mr-[50px] w-screen"
              key={res._id}
            >
              <div className="w-[100px] justify-center flex">
                {res.image !== undefined && (
                  <img
                    className="w-[80px] h-[80px]"
                    src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image}
                  />
                )}
              </div>
              <p className="w-[450px]">{res.image}</p>
              <p className="w-[180px]">
                {
                  res?.createdAt
                    ?.split("T")
                    .pop()
                    .split(".")
                    .shift()
                    .split(":")[0]
                }
                :
                {
                  res?.createdAt
                    ?.split("T")
                    .pop()
                    .split(".")
                    .shift()
                    .split(":")[1]
                }{" "}
                |{" "}
                {res?.createdAt
                  ?.split("T")
                  .shift()
                  .split("-")
                  .reverse()
                  .join("-")}
              </p>
              <p className="w-[200px]">{res?.relawan?.name}</p>
              <p className="w-[150px]">{res?.status}</p>
              <div className="w-[200px] flex gap-2 items-center">
                {roles === "relawan" ? (
                  <img
                    onClick={() =>
                      router.push({
                        pathname: "./InputData",
                        query: { plano: res.image, id: res._id },
                      })
                    }
                    className="cursor-pointer"
                    src={editIcon.src}
                  />
                ) : (
                  <div
                    onClick={() =>
                      router.push({
                        pathname: "./InputData",
                        query: { plano: res.image, id: res._id },
                      })
                    }
                    className="flex rounded-xl bg-[#E44700] items-center  justify-center gap-2 py-2 px-6 cursor-pointer"
                  >
                    <img src={uploadIcon.src} alt="upload_plano.png" />
                    <p className="text-white font-semibold">Verifikasi</p>
                  </div>
                )}

                {alert === false ? (
                  <img
                    onClick={() => setalert(true)}
                    className="cursor-pointer"
                    src={deleteIcon.src}
                  />
                ) : (
                  <div className="flex gap-3 font-medium">
                    <div
                      className="cursor-pointer"
                      onClick={() => setalert(false)}
                    >
                      Batal
                    </div>
                    <div className="text-red-700 cursor-pointer">Hapus</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
