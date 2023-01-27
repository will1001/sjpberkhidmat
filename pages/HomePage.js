import React, { useState } from "react";
import { ButtonLogin, DropDownIcon, FacebookIcon, InstagramIcon, LinkedInIcon, SearchIcon, TikTokIcon, TwitterIcon, YouTubeIcon } from "../src/utility/icon/icon";
import Logo from "../src/utility/Logo";
import Slideshow from "../src/component/homepage/SlideShow";
import CountDown from "../src/component/homepage/CountDown";
import KabarTerbaru from "../src/component/homepage/KabarTerbaru";
import DaftarSimpatisanButton from "../src/component/homepage/DaftarSimpatisanButton";
import bgImage from "../src/utility/img/sliderBg.png";
import Publikasi from "../src/component/homepage/Publikasi";
import bgImage2 from "../src/utility/img/gantiBg.png";
import KabarSjpBerkhidmat from "../src/component/homepage/KabarSjpBerkhidmat";
import KategoriKabar from "../src/component/homepage/KategoriKabar";
import imageKosong from "../src/utility/img/gambarKosong.png";
import DropDownPublikasi from "../src/component/homepage/DropDownPublikasi";
import Router, { withRouter } from "next/router";
import cariProgramIcon from "../src/utility/icon/searchIcon.png";
import prevIcon from "../src/utility/icon/previous.png";
import nextIcon from "../src/utility/icon/next.png";

import detailProgramImg from "../src/utility/img/detailProgram.png";
import { useDispatch } from "react-redux";
import useFetch from "../src/API/useFetch";

const HomePage = ({ router }) => {
  const [dropDownPublikasi, setDropDownPublikasi] = useState(false);
  const handlePublikasi = () => setDropDownPublikasi(!dropDownPublikasi);
  const kabupaten = useFetch("get", "user/kabupaten");

  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const getArtikel = useFetch("get", "user/articles?page=1&limit=8&type=program");

  const getSlider = useFetch("get", "user/slider?type=slider");
  const getBackground = useFetch("get", "user/slider?type=background");

  console.log(getBackground.data);

  return (
    <>
      <div onClick={handlePublikasi} className={`${dropDownPublikasi === false ? "hidden" : "visible"} absolute w-[1350px] h-[4750px] mt-[650px] z-10 bg-opacity-50 bg-slate-600 `}></div>
      <div className="w-[1350px] ">
        <div className="flex bg-white w-full h-[72px] px-20 justify-between z-20">
          <Logo />
          <div className="flex items-center gap-4 text-[16px] font-medium text-[#374151]">
            <p className="cursor-pointer">Beranda</p>
            <p className="cursor-pointer">Pemilu 2024</p>
            <p onClick={handlePublikasi} className={`flex cursor-pointer ${dropDownPublikasi === false ? "stroke-[#374151]" : "stroke-[#FF5001] "} `}>
              <span className={dropDownPublikasi === false ? "" : "text-[#FF5001] "}>Publikasi</span> <DropDownIcon />
            </p>
            <p
              onClick={() => {
                router.push({
                  pathname: "Daftar",
                  query: { type: "simpatisan" },
                });
              }}
              className="flex cursor-pointer stroke-[#374151] "
            >
              Pendaftaran Anggota <DropDownIcon />
            </p>
            <div onClick={() => router.push("Aspirasi")} className="bg-[#FF5001] text-white h-[31px] px-4 cursor-pointer flex items-center rounded-md">
              Rumah Aspirasi
            </div>
            <button
              onClick={() => {
                router.push({ pathname: "Login" });
              }}
            >
              <ButtonLogin />
            </button>
          </div>
        </div>
        <div className={`${dropDownPublikasi === false ? "hidden" : "visible"} z-20`}>
          <DropDownPublikasi />
        </div>
        {getBackground?.data === null ? (
          <p>Loading....</p>
        ) : (
          <div style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + getBackground?.data[0]?.image})` }} className="h-[350px] bg-no-repeat bg-cover">
            <Slideshow data={getSlider?.data} />
          </div>
        )}

        <div className="flex flex-col bg-[#ffece4] pb-[118px]">
          <div className="flex items-center justify-center gap-6 px-12 rounded-xl mx-auto mt-[55px] h-[137px] bg-[#FF5001]">
            <img className="object-cover  h-[92px]  rounded-2xl" src="https://i.ibb.co/tpcPypN/Frame-2512.jpg" alt="gunakan-hak-pilih" />
            <p>
              <span className="font-bold text-white text-[26px]">Ayo Gunakan Hak Pilih Anda</span>
              <br />
              <span className="text-white text-[18px]">17 Agustus 2023 Pemilihan Umum DPR RI</span>
            </p>
            <CountDown />
          </div>
          <div className="flex px-[160px] gap-24 mt-[55px]">
            <Publikasi />
            <div className="flex flex-col gap-2 font-bold text-slate-700 text-[26px] pt-[40px] object-contain">
              <p className="mb-2">Kabar Terbaru</p>
              <KabarTerbaru />
              <KabarTerbaru />
              <KabarTerbaru />
              <KabarTerbaru />
            </div>
          </div>
        </div>
        <div className="flex pl-[690px] pb-[81px] gap-8 items-end h-[408px]  bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bgImage2.src})` }}>
          <div
            onClick={() => {
              router.push({
                pathname: "Daftar",
                query: { type: "simpatisan" },
              });
            }}
            className="cursor-pointer"
          >
            <DaftarSimpatisanButton />
          </div>
          {/* <div
            onClick={() => {
              router.push({
                pathname: "Daftar",
                query: { type: "relawan" },
              });
            }}
            className="cursor-pointer"
          >
            <DaftarRelawanButton />
          </div> */}
        </div>
        <div className="flex pt-[103px] pl-[70px] pr-[70px]">
          <div>
            <p className="text-[26px] text-slate-700 font-bold pb-[40px]">Kabar SJP Berkhidmat</p>
            <KabarSjpBerkhidmat />
            <KabarSjpBerkhidmat />
            <KabarSjpBerkhidmat />
            <KabarSjpBerkhidmat />
            <KabarSjpBerkhidmat />
            <KabarSjpBerkhidmat />
          </div>
          <div className="pl-[150px]">
            <p className="text-[26px] text-slate-700 font-bold pb-[40px]">Kategori Kabar</p>
            <KategoriKabar />
            <img className="mt-[47px] w-[350px] h-[300px] rounded-xl" src={imageKosong.src} alt="gambar  " />
          </div>
        </div>
        {/* program / artikel */}

        <div className="bg-[#4B5563] h-[1684px] pt-[67px] px-[120px] flex flex-col items-center">
          <div className="flex items-center  justify-center mb-[60px]">
            <p className="text-[39px] font-bold text-white">Program SJP Berkhidmat</p>
          </div>
          <div className="flex justify-between w-full mb-[21px]">
            <input
              onChange={(e) => setSearch(e.target.value)}
              style={{ backgroundImage: `url(${cariProgramIcon.src})` }}
              className="w-[317px] bg-no-repeat bg-right h-[40px] rounded-md outline-0 pl-2 pr-8 text-[14px] text-slate-800 font-semibold"
              type={"text"}
              value={search}
              id="search"
              placeholder="cari program..."
            />
            <div className="flex items-center">
              <p className="text-white text-[14px]">Daerah Tujuan</p>
              <select className="w-[214px] h-[40px] rounded-md outline-0 pl-2 pr-8 text-[14px] text-slate-800 font-semibold" id="kota">
                <option>Kabupaten / Kota</option>
                {kabupaten?.data?.map((res) => (
                  <option key={res?._id}>{res?.name}</option>
                ))}
              </select>
            </div>
          </div>
          {getArtikel?.data?.map((res) => {
            if (res.publication === true) {
              return (
                <div key={res._id} className="flex w-full h-[144px] border border-[#6B7280] mb-[21px] py-[12px] rounded-md">
                  <div style={{ overflow: "hidden" }} className="py-[10px] pl-[32px] w-full pr-[30px] flex-col gap-1 flex ">
                    <p className="text-[#FF5001] text-[18px] font-semibold">{res?.category}</p>
                    <p className="text-white text-[21px] font-bold">{res?.title}</p>
                    <p className="text-white text-[16px] h-[32px] flex">{res?.description}</p>
                  </div>
                  <div
                    onClick={() => {
                      router.push({
                        pathname: "artikel/DetailProgram",
                        query: {
                          title: res.title,
                          description: res.description,
                          image: res.image,
                          kabupaten: res.kabupaten.name,
                        },
                      });
                    }}
                    className="border-l-[1px] border-[#6B7280] cursor-pointer flex items-center"
                  >
                    <img className="" src={detailProgramImg.src} alt="lihatDetail.png" />
                  </div>
                </div>
              );
            }
          })}
          <div className="flex justify-between w-full items-center mt-[21px]">
            <div className="flex items-center gap-4">
              <div className="w-[62px] h-[36px] rounded-md border border-white flex flex-row items-center justify-center text-white">
                <select className="bg-[#4B5563] outline-0">
                  <option>10</option>
                </select>
              </div>
              <p className="text-white">Showing 1 - 10 of 85</p>
            </div>
            <div className="flex gap-1">
              <img src={prevIcon.src} alt="prev.png" />
              <div className="flex w-[40px] h-[34px] justify-center bg-orange-600 rounded-sm text-white items-center">1</div>
              <div className="flex w-[40px] h-[34px] justify-center  rounded-sm text-white items-center">2</div>
              <div className="flex w-[40px] h-[34px] justify-center  rounded-sm text-white items-center">3</div>
              <div className="flex w-[40px] h-[34px] justify-center  rounded-sm text-white items-center">...</div>
              <div className="flex w-[40px] h-[34px] justify-center  rounded-sm text-white items-center">4</div>
              <img src={nextIcon.src} alt="next.png" />
            </div>
          </div>
        </div>
        <div className="flex h-[248px] bg-[#FF5001] pt-[65px]">
          <p className="text-white text-[26px] font-bold pl-[180px] w-full">
            Kami membuka pintu komunikasi yang <br /> kondusif dan terbuka untuk menerima <br /> pesan dan aspirasi dari masyarakat.
          </p>
          <div className="pr-[144px] w-full ml-[39px]">
            <p className="text-[18px]  text-white">Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita wujudkan perubahan yang diinginkan!</p>
            <button onClick={() => Router.push("Aspirasi")} className="w-[230px] h-[48px] bg-white text-slate-700 text-[18px] font-bold mt-6">
              Sampaikan Aspirasi
            </button>
          </div>
        </div>
        <div style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.02)" }} className="flex h-[240px] justify-between pr-[120px]">
          <div className="flex flex-col justify-center pl-[70px]">
            <div className="flex justify-center w-[560px]">
              <Logo />
              <div className="pl-[32px] w-[580px]">
                <p className="text-[16px] text-[#4B5563] font-semibold">H. SURYADI JAYA PURNAMA, S.T.</p>

                <p className="text-[12px] text-[#FF5001]">DPR RI Dapil II Provinsi Nusa Tenggara Barat</p>
                <p className="text-[12px] text-[#4B5563]">
                  Bekerja bersama untuk membangun masa depan yang <br /> lebih baik bagi masyarakat dan generasi yang akan datang.
                </p>
              </div>
            </div>
            <div className="border  border-[#6B7280] mt-[52px]" />
            <span className="text-[12px] text-[#4B5563]">Copyright © 2022. Website Resmi SJP Berkhidmat dikelola oleh Tim Internal</span>
          </div>

          <div className="flex flex-col gap-1 text-[#4B5563] justify-center">
            <p className="">Pemilu 2024</p>
            <p className="">Publikasi</p>
            <p className="">Gallery</p>
            <p className="">Rumah Aspirasi</p>
            <p className="">Daftar Relawan</p>
            <p className="">Daftar Simpatisan</p>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <p className="flex justify-center font-semibold text-[16px] text-[#4B5563]">Social Media</p>
            <div className="flex items-center gap-3">
              <button>
                <LinkedInIcon />
              </button>
              <a className="cursor-pointer" target="_blank" href="https://www.instagram.com/suryadi.sjp/?igshid=OGQ2MjdiOTE=">
                <InstagramIcon />
              </a>
              <a className="cursor-pointer" href="https://www.facebook.com/sjp.officialpage?mibextid=ZbWKwL" target="_blank">
                <FacebookIcon />
              </a>
              <a className="cursor-pointer" href="https://youtube.com/@suryadijayapurnama_sjp4774" target="_blank">
                <YouTubeIcon />
              </a>
              <a className="cursor-pointer" href="https://twitter.com/suryadi_sjpntb" target="_blank">
                <TwitterIcon />
              </a>
              <button>
                <TikTokIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HomePage);
