import React from "react";
import Logo from "../src/utility/Logo";
import { useRouter } from "next/router";
import { useRef } from "react";
import {
  ButtonLogin,
  DownloadIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  WebIcon,
  YouTubeIcon,
} from "../src/utility/icon/icon";
import FooterLink from "../src/component/FooterLink";
import downloadImgae from "../src/utility/img/download_mobile.png";
import { useState, useEffect } from "react";
import listIcon from "../src/utility/icon/centerIcon.png";

const Download = () => {
  const router = useRouter();
  const refAspirasi = useRef();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [popupMobile, setPopupMobile] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });
  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

  const handleInstallClick = (event) => {
    event.preventDefault();
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      alert("App sudah terinstal di perangkat anda");
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    } else {
      alert("App sudah terinstal di perangkat anda");
    }
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {screenSize.width >= 350 && screenSize.width <= 450 ? (
        <div className="w-screen">
          <div className="">
            <div className="p-[16px] sticky top-0 z-50 border-b-[1px] bg-white flex items-center justify-between">
              <Logo mobile={screenSize} />
              <img
                onClick={() => setPopupMobile(!popupMobile)}
                className="w-[24px] h-[24px]"
                src={listIcon.src}
                alt={"drop down"}
              />
            </div>
            <div className="pt-[130px] flex justify-center">
              <div className="flex flex-col gap-12 justify-center items-center mb-9">
                <div>
                  <img className="w-[300px]" src={downloadImgae.src} />
                </div>
                <div className="w-[300px]">
                  <p className="text-[32px] mb-2 text-[#374151] font-bold">
                    Hai Relawan & Tim Kemenangan!
                  </p>
                  <p className="text-[21px] mb-2 text-[#374151] font-medium">
                    Terus pantau berita terkini dengan aplikasi official dari
                    SJP Berkhidmat!
                  </p>
                  <p className="text-[16px] text-[#374151]">
                    Atur semua kebutuhan kampanye dari tangan anda lebih mudah
                    dan support Suryadi Jaya Purnama untuk mewakili anda menjadi
                    DPR RI Dapil II Provinsi Nusa Tenggara Barat.
                  </p>
                  <div
                    onClick={handleInstallClick}
                    className="flex gap-3 stroke-white bg-[#FF5001] w-[212px] items-center mt-3 py-1 rounded-sm cursor-pointer text-white font-medium justify-center"
                  >
                    <DownloadIcon /> Download Aplikasi
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Aspirasi */}
          <div className="bg-[#FF5001] pt-[37px] pb-[29px] px-[16px]">
            <p className="text-[16px] font-bold text-white">
              Kami membuka pintu komunikasi yang kondusif dan terbuka untuk
              menerima pesan dan aspirasi dari masyarakat.
            </p>
            <p className="mt-2 text-[12px] text-white">
              Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita
              wujudkan perubahan yang diinginkan!
            </p>
            <div className="mt-4 flex text-[#374151]">
              <div
                onClick={() => Router.push("Aspirasi")}
                className="bg-white text-[14px] font-semibold py-1 px-2 rounded-sm"
              >
                Sampaikan Aspirasi
              </div>
            </div>
          </div>
          {/* end Aspirasi */}
          <div className="px-[16px] bg-[#F3F4F6] pt-[35px]">
            <Logo />
            <p className="text-[14px] text-[#4B5563] font-semibold">
              H. SURYADI JAYA PURNAMA, S.T.
            </p>
            <p className="text-[10px] text-[#FF5001] font-semibold">
              DPR RI Dapil II Provinsi Nusa Tenggara Barat
            </p>
            <p className="text-[10px] text-[#4B5563]">
              Bekerja bersama untuk membangun masa depan yang lebih baik bagi
              masyarakat dan generasi yang akan datang.
            </p>
            <div className="flex py-[40px]">
              <div className="text-[14px] text-[#4B5563] flex flex-col">
                <FooterLink />
              </div>
              <div className="ml-[52px]">
                <p className="text-[16px] text-[#4B5563] font-bold">
                  Social Media
                </p>
                <div className="grid grid-cols-3 grid-rows-3 mt-3 ">
                  <LinkedInIcon />
                  <a
                    href="https://www.facebook.com/sjp.officialpage?mibextid=ZbWKwL"
                    target="_blank"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/suryadi.sjp/?igshid=OGQ2MjdiOTE="
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://youtube.com/@suryadijayapurnama_sjp4774"
                    target="_blank"
                  >
                    <YouTubeIcon />
                  </a>
                  <a href="https://twitter.com/suryadi_sjpntb" target="_blank">
                    <TwitterIcon />
                  </a>
                  {/* <TikTokIcon /> */}
                  <a href="http://suryadijayapurnama-sjp.id" target="_blank">
                    <WebIcon />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-b-[1px]" />
            <p className="mt-2 text-[12px] pb-3 px-2 text-[#9CA3AF] text-center">
              Copyright © 2022. Website Resmi SJP Berkhidmat dikelola oleh Tim
              Internal
            </p>
          </div>
          <div
            className={`${
              popupMobile === false ? "hidden" : "visible"
            } fixed z-50 bg-white top-0 mt-[60px] px-[16px] py-1 w-screen h-screen`}
          >
            <div className="flex gap-3 mb-[32px] mt-2">
              <div
                onClick={() => Router.push("Aspirasi")}
                className="bg-[#E44700] text-center w-full text-white text-[14px] font-semibold py-1 px-2 rounded-sm"
              >
                Sampaikan Aspirasi
              </div>
              <div
                onClick={() => {
                  router.push({ pathname: "Login" });
                }}
                className="text-[#E44700] text-center border w-full border-[#E44700] text-[14px] font-semibold py-1 px-2 rounded-sm"
              >
                Login
              </div>
            </div>
            <p
              onClick={() => setPopupMobile(false)}
              className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2"
            >
              Beranda
            </p>
            <p
              onClick={() => router.push("Profil")}
              className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2"
            >
              Profil
            </p>
            <p className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2">
              Program
            </p>
            <p
              onClick={() => router.push("publikasi/SemuaPublikasi")}
              className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2"
            >
              Publikasi
            </p>
            <p
              onClick={() =>
                router.push({
                  pathname: "Daftar",
                  query: { type: "simpatisan" },
                })
              }
              className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2"
            >
              Pendaftaran Anggota
            </p>
            <p
              onClick={() => router.push("Download")}
              className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2"
            >
              Download
            </p>
          </div>
        </div>
      ) : (
        <div className="w-screen">
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
                <p
                  onClick={() => router.push("Profil")}
                  className="cursor-pointer"
                >
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
                <p className="flex cursor-pointer text-[#FF5001] stroke-[#374151] ">
                  Download
                </p>
                <div
                  onClick={() => goto(refAspirasi.current)}
                  className="bg-[#FF5001] text-white h-[31px] px-4 cursor-pointer flex items-center rounded-md"
                >
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
          <div className="pt-[130px] flex justify-center">
            <div className="flex gap-12">
              <div>
                <img src={downloadImgae.src} />
              </div>
              <div className="w-[600px]">
                <p className="text-[32px] mb-2 text-[#374151] font-bold">
                  Hai Relawan & Tim Kemenangan!
                </p>
                <p className="text-[21px] mb-2 text-[#374151] font-medium">
                  Terus pantau berita terkini dengan aplikasi official dari SJP
                  Berkhidmat!
                </p>
                <p className="text-[16px] text-[#374151]">
                  Atur semua kebutuhan kampanye dari tangan anda lebih mudah dan
                  support Suryadi Jaya Purnama untuk mewakili anda menjadi DPR
                  RI Dapil II Provinsi Nusa Tenggara Barat.
                </p>
                <div
                  onClick={handleInstallClick}
                  className="flex gap-3 stroke-white bg-[#FF5001] w-[212px] items-center mt-3 py-1 rounded-sm cursor-pointer text-white font-medium justify-center"
                >
                  <DownloadIcon /> Download Aplikasi
                </div>
              </div>
            </div>
          </div>
          <div ref={refAspirasi} />
          <div className="flex h-[248px] bg-[#FF5001] pt-[32px] w-screen">
            <p className="text-white text-[26px] font-bold pl-[180px] w-full">
              Kami membuka pintu komunikasi yang kondusif dan terbuka untuk
              menerima pesan dan aspirasi dari masyarakat.
            </p>
            <div className="pr-[144px] w-full ml-[39px]">
              <p className="text-[18px]  text-white">
                Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita
                wujudkan perubahan yang diinginkan!
              </p>
              <button
                onClick={() => router.push("Aspirasi")}
                className="w-[230px] h-[48px] bg-white text-slate-700 text-[18px] font-bold mt-6"
              >
                Sampaikan Aspirasi
              </button>
            </div>
          </div>
          <div
            style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.02)" }}
            className="flex w-screen h-[240px] justify-between pr-[120px]"
          >
            <div className="flex flex-col justify-center pl-[70px]">
              <div className="flex justify-center w-[560px]">
                <Logo />
                <div className="pl-[32px] w-[580px]">
                  <p className="text-[16px] text-[#4B5563] font-semibold">
                    H. SURYADI JAYA PURNAMA, S.T.
                  </p>

                  <p className="text-[12px] text-[#FF5001]">
                    DPR RI Dapil II Provinsi Nusa Tenggara Barat
                  </p>
                  <p className="text-[12px] text-[#4B5563]">
                    Bekerja bersama untuk membangun masa depan yang <br /> lebih
                    baik bagi masyarakat dan generasi yang akan datang.
                  </p>
                </div>
              </div>
              <div className="border  border-[#6B7280] mt-[52px]" />
              <span className="text-[12px] text-[#4B5563]">
                Copyright © 2022. Website Resmi SJP Berkhidmat dikelola oleh Tim
                Internal
              </span>
            </div>

            <div className="flex flex-col gap-1 text-[#4B5563] justify-center">
              <FooterLink />
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <p className="flex justify-center font-semibold text-[16px] text-[#4B5563]">
                Social Media
              </p>
              <div className="flex items-center gap-3">
                <button>
                  <LinkedInIcon />
                </button>
                <a
                  className="cursor-pointer"
                  target="_blank"
                  href="https://www.instagram.com/suryadi.sjp/?igshid=OGQ2MjdiOTE="
                >
                  <InstagramIcon />
                </a>
                <a
                  className="cursor-pointer"
                  href="https://www.facebook.com/sjp.officialpage?mibextid=ZbWKwL"
                  target="_blank"
                >
                  <FacebookIcon />
                </a>
                <a
                  className="cursor-pointer"
                  href="https://youtube.com/@suryadijayapurnama_sjp4774"
                  target="_blank"
                >
                  <YouTubeIcon />
                </a>
                <a
                  className="cursor-pointer"
                  href="https://twitter.com/suryadi_sjpntb"
                  target="_blank"
                >
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
        </div>
      )}
    </>
  );
};

export default Download;
