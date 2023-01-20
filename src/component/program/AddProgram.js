import React, { useEffect, useRef, useState } from "react";
import { DeletIcon } from "../../utility/icon/icon";
import Logo from "../../utility/Logo";
import NewButton from "../NewButton";
import selectIcon from "../../utility/icon/SelectIcon.png";
import center from "../../utility/icon/centerIcon.png";
import left from "../../utility/icon/left.png";
import justify from "../../utility/icon/align.png";
import right from "../../utility/icon/right.png";
import useFetch from "../../API/useFetch";
import ImageUploading from "react-images-uploading";
import uploadFile from "../../utility/icon/uploadIcon.png";
import publikasiProgram from "../../utility/img/publikasiProgram.png";
import berhasilImg from "../../utility/img/berhasiPost.png";
import axiosFetch from "../../API/axiosFetch";
import { useSelector } from "react-redux";

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

  //   const handleFormat = (e) => {
  //     setFormat(e.target.value);
  //   };
  const [format, setFormat] = useState();
  const refTextArea = useRef(format);
  const [switchButton, setSwitchButton] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [formProgram, setFormProgram] = useState({
    title: "",
    description: "",
    wilayah: "",
    category: "",
    image: "",
    publication: false,
  });
  const kabupaten = useFetch("get", "user/kabupaten?filter=lombok");
  const artikel = useFetch("get", "user/articles?page=1");

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

  const postArtikel = async () => {
    const a = new FormData();
    a.append("title", formProgram.title);
    a.append("description", formProgram.description);
    a.append("category", formProgram.category);
    a.append("image", formProgram.image);
    a.append("publication", formProgram.publication);
    a.append("id_kabupaten", formProgram.id_kabupaten);
    {
      await axiosFetch("post", `user/articles`, a)
        .then((res) => {
          console.log(res);
          setBerhasil(true);
        })
        .catch((error) => {
          console.log(error);
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

  console.log(formProgram);

  return (
    <>
      <div
        className={`bg-slate-400 bg-opacity-50 absolute w-screen top-0 h-[1100px] ${
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
        <Logo />
        <p className="text-[26px] font-semibold font-serif text-[#374151] pr-[450px]">
          Publikasi Program
        </p>
        {/* button publikasian */}
        <div onClick={() => setPopUp(!popUp)}>
          <NewButton title={"Publikasikan"} style={publikasiStyle} />
        </div>
        {/* button simpan draft */}
        <NewButton title={"Simpan Draft"} style={draftStyle} />
        <div className="flex border border-[#B91C1C] rounded-md w-[44px] h-[42px] justify-center items-center">
          <DeletIcon />
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
              value={formProgram.title}
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
            <div className="flex h-[72px] bg-[#6B7280] border rounde-sm items-center px-[16px] text-[#374151] font-serif gap-6">
              <div className="bg-white h-[48px] rounded-md border w-[183px] flex">
                <label id="heading"></label>
                <select
                  style={{
                    WebkitAppearance: "none",
                    backgroundImage: `url(${selectIcon.src})`,
                  }}
                  id="heading"
                  className="outline-0 cursor-pointer font-medium mx-[14px] w-full bg-right bg-no-repeat"
                >
                  <option value="1">Heading 1</option>
                  <option value="2">Heading 2</option>
                </select>
              </div>
              <div className="flex gap-2">
                <div className="flex bg-white h-[48px] w-[48px] font-semibold items-center justify-center border rounded-md cursor-pointer">
                  B
                </div>
                <div className="flex bg-white h-[48px] w-[48px] italic items-center justify-center border rounded-md cursor-pointer">
                  I
                </div>
                <div className="flex bg-white h-[48px] w-[48px] underline items-center justify-center border rounded-md cursor-pointer">
                  U
                </div>
              </div>
              <div className="flex gap-2">
                <div
                  style={{ backgroundImage: `url(${center.src})` }}
                  className="w-[48px] h-[48px] bg-white bg-no-repeat bg-center border rounded-md cursor-pointer"
                />
                <div
                  style={{ backgroundImage: `url(${left.src})` }}
                  className="w-[48px] h-[48px] bg-white bg-no-repeat bg-center border rounded-md cursor-pointer"
                />
                <div
                  style={{ backgroundImage: `url(${justify.src})` }}
                  className="w-[48px] h-[48px] bg-white bg-no-repeat bg-center border rounded-md cursor-pointer"
                />
                <div
                  style={{ backgroundImage: `url(${right.src})` }}
                  className="w-[48px] h-[48px] bg-white bg-no-repeat bg-center border rounded-md cursor-pointer"
                />
              </div>
            </div>
            <textarea
              onChange={(e) =>
                setFormProgram({ ...formProgram, description: e.target.value })
              }
              ref={refTextArea}
              id="description_program"
              name="description_program"
              value={formProgram.description}
              className={`h-[592px] outline-0 border  border-[#D1D5DB] p-[14px]`}
            />
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
            {/* <input
              onChange={(e) => setFormProgram({ ...formProgram, id_kabupaten: e.target.value })}
              className="h-[40px] outline-0 border border-[#FF5001] rounded-md p-2 text-[#374151] text-[14px]"
              value={formProgram?.id_kabupaten}
              type={"text"}
              id="kota"
            /> */}
            <select
              onChange={(e) =>
                setFormProgram({ ...formProgram, id_kabupaten: e.target.value })
              }
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
            <div className="flex items-center gap-2">
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
            </div>
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
            <p className="text-[18px] text-[#374151] font-bold pt-[30px]">
              Media File (Foto / Video)
            </p>

            <ImageUploading
              multiple
              value={images}
              onChange={(e) => {
                console.log(e[0].file);
                setFormProgram({ ...formProgram, image: e[0].file });
              }}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({ onImageUpload, isDragging, dragProps }) => (
                // write your building UI
                <div
                  className="h-[112px] border border-[#D1D5DB]"
                  style={isDragging ? { background: "#FF5001" } : undefined}
                >
                  <div className="flex justify-center items-center">
                    <button
                      className="flex flex-col items-center pt-4"
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <img src={uploadFile.src} alt="upload here" />
                      <p className="text-[12px] text-[#000000] font-semibold">
                        <span className="text-[#FF5001]">Upload a file </span>of
                        drag and drop{" "}
                      </p>
                      <p className="text-[12px] font-normal">
                        PNG, JPG, MP4 upto 32MB
                      </p>
                    </button>
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProgram;
