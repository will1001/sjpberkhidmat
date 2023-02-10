import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import NewButton from "../../src/component/NewButton";
import { DeletIcon } from "../../src/utility/icon/icon";
import Logo from "../../src/utility/Logo";
import uploadFile from "../../src/utility/icon/uploadIcon.png";
import PopupBerhasil from "../../src/component/publikasi/PopupBerhasil";
import axiosFetch from "../../src/API/axiosFetch";
import Router from "next/router";
import { useSelector } from "react-redux";
const DynamicHeader = dynamic(() => import("../../src/component/program/TextEditor"), {
  ssr: false,
});

const EditData = () => {
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
  const getToken = useSelector((state) => state.user.token);
  const [token, setToken] = useState(getToken);
  const [changeImage, setChangeImage] = useState();
  const [title, setTitle] = useState();
  const [formProgram, setFormProgram] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    publication: true,
    kabupaten: "test",
  });
  //   text editor variabel
  const callTextEditor = (setFormProgram, value, formProgram) => {
    return <DynamicHeader value={value} setFormProgram={setFormProgram} formProgram={formProgram} />;
  };

  const postArtikel = async () => {
    const a = new FormData();
    if (["mp4", "mkv"].includes(Router?.query?.file?.split(".").pop())) {
      a.append("title", formProgram.title);
      a.append("description", "description publikasi video");
      a.append("category", formProgram.category);
      a.append("id_kabupaten", "asdasd");
      if (changeImage !== undefined) {
        a.append("image", changeImage);
      }
      a.append("publication", true);
    } else {
      a.append("title", formProgram.title);
      a.append("description", formProgram.description);
      a.append("category", formProgram.category);
      a.append("id_kabupaten", "asdasd");
      if (changeImage !== undefined) {
        a.append("image", changeImage);
      }
      a.append("publication", true);
    }

    {
      await axiosFetch("put", `user/articles/${Router.query.id}`, a, token)
        .then((res) => {
          console.log(res);
          setBerhasil(true);
        })
        .catch((error) => {
          console.log(error);
          alert(error?.response?.data?.message);
        });
    }
  };
  const postDraftArtikel = async () => {
    const a = new FormData();
    if (["mp4", "mkv"].includes(Router?.query?.file?.split(".").pop())) {
      a.append("title", formProgram.title);
      a.append("description", "description publikasi video");
      a.append("category", formProgram.category);
      a.append("id_kabupaten", "asdasd");
      if (changeImage !== undefined) {
        a.append("image", changeImage);
      }
      a.append("publication", false);
    } else {
      a.append("title", formProgram.title);
      a.append("description", formProgram.description);
      a.append("category", formProgram.category);
      a.append("id_kabupaten", "asdasd");
      if (changeImage !== undefined) {
        a.append("image", changeImage);
      }
      a.append("publication", false);
    }

    {
      await axiosFetch("put", `user/articles/${Router.query.id}`, a, token)
        .then((res) => {
          console.log(res);
          setBerhasil(true);
          Router.back();
        })
        .catch((error) => {
          alert(error?.response?.data?.message);
        });
    }
  };

  useEffect(() => {
    if (["mp4", "mkv"].includes(Router.query.file.split(".").pop().toLowerCase())) {
      setFormProgram({
        ...formProgram,
        title: Router.query.title,
        image: Router.query.file,
        category: Router.query.category,
      });
    } else {
      setFormProgram({
        ...formProgram,
        title: Router.query.title,
        image: Router.query.file,
        category: Router.query.category,
        description: Router.query.description,
      });
    }
  }, [Router.query.id]);

  console.log(Router.query.file);
  return (
    <>
      <PopupBerhasil popUp={popUp} setPopUp={setPopUp} berhasil={berhasil} setBerhasil={setBerhasil} post={postArtikel} />
      <div className="flex pl-[42px] mt-[32px] gap-4 border-b-2">
        <div className="flex justify-between w-full pr-[40px]">
          <Logo />
          {/* button publikasian */}
          <div className="flex items-center gap-3">
            <div onClick={() => setPopUp(true)}>
              <NewButton title={"Publikasikan"} style={publikasiStyle} />
            </div>
            {/* tombol simpan draft */}
            <div onClick={postDraftArtikel} className="flex cursor-pointer py-[7px] px-4 items-center border border-[#374151] rounded-md text-[#374151] text-[18px] font-semibold">
              Simpan Draft
            </div>
            <div onClick={() => Router.back()} className="flex border cursor-pointer border-[#B91C1C] text-[#B91C1C] text-[18px] font-semibold px-4 rounded-md  h-[42px] justify-center items-center">
              Batal
            </div>
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
              value={formProgram?.title}
              type={"text"}
              id="title"
            />

            {/* description  */}
            <label id="title" className="text-[] text-[16px] font-serif pt-[60px]">
              detail Program
            </label>
            <div className="flex gap-3 text-[#6B7280] text-[16px]">
              {["jpg", "jpeg", "png"].includes(formProgram?.image?.split(".").pop().toLowerCase()) ? (
                <p className={`p-2 ${"switchPage" === "artikel" && "text-white bg-[#E44700] rounded-md font-medium"} cursor-pointer`}>Publikasi Artikel</p>
              ) : (
                <p className={`p-2 ${"switchPage" === "video" && "text-[white] font-medium bg-[#E44700] rounded-md"} cursor-pointer`}>Publikasi Video</p>
              )}
            </div>
            <div className={`w-full ${["jpg", "jpeg", "png"].includes(formProgram?.image?.split(".").pop().toLowerCase()) ? "visible" : "hidden"}`}>{callTextEditor(setFormProgram, formProgram.description, formProgram)}</div>
            <div className={`${["mp4", "mkv"].includes(formProgram?.image?.split(".").pop().toLowerCase()) ? "visible" : "hidden"}`}>
              <label htmlFor="video_desctiprion" className=" border border-[#D1D5DB] cursor-pointer">
                {changeImage === undefined ? (
                  <div className="shadow-xl border bg-black rounded-md">
                    {formProgram.image !== "" && (
                      <video className="my-[20px]" controls>
                        <source src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + formProgram.image} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ) : (
                  <>
                    {changeImage !== undefined && (
                      <video className="my-[20px]" controls>
                        <source src={URL.createObjectURL(changeImage)} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </>
                )}

                <div className="flex flex-col items-center pt-4">
                  <img src={uploadFile.src} alt="upload here" />
                  <p className="text-[12px] text-[#000000] font-semibold">
                    <span className="text-[#FF5001]">Upload a file </span>of drag and drop
                  </p>
                  <p className="text-[12px] font-normal">{"switchPage" === "artikel" ? <>PNG, JPG, JPEG upto 5MB</> : <>MP4, MKV upto 50MB</>}</p>
                </div>
                <input
                  onChange={(e) => {
                    console.log(e.target.files);
                    setChangeImage(e.target.files[0]);
                  }}
                  id="video_desctiprion"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
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
                  <div className={`h-[30px] w-[30px] rounded-full cursor-pointer ${res.name === formProgram?.category ? "bg-[#FF5001]" : "border-2 border-[#D1D5DB]"}  `} />
                  <p className={`text-[16px] font-medium ${res.name === formProgram.category ? "text-[#FF5001]" : "text-[#374151]"}`}>{res.name}</p>
                </div>
              );
            })}

            <div className={`${["mp4", "mkv"].includes(formProgram?.image?.split(".").pop().toLowerCase()) ? "hidden" : "visible"} h-[112px] border border-[#D1D5DB] cursor-pointer`}>
              <p className="text-[18px] text-[#374151] font-bold pt-[30px]">Thumbnail Artikel</p>
              <label htmlFor="file_upload">
                <div className={`${changeImage === undefined ? "visible" : "visible"}`}>
                  {/* ["png", "jpeg", "jpg"].includes(formProgram?.image?.split(".").pop().toLowerCase()) */}
                  {changeImage === undefined ? (
                    <img src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + formProgram?.image} alt="preview" />
                  ) : (
                    <div>
                      {changeImage && <img src={URL.createObjectURL(changeImage)} />}

                      {/* <p className="text-[18px] text-red-500 font-bold bg-slate-200 px-4 py-12 flex justify-center">Type File Harus "JPG, JPEG, PNG"</p> */}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center pt-4">
                  <img src={uploadFile.src} alt="upload here" />
                  <p className="text-[12px] text-[#000000] font-semibold">
                    <span className="text-[#FF5001]">Upload a file </span>of drag and drop{" "}
                  </p>
                  <p className="text-[12px] font-normal">PNG, JPG, JPEG upto 5MB</p>
                </div>
                <input
                  onChange={(e) => {
                    console.log(e.target.files);
                    setChangeImage(e.target.files[0]);
                  }}
                  id="file_upload"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditData;