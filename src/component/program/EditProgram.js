import React, { useEffect, useRef, useState } from "react";
import Logo from "../../utility/Logo";
import NewButton from "../NewButton";
import useFetch from "../../API/useFetch";
import uploadFile from "../../utility/icon/uploadIcon.png";
import publikasiProgram from "../../utility/img/publikasiProgram.png";
import axiosFetch from "../../API/axiosFetch";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const DynamicHeader = dynamic(() => import("./TextEditor"), {
  ssr: false,
});

const EditProgram = ({ close, data }) => {
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
  const draftStyle = {
    width: "159px",
    height: "42px",
    border: "1px solid #9CA3AF",
    borderRadius: "4px",
    fontFamily: "Work Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "120%",
    textAlign: "center",
    color: "#374151",
  };

  const [switchButton, setSwitchButton] = useState(false);

  const kabupaten = useFetch("get", "user/kabupaten");
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);

  const categoryProgram = [
    {
      id: 1,
      name: "Bantuan Sosial",
      title: "bantuan Sosial",
    },
    {
      id: 2,
      name: "Infrastruktur",
      title: "infrastruktur",
    },
    { id: 3, name: "Pendidikan", title: "pendidikan" },
    { id: 4, name: "Lapangan Kerja", title: "lapanganKerja" },
    { id: 5, name: "Peraturan Daerah", title: "peraturanDaerah" },
    { id: 6, name: "Ormas & Keagamaan", title: "ormasKeagamaan" },
    {
      id: 7,
      name: "Kesehatan",
      title: "kesehatan",
    },
    {
      id: 8,
      name: "Politik & Pemerintahan",
      title: "politik",
    },
    {
      id: 9,
      name: "Ekonomi & Bisnis",
      title: "ekonomiBisnis",
    },
  ];

  const [selectCategory, setSelecCategory] = useState();
  const router = useRouter();

  const [formProgram, setFormProgram] = useState({
    title: "",
    description: "",
    wilayah: "",
    category: "",
    image: "",
    publication: false,
  });

  const postArtikel = async (id) => {
    const a = new FormData();
    if (dataEdit.image instanceof File) a.append("image", dataEdit.image);
    a.append("title", dataEdit.title);
    a.append("description", dataEdit.description);
    a.append("category", dataEdit.category);
    if (imagePreview !== undefined) {
      a.append("image", imagePreview);
    }
    a.append("publication", dataEdit.publication);
    a.append("id_kabupaten", dataEdit.id_kabupaten);
    a.append("id_kecamatan", dataEdit.id_kecamatan);
    a.append("id_kelurahan", dataEdit.desa);
    a.append("id_periode", periode);

    {
      await axiosFetch("put", `user/articles/${id}`, a, token)
        .then((res) => {
          //   console.log(res);
          console.log(dataEdit);
          close();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const [dataEdit, setDataEdit] = useState(data);

  const callTextEditor = (setFormProgram, value, formProgram) => {
    return <DynamicHeader value={value} setFormProgram={setFormProgram} formProgram={formProgram} />;
  };

  const [imagePreview, setImagePreview] = useState();
  const [videoPreview, setVideoPreview] = useState();
  const [videoEdit, setVideoEdit] = useState();
  const [fileName, setFileName] = useState();
  const [videoPlay, setVideoPlay] = useState();
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  useEffect(() => {
    if (dataEdit?.image?.type === "video/mp4") {
      setVideoEdit(URL.createObjectURL(dataEdit?.image));
      setVideoPreview();
    } else {
      setVideoPreview(data?.image);
      setVideoEdit();
    }
  }, [dataEdit?.image]);

  useEffect(() => {
    if (videoPreview === undefined) {
      setVideoPlay(<ReactPlayer height={200} width={400} playing={false} controls={true} volume={1} url={`${videoEdit}`} />);
    } else if (videoEdit === undefined) {
      setVideoPlay(<ReactPlayer height={200} width={400} playing={false} controls={true} volume={1} url={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + videoPreview}`} />);
    } else {
      setVideoPlay(<ReactPlayer height={200} width={400} playing={false} controls={true} volume={1} url={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + videoPreview}`} />);
    }
  }, [videoPreview, videoEdit, data]);

  const changeKabupaten = async (idKabupaten) => {
    setDataEdit({ ...dataEdit, id_kabupaten: idKabupaten });
    const res = await axiosFetch("get", `user/kecamatan/${idKabupaten}`);
    setKecamatan(res.data);
  };

  const changeKecamatan = async (idKecamatan) => {
    setDataEdit({ ...dataEdit, id_kecamatan: idKecamatan });
    const res = await axiosFetch("get", `user/kelurahan/${idKecamatan}`);
    setKelurahan(res.data);
  };

  console.log(dataEdit);

  return (
    <>
      {/* <div className="h-[300px] w-[300px]">
        <img src={formProgram?.image} alt="" />
      </div> */}

      <div className={`bg-slate-400 z-50 bg-opacity-50 absolute w-screen top-0 h-[1100px] ${switchButton === true ? "visible" : "hidden"}`}>
        <div className="h-[410px] w-[620px] ml-[416px] mt-[120px] bg-white absolute">
          <div onClick={() => setSwitchButton(false)} className="h-[24px] w-[24] pr-2  absolute top-0 right-0 text-[24px] font-semibold text-[#9CA3AF] cursor-pointer">
            X
          </div>
          <div className="flex justify-center mt-[30px]">
            <img src={publikasiProgram.src} alt="publikasi_program.png" />
          </div>
          <p className="text-[32px] text-[#374151] font-bold flex justify-center pt-[32px] pb-[16px]">Simpan Program?</p>
          <p className="text-[#374151] flex justify-center pb-[32px]">anda akan merubah data program</p>
          <div className="flex justify-center items-center gap-8">
            <div onClick={() => setSwitchButton(false)} className="cursor-pointer w-[184px] h-[49px] border border-[#9CA3AF] rounded-sm flex items-center justify-center">
              <p className="text-[18px] text-[#374151] font-semibold">Batal</p>
            </div>
            <div onClick={() => postArtikel(dataEdit?._id)} className="cursor-pointer w-[184px] h-[49px] bg-[#FF5001] rounded-sm flex items-center justify-center">
              <p className="text-[18px] text-[#fff] font-semibold">Simpan</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex pl-[42px] mt-[32px] gap-4 border-b-2">
        <Logo />
        <p className="text-[26px] font-semibold font-serif text-[#374151] pr-[400px]">Edit Program</p>
        <div onClick={() => setSwitchButton(true)}>
          <NewButton title={"Simpan"} style={publikasiStyle} />
        </div>
        {/* <NewButton title={"Simpan Draft"} style={draftStyle} /> */}
        {/* <div className="flex border border-[#B91C1C] rounded-md w-[44px] h-[42px] justify-center items-center">
          <DeletIcon />
        </div> */}
      </div>
      <div className="flex pb-[96px]">
        <div className="basis-8/12 bg-[#F9FAFB] pl-[42px] pt-[44px] pr-[60px]">
          <div className="flex flex-col gap-2">
            {/* Judul  */}
            <label id="title" className="text-[#6B7280] text-[16px] font-serif">
              Judul Program
            </label>
            <input
              onChange={(e) => setDataEdit({ ...dataEdit, title: e.target.value })}
              value={dataEdit?.title}
              className="border border-[#D1D5DB] h-[48px] outline-0 rounded-md p-[12px] text-[#374151] font-medium"
              type={"text"}
              id="title"
            />

            {/* description  */}
            <label id="title" className="text-[#6B7280] text-[16px] font-serif pt-[60px]">
              detail Program
            </label>
            <div className="w-[790px]">{callTextEditor(setDataEdit, dataEdit?.description, dataEdit)}</div>
          </div>
        </div>
        <div className="basis-4/12  pt-[34px] pl-[50px] pr-[41px] border-l-2">
          <p className="font-bold text-[#374151] text-[18px] mb-[16px]">Publikasi di Website</p>
          <div className="flex items-center gap-4">
            <div
              onClick={() => setDataEdit({ ...dataEdit, publication: !dataEdit.publication })}
              className={`w-[56px] h-[30px] cursor-pointer flex items-center px-[2px] rounded-full ${dataEdit?.publication === true ? ` bg-[#FF5001]  justify-end` : "bg-[#6B7280]"}`}
            >
              <div className={`bg-white w-[26px] h-[26px] rounded-full`}></div>
            </div>
            <p className="font-medium text-[#374151]">Publikasikan</p>
          </div>
          <p className="text-[18px] text-[#374151] font-bold pt-[38px] pb-[24px]">Wilayah Tujuan Program</p>
          <div className="flex flex-col gap-2">
            <label id="kota" value="kota" className="text-[12px] text-[#374151]">
              Kabupaten / Kota
            </label>
            <select onChange={(e) => changeKabupaten(e.target.value)} id="kabupaten" className="h-[40px] w-[363px] border text-[#374151]">
              <option value={dataEdit?.id_kabupaten} disabled selected>
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
            <label id="kota" value="kota" className="text-[12px] text-[#374151]">
              kecamatan
            </label>
            <select onChange={(e) => changeKecamatan(e.target.value)} id="kecamatan" className="h-[40px] w-[363px] border text-[#374151]">
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
            <label id="kota" value="kota" className="text-[12px] text-[#374151]">
              Kel / Desa
            </label>
            <select onChange={(e) => setDataEdit({ ...dataEdit, desa: e.target.value })} id="kecamatan" className="h-[40px] w-[363px] border text-[#374151]">
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
            <div className="flex items-center gap-2">
              {kabupaten?.data
                ?.filter((item) => {
                  const search = dataEdit?.id_kabupaten?.toLowerCase();
                  const name = item?.name.toLowerCase();
                  return search && name?.match(search);
                })
                .slice(0, 2)
                .map((res) => {
                  return (
                    <div
                      onClick={() =>
                        setDataEdit({
                          ...dataEdit,
                          id_kabupaten: res?.name.toLowerCase(),
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
            </div>
            <p className="text-[18px] text-[#374151] font-bold pt-[30px]">category Program</p>
            {categoryProgram.map((res) => {
              return (
                <div
                  key={res.id}
                  onClick={() => {
                    setSelecCategory(res.name);
                    setDataEdit({ ...dataEdit, category: res?.title });
                  }}
                  value={dataEdit?.category?.toLowerCase()}
                  className="flex items-center gap-4"
                >
                  <div className={`h-[30px] w-[30px] rounded-full cursor-pointer ${dataEdit?.category?.toLowerCase() === res.name.toLowerCase() ? "bg-[#FF5001]" : "border-2 border-[#D1D5DB]"}  `} />
                  <p className={`text-[16px] font-medium ${dataEdit?.category?.toLowerCase() === res.name.toLowerCase() ? "text-[#FF5001]" : "text-[#374151]"}`}>{res.name}</p>
                </div>
              );
            })}
            <p className="text-[18px] text-[#374151] font-bold pt-[30px]">Media File (Foto / Video)</p>
            <label for="file_upload" className="h-[112px] border border-[#D1D5DB] cursor-pointer">
              <div className="">
                {imagePreview === undefined ? (
                  <>
                    {["mp4", "mkv"].includes(dataEdit.image.split(".").pop()) ? (
                      <video className="h-[200px] bg-black w-full" controls>
                        <source src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + dataEdit.image} type="video/mp4" />
                      </video>
                    ) : (
                      <img className="h-[200px] bg-black w-full" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + dataEdit.image} />
                    )}
                  </>
                ) : (
                  <div>
                    {["mp4", "mkv"].includes(imagePreview?.name?.split(".").pop()) ? (
                      <video className="h-[200px] bg-black w-full" controls>
                        <source src={URL.createObjectURL(imagePreview)} />
                      </video>
                    ) : (
                      <img className="h-[200px] bg-black w-full" src={URL.createObjectURL(imagePreview)} />
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center pt-4">
                <img src={uploadFile.src} alt="upload here" />
                <p className="text-[12px] text-[#000000] font-semibold">
                  <span className="text-[#FF5001]">Upload a file </span>of drag and drop{" "}
                </p>
                <p className="text-[12px] font-normal">PNG, JPG, MP4 upto 32MB</p>
              </div>
              <input
                onChange={(e) => {
                  console.log(e.target.files);
                  setImagePreview(e.target.files[0]);
                }}
                id="file_upload"
                type="file"
                class="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProgram;
