import React from "react";
import Logo from "../src/utility/Logo";
import { useRouter } from "next/router";
import { useRef } from "react";
import { ButtonLogin, DownloadIcon, FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon, WebIcon, YouTubeIcon } from "../src/utility/icon/icon";
import FooterLink from "../src/component/FooterLink";
import downloadImgae from "../src/utility/img/download_mobile.png";

const Download = () => {
  const router = useRouter();
  const refAspirasi = useRef();
  return (
    <>
      {" "}
      <div className="fixed top-0 w-screen border-b-2 z-50 shadow-md">
        <div className="flex bg-white w-full h-[72px] px-20 justify-between z-20">
          <div>
            <Logo />
          </div>
          <div className="flex items-center gap-4 text-[16px] font-medium text-[#374151]">
            <p
              onClick={() => {
                router.push("/");
              }}
              className={`cursor-pointer `}
            >
              Beranda
            </p>
            <p onClick={() => router.push("Profil")} className="cursor-pointer">
              Profil
            </p>
            <p
              onClick={() => {
                router.push({
                  pathname: "/",
                  query: { page: "program" },
                });
              }}
              className="cursor-pointer "
            >
              <span>Program</span>
            </p>
            <p
              onClick={() => {
                router.push({
                  pathname: "/",
                  query: { page: "publikasi" },
                });
              }}
              className={`flex cursor-pointer  `}
            >
              <span>Publikasi</span>
            </p>
            <p
              onClick={() => {
                router.push({
                  pathname: "/",
                  query: { page: "pendaftaran" },
                });
              }}
              className="flex cursor-pointer stroke-[#374151] "
            >
              Pendaftaran Anggota
            </p>
            <p className="flex cursor-pointer text-[#FF5001] stroke-[#374151] ">Download</p>
            <div onClick={() => goto(refAspirasi.current)} className="bg-[#FF5001] text-white h-[31px] px-4 cursor-pointer flex items-center rounded-md">
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
      </div>
      <div className="pt-[130px] flex">
        <div className="flex gap-12">
          <div>
            <img src={downloadImgae.src} />
          </div>
          <div className="w-[600px]">
            <p className="text-[32px] mb-2 text-[#374151] font-bold">Hai Relawan & Tim Kemenangan!</p>
            <p className="text-[21px] mb-2 text-[#374151] font-medium">Terus pantau berita terkini dengan aplikasi official dari SJP Berkhidmat!</p>
            <p className="text-[16px] text-[#374151]">Atur semua kebutuhan kampanye dari tangan anda lebih mudah dan support Suryadi Jaya Purnama untuk mewakili anda menjadi DPR RI Dapil II Provinsi Nusa Tenggara Barat.</p>
            <div className="flex gap-3 stroke-white bg-[#FF5001] w-[212px] items-center mt-3 py-1 rounded-sm cursor-pointer text-white font-medium justify-center">
              <DownloadIcon /> Download Aplikasi
            </div>
          </div>
        </div>
      </div>
      <div ref={refAspirasi} />
      <div className="flex h-[248px] bg-[#FF5001] pt-[32px] w-screen">
        <p className="text-white text-[26px] font-bold pl-[180px] w-full">Kami membuka pintu komunikasi yang kondusif dan terbuka untuk menerima pesan dan aspirasi dari masyarakat.</p>
        <div className="pr-[144px] w-full ml-[39px]">
          <p className="text-[18px]  text-white">Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita wujudkan perubahan yang diinginkan!</p>
          <button onClick={() => router.push("Aspirasi")} className="w-[230px] h-[48px] bg-white text-slate-700 text-[18px] font-bold mt-6">
            Sampaikan Aspirasi
          </button>
        </div>
      </div>
      <div style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.02)" }} className="flex w-screen h-[240px] justify-between pr-[120px]">
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
          <FooterLink />
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
            <a href="http://suryadijayapurnama-sjp.id" target="_blank">
              <WebIcon />
            </a>
            {/* <button>
          <TikTokIcon />
        </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Download;
