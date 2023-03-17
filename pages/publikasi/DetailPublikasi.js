import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import useFetch from "../../src/API/useFetch";
import { ButtonLogin, FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon, TwitterIcon, YouTubeIcon } from "../../src/utility/icon/icon";
import Logo from "../../src/utility/Logo";
import listIcon from "../../src/utility/icon/centerIcon.png";
import playIcon from "../../src/utility/icon/playIcon.png";

const DetailPublikasi = () => {
  const router = useRouter();
  const refProgram = useRef();
  const refPublikasi = useRef();
  const refPendaftaran = useRef();
  const refAspirasi = useRef();
  const [dropDownPublikasi, setDropDownPublikasi] = useState(false);
  const getArtikel = useFetch("get", "user/articles?page=1&type=artikel");

  const goto = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
  //   const date = new Date(router?.query?.creat.split("T").shift().split("-"));
  //   const a = monthNames[date.getMonth()];
  //   console.log(getArtikel, "asdasd");
  const [popupMobile, setPopupMobile] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {screenSize.width >= 350 && screenSize.width <= 450 ? (
        <div>
          <div className={`${popupMobile === false ? "hidden" : "visible"} fixed z-50 bg-white top-0 mt-[60px] px-[16px] py-1 w-screen h-screen`}>
            <div className="flex gap-3 mb-[32px] mt-2">
              <div onClick={() => router.push("../Aspirasi")} className="bg-[#E44700] text-center w-full text-white text-[14px] font-semibold py-1 px-2 rounded-sm">
                Sampaikan Aspirasi
              </div>
              <div
                onClick={() => {
                  router.push({ pathname: "../Login" });
                }}
                className="text-[#E44700] text-center border w-full border-[#E44700] text-[14px] font-semibold py-1 px-2 rounded-sm"
              >
                Login
              </div>
            </div>
            <p onClick={() => router.push("/")} className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2">
              Beranda
            </p>
            <p onClick={() => router.push("../Profil")} className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2">
              Profil
            </p>
            <p className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2">Program</p>
            <p className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2">Publikasi</p>
            <p
              onClick={() =>
                router.push({
                  pathname: "../Daftar",
                  query: { type: "simpatisan" },
                })
              }
              className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2"
            >
              Pendaftaran Anggota
            </p>
          </div>
          <div className="p-[16px] sticky top-0 z-50 border-b-[1px] bg-white flex items-center justify-between">
            <Logo mobile={screenSize} />
            <img onClick={() => setPopupMobile(!popupMobile)} className="w-[24px] h-[24px]" src={listIcon.src} alt={"drop down"} />
          </div>
          <div className="text-center text-[18px] text-white py-3 font-bold bg-[#FF5001]">Publikasi Video</div>
          <div className="px-[16px]">
            {router.query.image !== undefined && <iframe className="rounded-md mt-[23px]" width="100%" height="218" src={"https://www.youtube.com/embed/" + router?.query?.image?.split("=").pop()}></iframe>}
            <div className="flex gap-6 mt-2">
              <p className="text-[12px] text-[#FF5001] font-medium">{router.query.category}</p>
              <p className="text-[12px] text-[#374151] font-medium">
                {router?.query?.creat?.split("/")[0]} {monthNames[new Date(router?.query?.creat?.split("/")[1]).getMonth()]} {router?.query?.creat?.split("/")[2]}
              </p>
            </div>
            <p className="text-[14px] text-[#374151] font-semibold">{router.query.title}</p>
            <div className="border-[1px] my-6" />
            {/* video lainnya */}
            <div className="pb-[92px]">
              {getArtikel?.data
                ?.filter((data) => data.publication === true)
                .filter((data) => data.description === "video")
                .map((res, index) => (
                  <>
                    {console.log(res)}
                    {index <= 3 && (
                      <div className="flex gap-3  items-center mb-2" key={res._id}>
                        <div className="">
                          <div
                            onClick={() =>
                              router
                                .push({
                                  pathname: "./DetailPublikasi",
                                  query: {
                                    title: res.title,
                                    image: res.video,
                                    creat: res.createdAt,
                                    category: res.category,
                                    creat: res?.createdAt?.split("T").shift().split("-").reverse().join("/"),
                                  },
                                })
                                .then(() => window.location.reload(false))
                            }
                            className="absolute cursor-pointer w-[175px] h-[116.67px]"
                          ></div>
                          <div className="">{res?.length !== 0 && <iframe className="rounded-sm" width="175" height="116.67" src={"https://www.youtube.com/embed/" + res?.video?.split("=").pop()}></iframe>}</div>
                        </div>
                        <div className="w-[200px] pt-[4px] pb-[20px]">
                          <p className="text-[12px] font-medium text-[#FF5001]">{res?.category}</p>
                          <p className="text-[12px] font-semibold text-[#374151] break-words h-[52px] overflow-y-clip">{res?.title}</p>
                          <p className="text-[#374151] text-[12px]">{`${res?.createdAt.split("T").shift().split("-")[2]} ${monthNames[new Date(res?.createdAt.split("T").shift().split("-")[1]).getMonth()]} ${
                            res?.createdAt.split("T").shift().split("-")[0]
                          }`}</p>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>
          <div className="bg-[#FF5001] pt-[37px] pb-[29px] px-[16px]">
            <p className="text-[16px] font-bold text-white">Kami membuka pintu komunikasi yang kondusif dan terbuka untuk menerima pesan dan aspirasi dari masyarakat.</p>
            <p className="mt-2 text-[12px] text-white">Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita wujudkan perubahan yang diinginkan!</p>
            <div className="mt-4 flex text-[#374151]">
              <div onClick={() => router.push("../Aspirasi")} className="bg-white text-[14px] font-semibold py-1 px-2 rounded-sm">
                Sampaikan Aspirasi
              </div>
            </div>
          </div>
          <div className="px-[16px] pt-[35px] bg-[#F3F4F6]">
            <Logo />
            <p className="text-[14px] text-[#4B5563] font-semibold">H. SURYADI JAYA PURNAMA, S.T.</p>
            <p className="text-[10px] text-[#FF5001] font-semibold">DPR RI Dapil II Provinsi Nusa Tenggara Barat</p>
            <p className="text-[10px] text-[#4B5563]">Bekerja bersama untuk membangun masa depan yang lebih baik bagi masyarakat dan generasi yang akan datang.</p>
            <div className="flex py-[40px]">
              <div className="text-[14px] text-[#4B5563]">
                Pemilu 2024 <br />
                Publikasi <br />
                Gallery <br />
                Rumah Aspirasi <br />
                Daftar Relawan <br />
                Daftar Simpatisan
              </div>
              <div className="ml-[52px]">
                <p className="text-[16px] text-[#4B5563] font-bold">Social Media</p>
                <div className="grid grid-cols-3 grid-rows-3 mt-3 ">
                  <LinkedInIcon />
                  <a href="https://www.facebook.com/sjp.officialpage?mibextid=ZbWKwL" target="_blank">
                    <FacebookIcon />
                  </a>
                  <a target="_blank" href="https://www.instagram.com/suryadi.sjp/?igshid=OGQ2MjdiOTE=">
                    <InstagramIcon />
                  </a>
                  <a href="https://youtube.com/@suryadijayapurnama_sjp4774" target="_blank">
                    <YouTubeIcon />
                  </a>
                  <a href="https://twitter.com/suryadi_sjpntb" target="_blank">
                    <TwitterIcon />
                  </a>
                  <TikTokIcon />
                </div>
              </div>
            </div>
            <div className="border-b-[1px]" />
            <p className="mt-2 text-[12px] pb-3 px-2 text-[#9CA3AF] text-center">Copyright © 2022. Website Resmi SJP Berkhidmat dikelola oleh Tim Internal</p>
          </div>
        </div>
      ) : (
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
                    // setSelectProgram(false);
                  }}
                  className={`cursor-pointer `}
                >
                  Beranda
                </p>
                <p onClick={() => router.push("../Profil")} className="cursor-pointer">
                  Profil
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: "/",
                      query: { page: "program" },
                    })
                  }
                  className="cursor-pointer"
                >
                  <span>Program</span>
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: "/",
                      query: { page: "publikasi" },
                    })
                  }
                  className={`flex cursor-pointer text-[#FF5001] ${dropDownPublikasi === false ? "stroke-[#374151]" : "stroke-[#FF5001] "} `}
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
                <div onClick={() => router.push("Aspirasi")} className="bg-[#FF5001] text-white h-[31px] px-4 cursor-pointer flex items-center rounded-md">
                  Rumah Aspirasi
                </div>
                <button
                  onClick={() => {
                    router.push({ pathname: "../Login" });
                  }}
                >
                  <ButtonLogin />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#FF5001] mt-[70px] flex justify-center py-6 text-[32px] text-white font-bold">Publikasi Video</div>
          <div className="flex pb-[150px] mt-[63px]">
            <div className="w-[800px] h-[500px]  bg-black rounded-md mx-[70px] ">
              {router.query.image !== undefined && <iframe className="rounded-sm" width="800" height="500" src={"https://www.youtube.com/embed/" + router?.query?.image?.split("=").pop()}></iframe>}

              <div className="flex items-center  gap-8 mt-4">
                <p className="text-[#FF5001] h-[35px] flex items-center text-[18px] font-medium">{router.query.category}</p>
                <p className="text-[#374151] h-[35px] flex items-center text-[16px] font-medium">
                  {router?.query?.creat?.split("/")[0]} {monthNames[new Date(router?.query?.creat?.split("/")[1]).getMonth()]} {router?.query?.creat?.split("/")[2]}
                </p>
              </div>
              <p className="text-[#374151] text-[26px] font-semibold">{router.query.title}</p>
            </div>
            <div>
              <p className="text-[#374151] text-[21px] font-bold mb-4">Video Lainnya</p>
              {getArtikel?.data
                ?.filter((data) => data.publication === true)
                .filter((data) => data.description === "video")
                .map((res, index) => (
                  <>
                    {console.log(res)}
                    {index <= 3 && (
                      <div className="flex gap-3  items-center mb-2" key={res._id}>
                        <div className="">
                          <div
                            onClick={() =>
                              router
                                .push({
                                  pathname: "./DetailPublikasi",
                                  query: {
                                    title: res.title,
                                    image: res.video,
                                    creat: res.createdAt,
                                    category: res.category,
                                    creat: res?.createdAt?.split("T").shift().split("-").reverse().join("/"),
                                  },
                                })
                                .then(() => window.location.reload(false))
                            }
                            className="absolute cursor-pointer w-[175px] h-[116.67px]"
                          ></div>
                          <div className="">{res?.length !== 0 && <iframe className="rounded-sm" width="175" height="116.67" src={"https://www.youtube.com/embed/" + res?.video?.split("=").pop()}></iframe>}</div>
                        </div>
                        <div className="w-[200px] pt-[4px] pb-[20px]">
                          <p className="text-[12px] font-medium text-[#FF5001]">{res?.category}</p>
                          <p className="text-[12px] font-semibold text-[#374151] break-words h-[52px] overflow-y-clip">{res?.title}</p>
                          <p className="text-[#374151] text-[12px]">{`${res?.createdAt.split("T").shift().split("-")[2]} ${monthNames[new Date(res?.createdAt.split("T").shift().split("-")[1]).getMonth()]} ${
                            res?.createdAt.split("T").shift().split("-")[0]
                          }`}</p>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>
          <div className="flex h-[248px] bg-[#FF5001] py-[65px] mt-[50px] w-screen px-[50px]">
            <p className="text-white text-[26px] flex font-bold basis-1/2">
              Kami membuka pintu komunikasi yang <br /> kondusif dan terbuka untuk menerima <br /> pesan dan aspirasi dari masyarakat.
            </p>
            <div className="basis-1/2">
              <p className="text-[18px]  text-white">Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita wujudkan perubahan yang diinginkan!</p>
              <button onClick={() => router.push("../Aspirasi")} className="w-[230px] h-[48px] bg-white text-slate-700 text-[18px] font-bold mt-6">
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
        </>
      )}
    </>
  );
};

export default DetailPublikasi;
