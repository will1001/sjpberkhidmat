import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useFetch from "../../src/API/useFetch";
import { ButtonLogin, FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon, TwitterIcon, WebIcon, YouTubeIcon } from "../../src/utility/icon/icon";
import Logo from "../../src/utility/Logo";
import listIcon from "../../src/utility/icon/centerIcon.png";
import FooterLink from "../../src/component/FooterLink";

const DetailArtikel = () => {
  const router = useRouter();
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
  const getArtikel = useFetch("get", "user/articles?page=1&type=artikel");
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
  //   console.log(router.query.description);
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
            <p onClick={() => router.push("../publikasi/SemuaPublikasi")} className="text-[16px] text-[#374151] font-medium border-b-[1px] pb-2 mt-2">
              Publikasi
            </p>
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
          <div className="text-center bg-[#FF5001] text-[18px] text-white font-bold py-3">Publikasi</div>
          <div className="px-[16px] pt-[21px] pb-[80px]">
            {" "}
            <p className="text-[26px] text-[#374151] font-bold">{router?.query?.title}</p>
            <p className="text-[12px] text-[#E44700] mt-2">
              {router?.query?.creat !== undefined && router?.query?.creat?.split("T").shift().split("-")[2]} {monthNames[new Date(router?.query?.creat?.split("T").shift().split("-")[1]).getMonth()]}{" "}
              {router?.query?.creat !== undefined && router?.query?.creat.split("T").shift().split("-")[0]}
              {/* - {router?.query?.creat?.split(".").shift().split("T").pop().split(":").reverse().join(":")} WIB */}
            </p>
            <p className="text-[12px] text-[#E44700]">{router?.query?.category}</p>
            <img className="w-full h-[175px] rounded-md" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + router?.query?.image} />
            <div className="mt-[24px] text-[#374151]" dangerouslySetInnerHTML={{ __html: router?.query?.description }} />
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
              <div className="text-[14px] text-[#4B5563] flex flex-col">
                <FooterLink />
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
                  <a href="http://suryadijayapurnama-sjp.id" target="_blank">
                          <WebIcon />
                      </a>
                  {/* <TikTokIcon /> */}
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
                  }}
                  className={`cursor-pointer `}
                >
                  Beranda
                </p>
                <p onClick={() => router.push("../../../Profil")} className="cursor-pointer">
                  Profil
                </p>
                <p
                  onClick={() => {
                    router.push({
                      pathname: "/",
                      query: { page: "program" },
                    });
                  }}
                  className="cursor-pointer"
                >
                  <span>Program</span>
                </p>
                <p onClick={() => goto(refPublikasi.current)} className={`flex cursor-pointer  text-[#FF5001]`}>
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
                <div onClick={() => router.push("../../../Aspirasi")} className="bg-[#FF5001] text-white h-[31px] px-4 cursor-pointer flex items-center rounded-md">
                  Rumah Aspirasi
                </div>
                <button
                  onClick={() => {
                    router.push({ pathname: "../../../Login" });
                  }}
                >
                  <ButtonLogin />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#FF5001] text-[32px] font-bold text-white mt-[70px] flex justify-center py-4">Publikasi Artikel</div>
          <div className="flex px-[70px] py-[52px] gap-[100px] text-[#374151] justify-between">
            <div className="basis-8/12">
              <p className="text-[52px] font-bold">{router?.query?.title}</p>
              <div className="flex gap-6 my-[24px] text-[#E44700] font-medium">
                <p>
                  {router?.query?.creat !== undefined && router?.query?.creat?.split("T").shift().split("-")[2]} {monthNames[new Date(router?.query?.creat?.split("T").shift().split("-")[1]).getMonth()]}{" "}
                  {router?.query?.creat !== undefined && router?.query?.creat.split("T").shift().split("-")[0]}
                  {/* - {router?.query?.creat?.split(".").shift().split("T").pop().split(":").reverse().join(":")} WIB */}
                </p>
                <p>{router?.query?.category}</p>
              </div>
              <div>
                <img className="w-full h-[395px] rounded-md" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + router?.query?.image} />
              </div>
              <div className="mt-[24px]" dangerouslySetInnerHTML={{ __html: router?.query?.description }} />
            </div>
            <div className="basis-4/12">
              <p className="text-[26px] mb-3 mt-3 font-bold">KabarTerbaru</p>
              {getArtikel?.data
                ?.filter((data) => ["jpg", "jpeg", "png"].includes(data?.image?.split(".").pop().toLowerCase()))
                .map((res, index) => (
                  <div key={res._id}>
                    {index <= 3 && (
                      <div
                        onClick={() =>
                          router.push({
                            pathname: "./DetailArtikel",
                            query: { title: res?.title, description: res?.description, category: res?.category, creat: res?.createdAt, image: res?.image },
                          })
                        }
                        className="mb-3 flex gap-2 cursor-pointer"
                      >
                        <div className="w-[122px] h-[96px]">
                          <img className="w-full h-full rounded-md" src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res?.image} />
                        </div>
                        <div className="w-[250px] flex flex-col justify-between">
                          <p className="font-semibold break-words">{res.title}</p>
                          <p className="font-medium text-[14px] text-[#E44700]">{res?.createdAt}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              <div className="mt-12">
                <Logo />
                <p>Bekerja bersama untuk membangun masa depan yang lebih baik bagi masyarakat dan generasi yang akan datang.</p>
                <p className="text-[26px] mb-3 mt-3 font-bold">Kategori Publikasi</p>
                <div className="flex flex-col gap-2 font-medium cursor-pointer">
                  <p>Bantuan Sosial</p>
                  <p>Infrastruktur</p>
                  <p>Pendidikan</p>
                  <p>Lapangan Kerja</p>
                  <p>Peraturan Daerah</p>
                  <p>Ormas & Keagamaan</p>
                  <p>Kesehatan</p>
                  <p>Politik & Pemerintahan</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-[248px] bg-[#FF5001] py-[65px] w-screen px-[50px]">
            <p className="text-white text-[26px] flex font-bold basis-1/2">
              Kami membuka pintu komunikasi yang <br /> kondusif dan terbuka untuk menerima <br /> pesan dan aspirasi dari masyarakat.
            </p>
            <div className="basis-1/2">
              <p className="text-[18px]  text-white">Kami menantikan dukungan dan masukan Anda. Ayo bersama-sama kita wujudkan perubahan yang diinginkan!</p>
              <button onClick={() => router.push("../../../Aspirasi")} className="w-[230px] h-[48px] bg-white text-slate-700 text-[18px] font-bold mt-6">
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
      )}
    </>
  );
};

export default DetailArtikel;
