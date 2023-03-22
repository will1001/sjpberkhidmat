import React, { useEffect, useRef, useState } from "react";

import { DeletIcon } from "../../utility/icon/icon";
import Logo from "../../utility/Logo";
import NewButton from "../NewButton";
import useFetch from "../../API/useFetch";
import uploadFile from "../../utility/icon/uploadIcon.png";
import publikasiProgram from "../../utility/img/publikasiProgram.png";
import berhasilImg from "../../utility/img/berhasiPost.png";
import axiosFetch from "../../API/axiosFetch";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const DynamicHeader = dynamic(() => import("./TextEditor"), {
  ssr: false,
});

const AddProgram = () => {
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

  //   const handleFormat = (e) => {
  //     setFormat(e.target.value);

  //   };
  
  const router = useRouter();
  const [switchButton, setSwitchButton] = useState(false);
  const [fileUpload, setFileUpload] = useState("image");
  const [popUp, setPopUp] = useState(false);
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);
  const [formProgram, setFormProgram] = useState({
    title: "",
    description: "",
    wilayah: "",
    category: "",
    image: null,
    video: null,
    publication: false,
  });
  const kabupaten = useFetch("get", "user/kabupaten");
  const artikel = useFetch("get", "user/articles?page=1&type=program");
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

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
  //   console.log(selectCategory);

  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  //   const switchPublication = () =>

  const postArtikel = async (e) => {
    const a = new FormData();
    a.append("title", formProgram.title);
    a.append("description", formProgram.description);
    a.append("category", formProgram.category);
    if (fileUpload === "image") {
      a.append("image", imageFile);
    } else {
      a.append("video", formProgram.video);
    }
    a.append("type", "program");
    a.append("publication", formProgram.publication);
    a.append("id_kabupaten", formProgram.id_kabupaten);
    a.append("id_kecamatan", formProgram.id_kecamatan);
    a.append("id_kelurahan", formProgram.desa);
    a.append("id_periode", periode);
    // console.log(imageFile);

    console.log(e);
    {
      await axiosFetch("post", `user/articles`, a, token)
        .then((res) => {
          console.log(res);
          setBerhasil(true);
          setFormProgram({
            title: "",
            description: "",
            wilayah: "",
            category: "",
            image: "",
            publication: false,
          });
          kecamatan();
          kelurahan();
        })
        .catch((error) => {
          console.log(error.data);
        });
    }
  };

  const [berhasil, setBerhasil] = useState(false);
  const handleBerhasil = () => {
    setFormProgram({
      ...formProgram,
      title: "",
      category: "",
      description: "",
      image: "",
      publication: false,
      wilayah: "",
    });
    setPopUp(false);
    setBerhasil(false);
  };

  const [selectText, setSelectText] = useState();
  const callTextEditor = (setFormProgram, value, formProgram) => {
    return (
      <DynamicHeader
        value={value}
        setFormProgram={setFormProgram}
        formProgram={formProgram}
      />
    );
  };
  const [imagePreview, setImagePreview] = useState();
  const [imageFile, setImageFile] = useState();
  const [videoPreview, setVideoPreview] = useState();
  const [videoPlay, setVideoPlay] = useState();
  useEffect(() => {
    if (formProgram?.image) {
      {
        if (formProgram?.image?.type === "video/mp4") {
          setVideoPreview(URL.createObjectURL(formProgram.image));
          setImagePreview();
        } else if (formProgram?.image?.type === "image/jpeg") {
          setImagePreview(URL.createObjectURL(formProgram.image));
          setVideoPreview();
        } else if (formProgram?.image?.type === "image/jpg") {
          setImagePreview(URL.createObjectURL(formProgram.image));
          setVideoPreview();
        } else if (formProgram?.image?.type === "image/png") {
          setImagePreview(URL.createObjectURL(formProgram.image));
          setVideoPreview();
        } else {
          alert("format file tidak di dukung");
        }
      }
    }
  }, [fileUpload, formProgram, imageFile]);

  // useEffect(() => {
  //   if (formProgram?.image?.type === "video/mp4") {
  //     setVideoPlay(
  //       <ReactPlayer
  //         height={200}
  //         width={400}
  //         playing={false}
  //         controls={true}
  //         volume={1}
  //         url={`${videoPreview}`}
  //       />
  //     );
  //   } else {
  //     setVideoPlay(
  //       <ReactPlayer
  //         height={200}
  //         width={400}
  //         playing={false}
  //         controls={true}
  //         volume={1}
  //         url={`${videoPreview}`}
  //       />
  //     );
  //   }
  // }, [videoPreview,formProgram]);

  const changeKabupaten = async (idKabupaten) => {
    setFormProgram({ ...formProgram, id_kabupaten: idKabupaten });
    const res = await axiosFetch("get", `user/kecamatan/${idKabupaten}`);
    setKecamatan(res.data);
  };

  const changeKecamatan = async (idKecamatan) => {
    setFormProgram({ ...formProgram, id_kecamatan: idKecamatan });
    const res = await axiosFetch("get", `user/kelurahan/${idKecamatan}`);
    setKelurahan(res.data);
  };

  console.log(formProgram.image);

  return (
    <>
      <div
        className={`bg-slate-400 bg-opacity-50 z-50 absolute w-screen top-0 h-[1100px] ${
          popUp === true ? "visible" : "hidden"
        }`}
      >
        <div className="h-[410px] w-[620px] ml-[416px] mt-[120px] bg-white absolute">
          <div
            onClick={() => setPopUp(false)}
            className="h-[24px] w-[24] pr-2  absolute top-0 right-0 text-[24px] font-semibold text-[#9CA3AF] cursor-pointer"
          >
            X
          </div>
          <div className="flex justify-center mt-[30px]">
            {berhasil === false ? (
              <img src={publikasiProgram.src} alt="publikasi_program.png" />
            ) : (
              <img src={berhasilImg.src} alt="berhasil.png" />
            )}
          </div>
          <p className="text-[32px] text-[#374151] font-bold flex justify-center pt-[32px] pb-[16px]">
            {berhasil === false
              ? "Publikasikan Program?"
              : "Publikasi Berhasil"}
          </p>
          <p className="text-[#374151] flex justify-center pb-[32px]">
            {berhasil === false
              ? "anda akan menambahkan data program"
              : "Program telah ditambakan"}
          </p>
          <div className="flex justify-center items-center gap-8">
            {berhasil === false ? (
              <>
                <div
                  onClick={() => setPopUp(false)}
                  className="cursor-pointer w-[184px] h-[49px] border border-[#9CA3AF] rounded-sm flex items-center justify-center"
                >
                  <p className="text-[18px] text-[#374151] font-semibold">
                    Batal
                  </p>
                </div>
                <div
                  onClick={postArtikel}
                  className="cursor-pointer w-[184px] h-[49px] bg-[#FF5001] rounded-sm flex items-center justify-center"
                >
                  <p className="text-[18px] text-[#fff] font-semibold">
                    Publikasikan
                  </p>
                </div>
              </>
            ) : (
              <div
                onClick={handleBerhasil}
                className="cursor-pointer w-[184px] h-[49px] bg-[#FF5001] rounded-sm flex items-center justify-center"
              >
                <p className="text-[18px] text-[#fff] font-semibold">OK</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex pl-[42px] mt-[32px] gap-4 border-b-2">
        <div className="flex justify-between w-full pr-[40px]">
          <Logo />
          {/* button publikasian */}
          <div className="flex items-center gap-3">
            {" "}
            <div onClick={() => setPopUp(!popUp)}>
              <NewButton title={"Publikasikan"} style={publikasiStyle} />
            </div>
            <div
              onClick={() => router.back()}
              className="flex border cursor-pointer px-4 text-[#B91C1C] font-medium border-[#B91C1C] rounded-md  h-[42px] justify-center items-center"
            >
              <p className="">Batal</p>
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
              onChange={(e) =>
                setFormProgram({ ...formProgram, title: e.target.value })
              }
              className="border border-[#D1D5DB] h-[48px] outline-0 rounded-md p-[12px] text-[#374151] font-medium"
              value={formProgram?.title}
              type={"text"}
              id="title"
            />

            {/* description  */}
            <label
              id="title"
              className="text-[#6B7280] text-[16px] font-serif pt-[60px]"
            >
              detail Program
            </label>
            <div className="w-[790px]">
              {callTextEditor(
                setFormProgram,
                formProgram.description,
                formProgram
              )}
            </div>
          </div>
        </div>
        <div className="basis-4/12  pt-[34px] pl-[50px] pr-[41px] border-l-2">
          <p className="font-bold text-[#374151] text-[18px] mb-[16px]">
            Publikasi di Website
          </p>
          <div className="flex items-center gap-4">
            <div
              onClick={() => {
                setSwitchButton(!switchButton);
                setFormProgram({ ...formProgram, publication: switchButton });
              }}
              className={`w-[56px] h-[30px] cursor-pointer flex items-center px-[2px] rounded-full ${
                formProgram.publication === true
                  ? ` bg-[#FF5001]  justify-end`
                  : "bg-[#6B7280]"
              }`}
            >
              <div className={`bg-white w-[26px] h-[26px] rounded-full`}></div>
            </div>
            <p className="font-medium text-[#374151]">Publikasikan</p>
          </div>
          <p className="text-[18px] text-[#374151] font-bold pt-[38px] pb-[24px]">
            Wilayah Tujuan Program
          </p>
          <div className="flex flex-col gap-2">
            <label
              id="kota"
              value="kota"
              className="text-[12px] text-[#374151]"
            >
              Kabupaten / Kota
            </label>
            <select
              onChange={(e) => changeKabupaten(e.target.value)}
              id="kabupaten"
              className="h-[40px] w-[363px] border text-[#374151]"
            >
              <option value="" disabled selected>
                Pilih Kabupaten
              </option>
              {kabupaten.data?.map((res, i) => {
                return (
                  <option key={i} value={res._id}>
                    {res.name}
                  </option>
                );
              })}
            </select>
            <label
              id="kota"
              value="kota"
              className="text-[12px] text-[#374151]"
            >
              kecamatan
            </label>
            <select
              onChange={(e) => changeKecamatan(e.target.value)}
              id="kecamatan"
              className="h-[40px] w-[363px] border text-[#374151]"
            >
              <option value="" disabled selected>
                Pilih Kecamatan
              </option>
              {kecamatan.data?.map((res, i) => {
                return (
                  <option key={i} value={res._id}>
                    {res.name}
                  </option>
                );
              })}
            </select>
            <label
              id="kota"
              value="kota"
              className="text-[12px] text-[#374151]"
            >
              Kel / Desa
            </label>
            <select
              onChange={(e) =>
                setFormProgram({ ...formProgram, desa: e.target.value })
              }
              id="kecamatan"
              className="h-[40px] w-[363px] border text-[#374151]"
            >
              <option value="" disabled selected>
                Pilih Kecamatan
              </option>
              {kelurahan.data?.map((res, i) => {
                return (
                  <option key={i} value={res._id}>
                    {res.name}
                  </option>
                );
              })}
            </select>
            {/* <div className="flex items-center gap-2">
              {kabupaten?.data
                ?.filter((item, i) => {
                  const search = formProgram?.wilayah?.toLowerCase();
                  const name = item?.name.toLowerCase();
                  return search && name?.match(search);
                })
                .slice(0, 2)
                .map((res) => {
                  return (
                    <div
                      onClick={() =>
                        setFormProgram({
                          ...formProgram,
                          wilayah: res?.name.toLowerCase(),
                        })
                      }
                      value={res.name}
                      key={res._id}
                      className="flex font-sans items-center justify-center rounded-full h-[38px] px-[18px] bg-[#374151] text-[12px] text-white"
                    >
                      {res.name}
                    </div>
                  );
                })}
            </div> */}
            <p className="text-[18px] text-[#374151] font-bold pt-[30px]">
              category Program
            </p>
            {categoryProgram.map((res) => {
              return (
                <div
                  key={res.id}
                  onClick={() => {
                    setSelecCategory(res.name);
                    setFormProgram({ ...formProgram, category: res?.name });
                  }}
                  value={selectCategory}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`h-[30px] w-[30px] rounded-full cursor-pointer ${
                      res.name === selectCategory
                        ? "bg-[#FF5001]"
                        : "border-2 border-[#D1D5DB]"
                    }  `}
                  />
                  <p
                    className={`text-[16px] font-medium ${
                      res.name === selectCategory
                        ? "text-[#FF5001]"
                        : "text-[#374151]"
                    }`}
                  >
                    {res.name}
                  </p>
                </div>
              );
            })}
            {fileUpload === "image" ? (
              <>
                <div className={`${formProgram?.image && "visible"}`}>
                  <div
                    className={`${
                      imagePreview === undefined ? "hidden" : "visible"
                    }`}
                  >
                    <img src={imagePreview} alt="preview" />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <iframe
                  width="420"
                  height="315"
                  src={
                    "https://www.youtube.com/embed/" +
                    videoPreview?.split("=").pop()
                  }
                ></iframe>
              </div>
            )}

            <div className="flex">
              <div className="flex mr-3">
                <span className="mr-1">Gambar</span>
                <input
                  type="radio"
                  name="file"
                  onChange={() => {
                    setFileUpload("image");
                  }}
                  checked={fileUpload === "image" && true}
                />
              </div>
              <div className="flex">
                <span className="mr-1">Video</span>
                <input
                  type="radio"
                  name="file"
                  onChange={() => {
                    setFileUpload("video");
                  }}
                  checked={fileUpload === "video" && true}
                />
              </div>
            </div>
            {fileUpload === "image" ? (
              <div>
                <p className="text-[18px] text-[#374151] font-bold pt-[30px]">
                  Media File (Foto)
                </p>
                <label
                  htmlfor="file_upload_2"
                  className="h-[112px] border border-[#D1D5DB] cursor-pointer"
                >
                  <div className="flex flex-col items-center pt-4">
                    <img src={uploadFile.src} alt="upload here" />
                    <p className="text-[12px] text-[#000000] font-semibold">
                      <span className="text-[#FF5001]">Upload a file </span>of
                      drag and drop{" "}
                    </p>
                    <p className="text-[12px] font-normal">PNG, JPG, max 2MB</p>
                  </div>
                  <input
                    onChange={(e) => {
                      // setFormProgram({
                      //   ...formProgram,
                      //   image: e.target.files[0],
                      // });
                      setFormProgram({
                        ...formProgram,
                        video: null,
                      });
                      // console.log(e.target.files[0]);
                      // console.log("asdasd");
                      setImageFile(e.target.files[0]);
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                    }}
                    id="file_upload_2"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div>
                <span className="mr-1">Link Video</span>
                <input
                  className="border border-[#D1D5DB]"
                  type="text"
                  onChange={(e) => {
                    // setFormProgram({
                    //   ...formProgram,
                    //   image: null,
                    // });
                    setImageFile(null);
                    setFormProgram({
                      ...formProgram,
                      video: e.target.value,
                    });
                    setVideoPreview(e.target.value);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProgram;
