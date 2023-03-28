import React, { useEffect, useRef, useState } from "react";
import { ButtonLogin, DropDownIcon, FacebookIcon, InstagramIcon, LinkedInIcon, SearchIcon, TikTokIcon, TwitterIcon, YouTubeIcon } from "../src/utility/icon/icon";
import Logo from "../src/utility/Logo";
import Slideshow from "../src/component/homepage/SlideShow";
import CountDown from "../src/component/homepage/CountDown";
import KabarTerbaru from "../src/component/homepage/KabarTerbaru";
import DaftarSimpatisanButton from "../src/component/homepage/DaftarSimpatisanButton";
import Publikasi from "../src/component/homepage/Publikasi";
import bgImage2 from "../src/utility/img/gantiBg.png";
import KabarSjpBerkhidmat from "../src/component/homepage/KabarSjpBerkhidmat";
import KategoriKabar from "../src/component/homepage/KategoriKabar";
import DropDownPublikasi from "../src/component/homepage/DropDownPublikasi";
import Router, { withRouter } from "next/router";
import prevIcon from "../src/utility/icon/previous.png";
import nextIcon from "../src/utility/icon/next.png";
import detailProgramImg from "../src/utility/img/detailProgram.png";
import useFetch from "../src/API/useFetch";
import listIcon from "../src/utility/icon/centerIcon.png";
import playIcon from "../src/utility/icon/playIcon.png";
import Pagination from "../src/component/Pagination";

const HomePage = ({ router }) => {
  const [dropDownPublikasi, setDropDownPublikasi] = useState(false);

  const [selectProgram, setSelectProgram] = useState(false);
  const banner = useFetch("get", "user/slider?type=banner");
  const getArtikel = useFetch("get", "user/articles?page=1&limit=8&type=program");
  const getSlider = useFetch("get", "user/slider?type=slider");
  const getBackground = useFetch("get", "user/slider?type=background");
  const getPublikasi = useFetch("get", "user/articles?page=1&type=artikel");
  const getPublikasiArt = useFetch("get", "user/articles?page=1&type=artikel");
  const refProgram = useRef();
  const refPublikasi = useRef();
  const refPendaftaran = useRef();
  const refAspirasi = useRef();
  const [popupMobile, setPopupMobile] = useState(false);

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const goto = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (router.query.page === "publikasi") {
      goto(refPublikasi.current);
    } else if (router.query.page === "program") {
      goto(refProgram.current);
    } else if (router.query.page === "aspirasi") {
      goto(refAspirasi.current);
    } else if (router.query.page === "pendaftaran") {
      goto(refPendaftaran.current);
    }
  });

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
    setShowInstallButton(true);
  };

  const handleInstallClick = (event) => {
    event.preventDefault();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
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

    // return () => window.removeEventListener("resize", handleResize);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(screenSize);
  return (
    <>
    
      {screenSize.width >= 350 && screenSize.width <= 450 ? (
        // mobile view
        <div className="w-screen">
          {showInstallButton && <>
            <div className="bg-black w-full h-[200vh] opacity-75 absolute z-40"></div>
            <div className="flex justify-center items-center w-full h-[100vh]  absolute z-50">
              <div className="bg-white w-80 h-[200px] flex justify-center items-center rounded-xl">
                <div className="flex flex-col items-center">
                  <Logo />
                  <button
                    className=" cursor-pointer install-button border-gray-800 px-3 mt-2 text-orange-400 border rounded-xl p-1"
                    onClick={handleInstallClick}
                  >
                    Install App
                  </button>
                  <p onClick={()=>{
                    setShowInstallButton(false);
                  }} className="text-orange-400 text-sm mt-3 cursor-pointer">Tutup</p>
                </div>
              </div>
            </div>
          </> }
          
          <div className="p-[16px] sticky top-0 z-50 border-b-[1px] bg-white flex items-center justify-between">
            <Logo mobile={screenSize} />
            <img onClick={() => setPopupMobile(!popupMobile)} className="w-[24px] h-[24px]" src={listIcon.src} alt={"drop down"} />
          </div>
          {getBackground?.data === null ? (
            <p>Loading....</p>
          ) : (
            <div
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + getBackground?.data[0]?.image})`,
              }}
              className="h-[148px] w-screen bg-no-repeat bg-cover -z-50"
            >
              <Slideshow mobile={screenSize} data={getSlider?.data} />
            </div>
          )}
          <div className="w-screen px-4">
            <div className="flex px-2 items-center justify-center gap-6 rounded-md mt-[22.91px] h-[42px] bg-[#FF5001]">
              <img className="w-[26.48px] h-[28.05px]  rounded-md" src="https://i.ibb.co/tpcPypN/Frame-2512.jpg" alt="gunakan-hak-pilih" />
              <div>
                <p className="font-bold text-white text-[7.8px]">Ayo Gunakan Hak Pilih Anda</p>
                
                <p className="text-white text-[5.4px]">17 Agustus 2023 Pemilihan Umum DPR RI</p>
              </div>
              <CountDown mobile={screenSize} />
            </div>
          </div>
          {/* publikasi video */}
          <>
          
            <p className="mt-[24px] mb-[12px] ml-[16px] font-bold text-[#374151]">Publikasi</p>
            <div className="">
              {getPublikasi?.data?.filter((data) => data.publication === true).filter((data) => data.description === "video")[0] && (
                <Publikasi mobile={screenSize} data={getPublikasi?.data?.filter((data) => data.publication === true).filter((data) => data.description === "video")[0]} />
              )}

              <div className="flex px-[16px] mt-2 flex-col gap-2 font-bold text-slate-700 object-contain">
                <p className="mb-2 flex items-center justify-between">
                  Video Lainnya
                  <span onClick={() => router.push("/publikasi/SemuaPublikasi")} className="text-[16px] text-[#FF5001] font-normal underline cursor-pointer">
                    Lihat Semua
                  </span>
                </p>
                {getPublikasi?.data
                  ?.filter((data) => data.publication === true)
                  .filter((data) => data.description === "video")
                  .map((res, index) => (
                    // console.log(res)
                    <div key={res?._id}>{index <= 3 && <KabarTerbaru mobile={screenSize} data={res} />}</div>
                  ))}
              </div>
              {/* pendaftaran anggota */}
              <div className="flex">
                <img src={bgImage2.src} />
                <div
                  onClick={() => {
                    router.push({
                      pathname: "Daftar",
                      query: { type: "simpatisan" },
                    });
                  }}
                  className="bg-[#E44700] text-white text-[10px] font-semibold px-2 py-1 rounded-sm cursor-pointer absolute right-0 mt-[75px] mr-[70px]"
                >
                  Pendaftaran Anggota
                </div>
              </div>
              {/*  */}
              {/*  */}
              {/* publikasi artikel */}
              <div className="w-screen mt-2 px-[16px]">
                <p className="text-[18px] text-slate-700 font-bold pb-[40px]">Kabar SJP Berkhidmat</p>
                {getPublikasiArt?.data
                  ?.filter((data) => ["jpg", "jpeg", "png"].includes(data?.image?.split(".").pop().toLowerCase()))
                  .map((res, index) => (
                    <div key={res?._id}>{index <= 5 && <KabarSjpBerkhidmat mobile={screenSize} data={res} />}</div>
                  ))}
              </div>
              {/* filter category artikel */}
              <div className="px-[16px]">
                <p className="text-[#374151] font-bold my-3">Kategori Kabar</p>
                <KategoriKabar mobile={screenSize} />
              </div>
              {/* end filter category artikel */}
              {/* end publikasi artikel */}
              {/* poster */}
              <div className="flex justify-center">
                {banner?.data?.map((res, i) => {
                  return <img key={i} className="mt-[32px] mb-[60px] w-[328px] h-[328px] rounded-xl" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image} alt="gambar  " />;
                })}
              </div>
              {/* endposter */}

              {/* program */}
              <div className="px-[16px] pb-3 bg-[#4B5563]">
                <p className="text-center text-[21px] text-white font-bold py-3">Program SJP Berkhidmat</p>
                {getArtikel?.data?.map((res) => {
                  // console.log(res, "ini res");
                  if (res.publication === true) {
                    return (
                      <div className="pl-[16px] py-2 border-[#6B7280] rounded-sm mb-2 border-[1px] flex" key={res._id}>
                        <div className="w-[230px]">
                          <p className="text-[10px] text-[#FF5001] font-semibold">{res.category}</p>
                          <p className="text-[10px] text-white font-semibold h-[32px] break-words overflow-hidden">{res.title}</p>
                          <div className="text-white text-[10px] h-[52px] overflow-hidden">
                            <div className="text-white w-[213px] text-[10px]" dangerouslySetInnerHTML={{ __html: res?.description }} />
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            router.push({
                              pathname: "artikel/DetailProgram",
                              query: {
                                title: res?.title,
                                description: res?.description,
                                image: res?.image,
                                video: res?.video,
                                kabupaten: res?.kabupaten?.name,
                              },
                            });
                          }}
                          className="border-l-[1px] border-[#6B7280] cursor-pointer justify-center flex items-center"
                        >
                          <img className="" src={detailProgramImg.src} alt="lihatDetail.png" />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              {/* end program */}

              {/* Aspirasi */}
              <div className="bg-[#FF5001] pt-[37px] pb-[29px] px-[16px]">
                <p className="text-[16px] font-bold text-white">Kami membuka pintu komunikasi yang kondusif dan terbuka untuk menerima pesan dan aspirasi dari masyarakat.</p>
                <p className="mt-2 text-[12px] text-white">Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita wujudkan perubahan yang diinginkan!</p>
                <div className="mt-4 flex text-[#374151]">
                  <div onClick={() => Router.push("Aspirasi")} className="bg-white text-[14px] font-semibold py-1 px-2 rounded-sm">
                    Sampaikan Aspirasi
                  </div>
                </div>
              </div>
              {/* end Aspirasi */}
              {/* footer */}
              <div className="px-[16px] bg-[#F3F4F6] pt-[35px]">
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
              {/* end footer */}
              {/* popup di mobile */}
              <div className={`${popupMobile === false ? "hidden" : "visible"} fixed z-50 bg-white top-0 mt-[60px] px-[16px] py-1 w-screen h-screen`}>
                <div className="flex gap-3 mb-[32px] mt-2">
                  <div onClick={() => Router.push("Aspirasi")} className="bg-[#E44700] text-center w-full text-white text-[14px] font-semibold py-1 px-2 rounded-sm">
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
                <p onClick={() => setPopupMobile(false)} className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2">
                  Beranda
                </p>
                <p onClick={() => router.push("Profil")} className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2">
                  Profil
                </p>
                <p className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2">Program</p>
                <p onClick={() => router.push("publikasi/SemuaPublikasi")} className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2">
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
              </div>
              {/* end popup di mobile */}
            </div>
          </>
        </div>
      ) : (
        //
        //
        //
        //
        // dekstop
        <div className="w-screen ">
          <div className="fixed top-0 w-screen border-b-2 z-50 shadow-md">
            <div className="flex bg-white w-full h-[72px] px-20 justify-between z-20">
              <div>
                <Logo />
              </div>

              <div className="flex items-center gap-4 text-[16px] font-medium text-[#374151]">
                <p
                  onClick={() => {
                    router.push("/");
                    setSelectProgram(false);
                  }}
                  className={`cursor-pointer text-[#FF5001]`}
                >
                  Beranda
                </p>
                <p onClick={() => router.push("Profil")} className="cursor-pointer">
                  Profil
                </p>
                <p
                  onClick={() => {
                    goto(refProgram.current);
                  }}
                  className="cursor-pointer"
                >
                  <span>Program</span>
                </p>
                <p onClick={() => goto(refPublikasi.current)} className={`flex cursor-pointer ${dropDownPublikasi === false ? "stroke-[#374151]" : "stroke-[#FF5001] "} `}>
                  <span>Publikasi</span>
                </p>
                <p onClick={() => goto(refPendaftaran.current)} className="flex cursor-pointer stroke-[#374151] ">
                  Pendaftaran Anggota
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
          </div>

          <div className={`${dropDownPublikasi === false ? "hidden" : "visible"} mt-12 flex`}>
            <DropDownPublikasi />
          </div>

          {getBackground?.data === null ? (
            <p>Loading....</p>
          ) : (
            <div
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL_IMAGE + getBackground?.data[0]?.image})`,
              }}
              className="h-[350px] w-screen bg-no-repeat bg-cover mt-16 -z-50"
            >
              <Slideshow data={getSlider?.data} />
            </div>
          )}

          <div className="flex flex-col bg-[#ffece4] pb-[118px] w-screen">
            <div className="flex items-center justify-center gap-6 px-12 rounded-xl mx-auto mt-[55px] h-[137px] bg-[#FF5001]">
              <img className="object-cover  h-[92px]  rounded-2xl" src="https://i.ibb.co/tpcPypN/Frame-2512.jpg" alt="gunakan-hak-pilih" />
              <p>
                <span className="font-bold text-white text-[26px]">Ayo Gunakan Hak Pilih Anda</span>
                <br />
                <span className="text-white text-[18px]">17 Agustus 2023 Pemilihan Umum DPR RI</span>
              </p>
              <CountDown />
              <div className="" ref={refPublikasi}></div>
            </div>

            <div className="flex px-[50px] justify-between mt-[55px] w-screen">
              {getPublikasi?.data?.filter((data) => data.publication === true).filter((data) => data.description === "video")[0] && (
                <Publikasi data={getPublikasi?.data?.filter((data) => data.publication === true).filter((data) => data.description === "video")[0]} />
              )}

              <div className="flex flex-col gap-2 font-bold text-slate-700 text-[26px] object-contain">
                <p className="mb-2 flex items-center justify-between">
                  Video Lainnya
                  <span onClick={() => router.push("/publikasi/SemuaPublikasi")} className="text-[16px] text-[#FF5001] font-normal underline cursor-pointer">
                    Lihat Semua
                  </span>
                </p>
                {getPublikasi?.data
                  ?.filter((data) => data.publication === true)
                  .filter((data) => data.description === "video")
                  .map((res, index) => (
                    // console.log(res)
                    <div key={res?._id}>{index <= 3 && <KabarTerbaru data={res} />}</div>
                  ))}
              </div>
            </div>
            <div className="" ref={refPendaftaran}></div>
          </div>

          <div className="flex pb-[82px] gap-8 items-end h-[408px] w-screen bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bgImage2.src})` }}>
            <div
              onClick={() => {
                router.push({
                  pathname: "Daftar",
                  query: { type: "simpatisan" },
                });
              }}
              className="cursor-pointer ml-[740px]"
            >
              <DaftarSimpatisanButton />
            </div>
          </div>

          <div className="flex pt-[103px] pl-[70px] pr-[70px] w-screen justify-between gap-[80px]">
            <div className="w-screen">
              <p className="text-[26px] text-slate-700 font-bold pb-[40px]">Kabar SJP Berkhidmat</p>
              {getPublikasiArt?.data
                ?.filter((data) => ["jpg", "jpeg", "png"].includes(data?.image?.split(".").pop().toLowerCase()))
                .map((res, index) => (
                  <div key={res?._id}>{index <= 5 && <KabarSjpBerkhidmat data={res} />}</div>
                ))}
            </div>
            <div className="">
              <p className="text-[26px] text-slate-700 font-bold pb-[40px]">Kategori Kabar</p>
              <KategoriKabar />
              {banner?.data?.map((res, i) => {
                return <img key={i} className="mt-[47px] w-[350px] h-[300px] rounded-xl" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.image} alt="gambar  " />;
              })}
            </div>
          </div>
          {/* program / artikel */}
          <div className="pt-12" ref={refProgram}></div>

          <div className="bg-[#4B5563] h-[1684px] pt-[67px] px-[120px] flex flex-col items-center w-screen">
            <div className="flex items-center  justify-center mb-[60px]">
              <p className="text-[39px] font-bold text-white">Program SJP Berkhidmat</p>
            </div>

            {getArtikel?.data?.map((res) => {
              // console.log(res, "ini res");
              if (res.publication === true) {
                return (
                  <div key={res._id} className="flex w-full h-[144px] border border-[#6B7280] mb-[21px] py-[12px] rounded-md">
                    <div style={{ overflow: "hidden" }} className="py-[10px] pl-[32px] w-full pr-[30px] flex-col gap-1 flex ">
                      <p className="text-[#FF5001] text-[18px] font-semibold">{res?.category}</p>
                      <p className="text-white h-[30px] overflow-y-clip text-[21px] font-bold">{res?.title}</p>
                      <div className="text-white text-[16px]  overflow-y-clip h-[35px] flex">
                        <div className="text-white text-[16px] h-[32px] flex" dangerouslySetInnerHTML={{ __html: res?.description }} />
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        router.push({
                          pathname: "artikel/DetailProgram",
                          query: {
                            title: res?.title,
                            description: res?.description,
                            image: res?.image,
                            video: res?.video,
                            kabupaten: res?.kabupaten?.name,
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
            <div ref={refAspirasi} />
          </div>
          <div className="flex h-[248px] bg-[#FF5001] py-[65px] w-screen px-[50px]">
            <p className="text-white text-[26px] flex font-bold basis-1/2">
              Kami membuka pintu komunikasi yang <br /> kondusif dan terbuka untuk menerima <br /> pesan dan aspirasi dari masyarakat.
            </p>
            <div className="basis-1/2">
              <p className="text-[18px]  text-white">Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita wujudkan perubahan yang diinginkan!</p>
              <button onClick={() => Router.push("Aspirasi")} className="w-[230px] h-[48px] bg-white text-slate-700 text-[18px] font-bold mt-6">
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
        </div>
      )}
    </>
  );
};

export default withRouter(HomePage);
